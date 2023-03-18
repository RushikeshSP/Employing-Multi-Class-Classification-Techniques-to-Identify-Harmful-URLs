// let url = document.getElementById("url");

// Add a listener for messages from content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "showPrediction") {
        // Update the HTML of the popup with the prediction data
        let pred = document.getElementById("pred");
        console.log(request.result);
        pred.textContent = request.result;
    }
});
