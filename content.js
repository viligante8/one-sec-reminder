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

// Create the overlay
const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.id = 'one-sec-overlay';
  overlay.innerHTML = `
    <div class="one-sec-content">
      <div class="one-sec-icon">⏳</div>
      <h2>Take a breath...</h2>
      <p>You're about to visit <strong>${getSiteName()}</strong></p>
      <p>Is this how you want to spend your time?</p>
      <div class="one-sec-timer">
        <div class="one-sec-countdown">3</div>
      </div>
      <button id="one-sec-continue" style="display: none;">Continue to ${getSiteName()}</button>
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
  const overlay = createOverlay();
  
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
    showPageContent();
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

