var prediction;
var url = window.location.href;
console.log("Current URL: " + url);

// Send the URL to the Node server
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3000/check-url", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Response from the PHP server
        prediction = xhr.responseText;
        chrome.runtime.sendMessage({
            action: "showPrediction",
            result: prediction,
        });
        //       $("#div1").text(xhr.responseText);
    }
};
xhr.send("url=" + url);
