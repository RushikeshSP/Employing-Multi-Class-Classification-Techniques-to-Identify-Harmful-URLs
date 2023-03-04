# Purpose - Receive the call for testing a page from the Chrome extension and return the result (SAFE/PHISHING)
# for display. This file calls all the different components of the project (The ML model, features_extraction) and
# consolidates the result.

from urllib.parse import unquote
import joblib
import features_extraction
import sys
import numpy as np


LOCALHOST_PATH = "C:/xampp/htdocs"
DIRECTORY_NAME = "/Malicious-Web-Content-Detection-Using-Machine-Learning"


def get_prediction_from_url(test_url):
    features_test = features_extraction.main(test_url)
    # Due to updates to scikit-learn, we now need a 2D array as a parameter to the predict function.
    features_test = np.array(features_test).reshape((1, -1))

    clf = joblib.load(LOCALHOST_PATH + DIRECTORY_NAME + '/classifier/lgb.pkl')

    pred = clf.predict(features_test)
    return pred


def main():
    
    # url = (sys.argv[1]).decode('utf-8')
    decoded_url = unquote(sys.argv[1], encoding='utf-8')
    # print(decoded_url)
    # url = "www.google.com"
    pred = get_prediction_from_url(decoded_url)

    # Print the probability of prediction (if needed)
    # prob = clf.predict_proba(features_test)
    # print 'Features=', features_test, 'The predicted probability is - ', prob, 'The predicted label is - ', pred
    #    print "The probability of this site being a phishing website is ", features_test[0]*100, "%"

    # if prediction == 1:
    #     # print "The website is safe to browse"
    #     print("SAFE")
    # elif prediction == -1:
    #     # print "The website has phishing features. DO NOT VISIT!"
    #     print("PHISHING")

        # print 'Error -', features_test
    if int(pred[0]) == 0:
        res="SAFE"
        # return res
    elif int(pred[0]) == 1.0:
        res="DEFACEMENT"
        # return res
    elif int(pred[0]) == 2.0:
        res="PHISHING"
        # return res
    elif int(pred[0]) == 3.0:
        res="MALWARE"
        # return res
    print(res)

if __name__ == "__main__":
    main()
