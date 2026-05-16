chrome.action.onClicked.addListener((tab) => {
    try {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });
    } catch (error) {
        ;
    }
});

function setIcon(tabId, tabUrl) {
    try {
        if (tabUrl && (tabUrl.startsWith('https://www.youtube.com/@') || tabUrl.startsWith('https://www.youtube.com/watch'))) {
            chrome.action.setIcon({ path: "icons/icon16.png", tabId: tabId });
        } else {
            chrome.action.setIcon({ path: "icons/icon16-gray.png", tabId: tabId });
        }
    } catch (error) {
        ;
    }
}
chrome.tabs.onActivated.addListener(async function (activeInfo) {
    try {
        tab = await chrome.tabs.get(activeInfo.tabId);
        setIcon(activeInfo.tabId, tab.url);
    } catch (error) {
        ;
    }
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    setIcon(tabId, tab.url);
});
