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
  




// blocking site access
const websitesBlocked = ["youtube", "reddit"]; 

function isBlockedWebsite(url) {
  return websitesBlocked.some((blocked) => url.includes(blocked));
}

function createBlackoutOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "distraction-blocker-overlay";
    overlay.innerText = "Yo, getting distracted, go back to work >:(";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.color = "white";
    overlay.style.fontFamily = "Arial, sans-serif";
    overlay.style.fontSize = "24px";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    document.body.appendChild(overlay);
  }
  
  
function handlePageLoad() {
  if (isBlockedWebsite(window.location.href)) {
    createBlackoutOverlay();
  }
}

window.addEventListener("load", handlePageLoad);

