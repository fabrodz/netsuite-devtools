chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  console.log('NetSuite DevTools extension installed');
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabs = await chrome.tabs.query({ active: true });
  if (!tabs[0].url) return;
  const tab = tabs[0];
  const isNetSuite = /https:\/\/.*\.netsuite\.com/.test(tab.url);

  if (isNetSuite) {
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'panel.html',
      enabled: true
    });
  } else {
    await chrome.sidePanel.setOptions({
      enabled: false
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from content script:', message, sender);
  if (message.type === 'runSuiteQL') {
    console.log('Running SuiteQL via background', message.query);
  }

  sendResponse({ success: true });
});