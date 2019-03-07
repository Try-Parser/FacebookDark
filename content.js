var enabled = false

function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL(file);
  link.id = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("html")[0].appendChild(link);
}

function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

chrome.storage.local.get(['fbdark'], function(result) {
  enabled = result.fbdark
  if(enabled == false) {
    unloadCSS("style.css")
  } else {
    loadCSS("style.css")
    enabled = true
  }
  console.log('Value currently is ' + result.fbdark);
  chrome.storage.local.set({ fbdark: enabled }, function() {
    console.log('Facebook Dark is Initialized!');
  });
});


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == 'load') {
    loadCSS("style.css");
    enabled = true
  } else {
    unloadCSS("style.css")
    enabled = false
  }

  console.log(enabled)

  chrome.storage.local.set({ fbdark: enabled }, function() {
    console.log('Facebook Dark is Enabled!');
  });

  sendResponse({ msg });
});