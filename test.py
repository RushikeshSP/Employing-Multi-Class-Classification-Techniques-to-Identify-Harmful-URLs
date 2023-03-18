# Purpose - Receive the call for testing a page from the Chrome extension and return the result (SAFE/PHISHING)
# for display. This file calls all the different components of the project (The ML model, features_extraction) and
# consolidates the result.

from urllib.parse import unquote
import joblib
import features_extraction
import sys
import numpy as np

import warnings
warnings.filterwarnings('ignore', category=UserWarning, module='sklearn')


def get_prediction_from_url(test_url):
    features_test = features_extraction.main(test_url)
    # Due to updates to scikit-learn, we now need a 2D array as a parameter to the predict function.
    features_test = np.array(features_test).reshape((1, -1))

    clf = joblib.load('D:/Engineering/B.E Project/Employing-Multi-Class-Classification-Techniques-to-Identify-Harmful-URLs/classifier/lgb.pkl')

    pred = clf.predict(features_test)
    return pred


def main():
    decoded_url = unquote(sys.argv[1], encoding='utf-8')

    pred = get_prediction_from_url(decoded_url)

    if int(pred[0]) == 0:
        res="SAFE"
    elif int(pred[0]) == 1.0:
        res="DEFACEMENT"
    elif int(pred[0]) == 2.0:
        res="PHISHING"
    elif int(pred[0]) == 3.0:
        res="MALWARE"

    print(res)

if __name__ == "__main__":
    main()