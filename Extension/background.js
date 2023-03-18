chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "showPrediction") {
        alert(request.result);
    }
});

// chrome.webNavigation.onCompleted.addListener(function (details) {
//     //     alert(details.url);

//     var url = details.url;
//     // $("#p1").text("The URL being tested is - " + url);

//     // Send the URL to the Node server
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:3000/check-url", true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             // Response from the PHP server
//             //     console.log(xhr.responseText);
//             alert("Website is " + xhr.responseText);
//             //       $("#div1").text(xhr.responseText);
//         }
//     };
//     xhr.send("url=" + url);
// });
