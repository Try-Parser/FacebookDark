document.addEventListener("DOMContentLoaded", function (event) {
	var enable = "load"
	end.addEventListener('click', function () {
		chrome.storage.local.get(['fbdark'], function(result) {
			enable = (result.fbdark) ? "unload": "load";
			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { action: enable }, function(response) {});
			});
		});
    });

    tablinks = document.getElementsByClassName("tablinks")

	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].addEventListener("click", function(evt) {
			if(evt.target.id) {
				var i, tabcontent, tablinks;
				tabcontent = document.getElementsByClassName("tabcontent");

				for (i = 0; i < tabcontent.length; i++)
					tabcontent[i].style.display = "none";

				tablinks = document.getElementsByClassName("tablinks");
				for (i = 0; i < tablinks.length; i++)
					tablinks[i].className = tablinks[i].className.replace("active", "");
				
				document.getElementById(evt.target.id+"-display").style.display = "block";
				evt.currentTarget.className += " active";
			}
		})
	}
});