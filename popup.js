// popup.js - One-Sec Reminder Settings

document.addEventListener('DOMContentLoaded', function() {
  const enabledCheckbox = document.getElementById('enabled');
  const delaySelect = document.getElementById('delay');
  
  // Load saved settings
  chrome.storage.sync.get(['enabled', 'delay'], function(result) {
    enabledCheckbox.checked = result.enabled !== false; // Default to true
    delaySelect.value = result.delay || '3'; // Default to 3 seconds
  });
  
  // Save settings when changed
  enabledCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({
      enabled: enabledCheckbox.checked
    });
  });
  
  delaySelect.addEventListener('change', function() {
    chrome.storage.sync.set({
      delay: delaySelect.value
    });
  });

  // Initialize skip count display
  const skipCountElement = document.getElementById('skip-count');
  const updateSkipCountDisplay = () => {
    chrome.storage.sync.get(['skipCount'], function(result) {
      const count = result.skipCount || 0;
      let text = `${count} guilty escape${count !== 1 ? 's' : ''}`;
      
      // Add escalating shame text
      if (count > 15) text += ' (pathetic!)';
      else if (count > 10) text += ' (seriously?!)';
      else if (count > 5) text += ' (yikes!)';
      
      skipCountElement.textContent = text;
      
      // Change visual styling based on count
      const counterDiv = skipCountElement.parentElement;
      if (count > 10) {
        counterDiv.style.borderLeft = '3px solid #ff0000';
        counterDiv.style.backgroundColor = '#ffe6e6';
        skipCountElement.style.color = '#ff0000';
      } else if (count > 5) {
        counterDiv.style.borderLeft = '3px solid #ff6b6b';
        counterDiv.style.backgroundColor = '#fff0f0';
        skipCountElement.style.color = '#ff6b6b';
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
    chrome.storage.sync.set({ skipCount: 0 });
    updateSkipCountDisplay();
    headerShame.textContent = "Starting fresh! 🚀";
  });

  // Update header and footer with new shame every time popup is opened based on skip count
  chrome.storage.sync.get(['skipCount'], function(result) {
    const count = result.skipCount || 0;
    updateHeaderShame(count);
    updateFooterShame(count);
  });
});
