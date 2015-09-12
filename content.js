/**
 * Will be content script(build in) in vk playlist page
 */

// recursively parsing all document
function parse(node) {
    var res = "";

    if (node !== null) {
        res += out(node);
    }

    if (node.childNodes) {
        var elements = node.children;
        for (var i = 0; i < elements.length; i++) {
            var child = elements[i];
            res += parse(child);
        }
    }

    return res;
}

function out(node) {
    if (node.nodeType === 1) {
        //TODO refator this place, split by methods
        if(node.className == "area clear_fix"){
            var urlNode = node.getElementsByClassName("play_btn fl_l")[0].getElementsByTagName("INPUT")[0].value;
            var infoNode = node.getElementsByClassName("title_wrap fl_l")[0];

            var linkElementArtist = infoNode.getElementsByTagName("A")[0];
            var artistNameCode = linkElementArtist.text;

            var titleElement = infoNode.getElementsByClassName("title")[0];

            // check if has link inside or none
            var titleLinkElement = titleElement.getElementsByTagName("A");
            var titleName;

            if(titleLinkElement.length !== 0){
                titleName = titleLinkElement[0].text;
            } else {
                titleName = titleElement.textContent;
            }

            return "#EXTINF:-1," + artistNameCode + " - " + titleName + "\n" + urlNode + "\n";
        } else {
            return "";
        }

    }
}


// communicate with pop-up page, send made playlist
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "getDOM") {
        var srt = parse(document.documentElement);
        sendResponse({dom: srt});
    } else {
        sendResponse({}); // Send nothing..
    }
});


