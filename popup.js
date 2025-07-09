// popup.js - One-Sec Reminder Settings

// Cross-browser compatibility for API access
const browserAPI = (() => {
  if (typeof browser !== 'undefined') {
    return browser; // Firefox
  } else if (typeof chrome !== 'undefined') {
    return chrome; // Chrome
  } else {
    throw new Error('Browser API not available');
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  const enabledCheckbox = document.getElementById('enabled');
  const delaySelect = document.getElementById('delay');
  
  // Load saved settings
  browserAPI.storage.sync.get(['enabled', 'delay'], function(result) {
    enabledCheckbox.checked = result.enabled !== false; // Default to true
    delaySelect.value = result.delay || '3'; // Default to 3 seconds
  });
  
  // Save settings when changed
  enabledCheckbox.addEventListener('change', function() {
    browserAPI.storage.sync.set({
      enabled: enabledCheckbox.checked
    });
  });
  
  delaySelect.addEventListener('change', function() {
    browserAPI.storage.sync.set({
      delay: delaySelect.value
    });
  });

  // Initialize skip count display
  const totalCountElement = document.getElementById('total-count');
  const siteBreakdownElement = document.getElementById('site-breakdown');
  
  const updateSkipCountDisplay = () => {
    // Get all skip count data
    browserAPI.storage.sync.get(null, function(result) {
      const totalCount = result.totalSkipCount || 0;
      const lastResetDate = result.lastResetDate || 'Never';
      
      // Display total count with daily reset info
      let totalText = `Today: ${totalCount} guilty escape${totalCount !== 1 ? 's' : ''}`;
      if (totalCount > 15) totalText += ' (pathetic!)';
      else if (totalCount > 10) totalText += ' (seriously?!)';
      else if (totalCount > 5) totalText += ' (yikes!)';
      
      totalCountElement.textContent = totalText;
      
      // Build site breakdown
      const siteStats = [];
      const siteNames = ['reddit', 'twitterx', 'youtube', 'instagram', 'facebook', 'tiktok'];
      const siteDisplayNames = ['Reddit', 'Twitter/X', 'YouTube', 'Instagram', 'Facebook', 'TikTok'];
      
      siteNames.forEach((siteName, index) => {
        const count = result[`skipCount_${siteName}`] || 0;
        if (count > 0) {
          siteStats.push(`${siteDisplayNames[index]}: ${count}`);
        }
      });
      
      if (siteStats.length > 0) {
        siteBreakdownElement.textContent = siteStats.join(' • ');
      } else {
        siteBreakdownElement.textContent = 'No skips yet... staying strong! 💪';
      }
      
      // Add daily reset info
      const today = new Date().toDateString();
      if (lastResetDate === today) {
        siteBreakdownElement.textContent += ' • Resets daily at midnight';
      }
      
      // Change visual styling based on total count
      const counterDiv = totalCountElement.parentElement;
      if (totalCount > 10) {
        counterDiv.style.borderLeft = '3px solid #ff0000';
        counterDiv.style.backgroundColor = '#ffe6e6';
        totalCountElement.style.color = '#ff0000';
      } else if (totalCount > 5) {
        counterDiv.style.borderLeft = '3px solid #ff6b6b';
        counterDiv.style.backgroundColor = '#fff0f0';
        totalCountElement.style.color = '#ff6b6b';
      }
    });
  };
  
  updateSkipCountDisplay();
  
  // Reset counter functionality
  const resetButton = document.getElementById('reset-counter');
  const headerShame = document.getElementById('header-shame');
  const footerShame = document.getElementById('footer-shame');

  const updateHeaderShame = (count) => {
    if (count > 10) {
      headerShame.textContent = "Still procrastinating? 😒";
    } else if (count > 5) {
      headerShame.textContent = "Seems like you’re a regular here... 🙃";
    } else if (count > 2) {
      headerShame.textContent = "I've seen you around before... 🤔";
    } else {
      headerShame.textContent = "Your friendly neighborhood procrastination buster";
    }
  };

  const updateFooterShame = (count) => {
    if (count > 15) {
      footerShame.textContent = "At this point, I'm just watching you fail... 😑";
    } else if (count > 10) {
      footerShame.textContent = "Your productivity called. It's very disappointed. 😔";
    } else if (count > 5) {
      footerShame.textContent = "You know what you should be doing instead... 😏";
    } else if (count > 2) {
      footerShame.textContent = "Maybe consider doing something productive? 🤷";
    } else {
      footerShame.textContent = "Take a moment to consider your digital habits";
    }
  };

  resetButton.addEventListener('click', function() {
    // Clear all site-specific skip counts
    const keysToReset = {
      totalSkipCount: 0,
      skipCount_reddit: 0,
      skipCount_twitterx: 0,
      skipCount_youtube: 0,
      skipCount_instagram: 0,
      skipCount_facebook: 0,
      skipCount_tiktok: 0
    };
    
    browserAPI.storage.sync.set(keysToReset);
    updateSkipCountDisplay();
    headerShame.textContent = "Starting fresh! 🚀";
    
    // Reset header and footer shame
    setTimeout(() => {
      updateHeaderShame(0);
      updateFooterShame(0);
    }, 2000);
  });

  // Update header and footer with new shame every time popup is opened based on total skip count
  browserAPI.storage.sync.get(['totalSkipCount'], function(result) {
    const count = result.totalSkipCount || 0;
    updateHeaderShame(count);
    updateFooterShame(count);
  });
});
