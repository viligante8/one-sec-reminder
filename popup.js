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
});
