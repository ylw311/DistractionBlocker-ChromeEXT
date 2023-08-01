// redirect to inbox URL
function redirectToInbox(tabId) {
  const redirectUrl = "https://www.instagram.com/direct/inbox/";
  chrome.tabs.update(tabId, { url: redirectUrl });
}

// Listener for onBeforeRequest event to redirect if necessary
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const redirectUrl = "https://www.instagram.com/direct/inbox/";
    const targetUrl = new URL(details.url);
    if (targetUrl.origin === "https://www.instagram.com" && targetUrl.pathname !== "/direct/inbox/") {
      return { redirectUrl: redirectUrl };
    }
  },
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);

// Listener for incoming messages from content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "redirect") {
    redirectToInbox(sender.tab.id);
  }
});


// blackout overlay
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "removeOverlay") {
    removeBlackoutOverlay();
  }
});

function removeBlackoutOverlay() {
  const overlay = document.getElementById("distraction-blocker-overlay");
  if (overlay) {
    overlay.remove();
  }
}