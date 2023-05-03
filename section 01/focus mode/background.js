/*
Extensions can monitor browser events in the background using the extension's service worker. Service workers are special JavaScript environments that are loaded to handle events and terminated when they're no longer needed.
*/

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

//adding listener once the extension icon is clicked.
chrome.action.onClicked.addListener(async (tab)=>{
    console.log(tab.url)
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        const prevBadgeState= await chrome.action.getBadgeText({ tabId:tab.id })
    
    const nextBadgeState = prevBadgeState === 'ON' ? 'OFF':'ON';

    await chrome.action.setBadgeText({
        tabId:tab.id,
        text:nextBadgeState
    })


    if (nextBadgeState==='ON') {
        //insert stylesheet
        await chrome.scripting.insertCSS({
        files:["focus-mode.css"],
        target: { tabId: tab.id}
        })
    }else if (nextBadgeState==='OFF') {
        //remove stylesheet
        await chrome.scripting.removeCSS({
            files:["focus-mode.css"],
            target: { tabId: tab.id}
        })
    }

    }
})