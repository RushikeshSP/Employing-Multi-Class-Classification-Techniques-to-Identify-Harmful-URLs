
function transfer() {

	// Get the current tab's URL
	chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
		var url = tabs[0].url;
		// $("#p1").text("The URL being tested is - " + url);

		// Send the URL to the PHP server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost/Malicious-Web-Content-Detection-Using-Machine-Learning/clientServer.php', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				// Response from the PHP server
				console.log(xhr.responseText);
				$("#div1").text(xhr.responseText);
			}
			// alert(xhr.responseText);
			// return xhr.responseText;
		};
		xhr.send('url=' + url);


	});
}


$(document).ready(function () {
	$("button").click(function () {
		var val = transfer();
	});
});

chrome.tabs.getSelected(null, function (tab) {
	var tablink = tab.url;
	$("#p1").text("The URL being tested is - " + tablink);
});




