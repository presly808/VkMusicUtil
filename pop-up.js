/*
* pop-up script
* */

function setupDownloadLink(src) {
    var link = document.getElementById("link");
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(src);
    link.hidden = "";
}

// send request to content script(build in) in vk playlist page
function getPlaylist() {
    chrome.tabs.getSelected(null, function (tab) {
        // Send a request to the content script.
        chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, null, function (response) {

            var message = response.dom;
            setupDownloadLink(message);

            // debug code
            /*console.log(message);*/

        });
    });
}

document.getElementById('clickme').addEventListener('click', getPlaylist);