chrome.action.onClicked.addListener(async (tab) => {
  chrome.sidePanel.setOptions(
    {
      enabled: true,
      path: 'side-panel.html',
    },
    () => {
      chrome.sidePanel.open({windowId: tab.windowId});
    }
  );
});
