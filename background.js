chrome.runtime.onMessage.addListener(function(request) {
    chrome.tabs.create({url: request.type});
});