// Function to check if the current URL is not the inbox URL
function isNotInboxUrl() {
    return window.location.origin === "https://www.instagram.com" && window.location.pathname !== "/direct/inbox/";
  }
  
  // Function to send a message to the background script
  function sendMessageToBackgroundScript(message) {
    chrome.runtime.sendMessage(message);
  }
  
  // Monitor page changes
  window.addEventListener("load", function () {
    // Check on page load
    if (isNotInboxUrl()) {
      sendMessageToBackgroundScript({ action: "redirect" });
    }
  
    // Use MutationObserver to monitor changes in the URL
    const observer = new MutationObserver(function () {
      if (isNotInboxUrl()) {
        sendMessageToBackgroundScript({ action: "redirect" });
      }
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
  

