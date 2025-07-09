// content.js - One-Sec Reminder

// Get the current site name
const getSiteName = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('reddit.com')) return 'Reddit';
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'Twitter/X';
  if (hostname.includes('youtube.com')) return 'YouTube';
  if (hostname.includes('instagram.com')) return 'Instagram';
  if (hostname.includes('facebook.com')) return 'Facebook';
  if (hostname.includes('tiktok.com')) return 'TikTok';
  return 'this site';
};

// Create the overlay with progressive guilt messaging
const createOverlay = (skipCount = 0) => {
  const overlay = document.createElement('div');
  overlay.id = 'one-sec-overlay';
  
  let guiltMessage = "Is this how you want to spend your time?";
  let buttonText = `Continue to ${getSiteName()}`;
  let extraShame = "";
  let headerText = "Take a breath...";
  
  if (skipCount > 1) {
    guiltMessage = `Seriously? AGAIN? Your future self is crying. 😭`;
    buttonText = `Fine, waste more time on ${getSiteName()}`;
    extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>You've ignored me ${skipCount} times. I'm starting to think you don't respect yourself.</p>`;
  }
  if (skipCount > 3) {
    guiltMessage = `At this rate, you'll achieve nothing today. Congrats! 🎉`;
    buttonText = `Surrender your dreams to ${getSiteName()}`;
    headerText = `Another productive moment... WASTED`;
    extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>Skip count: ${skipCount}. That's ${skipCount * 15} minutes of your life you'll never get back.</p>`;
  }
  if (skipCount > 5) {
    guiltMessage = `Your goals are laughing at you right now. Can you hear them? 😂`;
    buttonText = `Shamefully crawl to ${getSiteName()}`;
    headerText = `REALLY? AGAIN?!`;
    extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>You've failed ${skipCount} times. I'm not angry, I'm just... disappointed. So very disappointed.</p>`;
  }
  if (skipCount > 8) {
    guiltMessage = `Just uninstall me. You clearly don't want help. I'll go cry in a corner now. 💔`;
    buttonText = `Pathetically crawl to ${getSiteName()} (loser)`;
    headerText = `I've given up on you`;
    extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>You've ignored me ${skipCount} times. I tried so hard to help you... but you don't want to be helped, do you?</p>`;
  }
  if (skipCount > 12) {
    guiltMessage = `At this point, I'm just here to watch you destroy your own productivity. 🍿`;
    buttonText = `Continue your descent into digital hell`;
    headerText = `Another failure incoming...`;
    extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>Skip #${skipCount}. You know what? Don't even bother reading this. You're going to ignore it anyway.</p>`;
  }
  
  overlay.innerHTML = `
    <div class="one-sec-content">
      <div class="one-sec-icon">⏳</div>
      <h2 style="${skipCount > 3 ? 'color: #ff4444; text-transform: uppercase;' : ''}">${headerText}</h2>
      <p>You're about to visit <strong>${getSiteName()}</strong></p>
      <p style="${skipCount > 1 ? 'color: #ff6666; font-weight: bold;' : ''}">${guiltMessage}</p>
      ${extraShame}
      <div class="one-sec-timer">
        <div class="one-sec-countdown">3</div>
      </div>
      <button id="one-sec-continue" style="display: none; ${skipCount > 5 ? 'background-color: #ff4444; border-color: #ff4444;' : ''}">${buttonText}</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  return overlay;
};

// Hide the original page content
const hidePageContent = () => {
  const style = document.createElement('style');
  style.textContent = `
    body > *:not(#one-sec-overlay) {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
};

// Show the original page content
const showPageContent = () => {
  const styles = document.querySelectorAll('style');
  styles.forEach(style => {
    if (style.textContent.includes('#one-sec-overlay')) {
      style.remove();
    }
  });
};

// Run the delay logic
const runOneSecDelay = (delaySeconds = 3) => {
  // Don't run on certain pages (like settings, API calls, etc.)
  if (window.location.pathname.includes('/settings') || 
      window.location.pathname.includes('/api/') ||
      window.location.search.includes('one-sec-skip')) {
    return;
  }

  hidePageContent();
  
  // Get skip count and create overlay with appropriate messaging
  chrome.storage.sync.get(['skipCount'], function(result) {
    const skipCount = result.skipCount || 0;
    const overlay = createOverlay(skipCount);
  
    const countdownElement = overlay.querySelector('.one-sec-countdown');
    const continueButton = overlay.querySelector('#one-sec-continue');
    
    let countdown = delaySeconds;
    countdownElement.textContent = countdown;
    
    const timer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownElement.textContent = countdown;
      } else {
        clearInterval(timer);
        countdownElement.style.display = 'none';
        continueButton.style.display = 'block';
      }
    }, 1000);
    
    continueButton.addEventListener('click', () => {
      overlay.remove();
      updateSkipCount();
      showPageContent();
    });
  });
};

// Function to update skip count
const updateSkipCount = () => {
  chrome.storage.sync.get(['skipCount'], function(result) {
    let skipCount = result.skipCount || 0;
    skipCount++;
    chrome.storage.sync.set({ skipCount: skipCount });
  });
};

// Initialize with settings check
const initializeExtension = () => {
  chrome.storage.sync.get(['enabled', 'delay'], function(result) {
    const enabled = result.enabled !== false; // Default to true
    const delay = parseInt(result.delay) || 3; // Default to 3 seconds
    
    if (enabled) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => runOneSecDelay(delay));
      } else {
        runOneSecDelay(delay);
      }
    }
  });
};

// Initialize the extension
initializeExtension();

