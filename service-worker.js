import './sw-omnibox.js'
import './sw-tips.js'

// Save default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      apiSuggestions: ['tabs', 'storage', 'scripting']
    });
  }
});


//
//const URL_CHROME_EXTENSIONS_DOC =
//  'https://developer.chrome.com/docs/extensions/reference/';
//const NUMBER_OF_PREVIOUS_SEARCHES = 4;
//
//// Display the suggestions after user starts typing
//chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
//  await chrome.omnibox.setDefaultSuggestion({
//    description: 'Enter a Chrome API or choose from past searches'
//  });
//  const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
//  const suggestions = apiSuggestions.map((api) => {
//    return { content: api, description: `Open chrome.${api} API` };
//  });
//  suggest(suggestions);
//});
//
//chrome.omnibox.onInputEntered.addListener((input) => {
//  chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
//  // Save the latest keyword
//  updateHistory(input);
//});
//
//chrome.runtime.onInstalled.addListener(() => {
//  chrome.action.setBadgeText({
//    text: "OFF",
//  });
//});
//
const youtube = 'https://www.youtube.com';
const webstore = 'https://developer.chrome.com/docs/webstore';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(youtube) || tab.url.startsWith(webstore)) {
   
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
   
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

 
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    if (nextState === "ON") {

      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
        await chrome.scripting.removeCSS({
    	  files: ["focus-mode.css"],
          target: { tabId: tab.id },
      });
    }
  }
});

