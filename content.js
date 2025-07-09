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
const createOverlay = (skipCount = 0, isScrollTrigger = false) => {
  const overlay = document.createElement('div');
  overlay.id = 'one-sec-overlay';
  
  let guiltMessage = "Is this how you want to spend your time?";
  let buttonText = `Continue to ${getSiteName()}`;
  let extraShame = "";
  let headerText = "Take a breath...";
  
  // Special messages for scroll triggers - these override skip count messages
  if (isScrollTrigger) {
    headerText = "CAUGHT YOU DOOM-SCROLLING!";
    if (skipCount > 5) {
      guiltMessage = "OH COME ON! Not only did you ignore me, but now you're mindlessly scrolling?! This is exactly the behavior I'm trying to stop! 🤬";
      buttonText = `Fine, continue doom-scrolling on ${getSiteName()} like a zombie`;
      extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>Skip count: ${skipCount}. Scroll-shaming count: 1. You're officially addicted. 📱🧟‍♂️</p>`;
    } else if (skipCount > 2) {
      guiltMessage = "Really? You bypassed my warning AND now you're doom-scrolling? I'm losing faith in humanity. 😮‍💨";
      buttonText = `Continue scrolling into the void on ${getSiteName()}`;
      extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>You've ignored me ${skipCount} times, and now you're mindlessly scrolling. This is exactly what I was trying to prevent!</p>`;
    } else {
      guiltMessage = "I saw you scrolling... and scrolling... and scrolling. This is exactly what I was trying to prevent! 🤦‍♂️";
      buttonText = `Continue your mindless scrolling on ${getSiteName()}`;
      extraShame = `<p style='color: #ff4444; font-size: 12px; margin-top: 10px;'>You've been caught red-handed! One full page of mindless scrolling detected. 📱💀</p>`;
    }
    // Create overlay HTML for scroll triggers and return early
    overlay.innerHTML = `
      <div class="one-sec-content">
        <div class="one-sec-icon">⏳</div>
        <h2 style="color: #ff4444; text-transform: uppercase;">${headerText}</h2>
        <p>You're about to visit <strong>${getSiteName()}</strong></p>
        <p style="color: #ff6666; font-weight: bold;">${guiltMessage}</p>
        ${extraShame}
        <div class="one-sec-timer">
          <div class="one-sec-countdown">3</div>
        </div>
        <button id="one-sec-continue" style="display: none; background-color: #ff4444; border-color: #ff4444;">${buttonText}</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
  }
  
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
const runOneSecDelay = (delaySeconds = 3, isScrollTrigger = false) => {
  // Don't run on certain pages (like settings, API calls, etc.)
  if (window.location.pathname.includes('/settings') || 
      window.location.pathname.includes('/api/') ||
      window.location.search.includes('one-sec-skip')) {
    return;
  }

  // Stop any existing scroll tracking
  stopScrollTracking();
  
  hidePageContent();
  
  // Get site-specific skip count and create overlay with appropriate messaging
  getCurrentSiteSkipCount((siteSkipCount) => {
    const overlay = createOverlay(siteSkipCount, isScrollTrigger);
  
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
    
    // Modular friction system - easily reorderable
    const frictionLevels = [
      { range: [0, 1], type: 'timer' },           // Level 1: Timer (skip 0-1)
      { range: [2, 3], type: 'fakeLoading' },     // Level 2: Fake loading (skip 2-3)
      { range: [4, 7], type: 'fakeButtons' },     // Level 3: Fake buttons (skip 4-7)
      { range: [8, 11], type: 'hotCold' },        // Level 4: Hot/cold invisible (skip 8-11)
      { range: [12, 999], type: 'movingButton' }  // Level 5: Moving button (skip 12+)
    ];
    
    // Find current friction level
    const currentLevel = frictionLevels.find(level => 
      siteSkipCount >= level.range[0] && siteSkipCount <= level.range[1]
    );
    
    // Execute the appropriate friction method
    if (currentLevel) {
      executeFriction(currentLevel.type, overlay, continueButton, siteSkipCount);
    } else {
      // Fallback to timer if no level matches
      executeFriction('timer', overlay, continueButton, siteSkipCount);
    }
  });
};
// Function to execute friction levels
const executeFriction = (type, overlay, continueButton, siteSkipCount) => {
  switch(type) {
    case 'timer':
      showTimerFriction(overlay, continueButton);
      break;
    case 'fakeLoading':
      showFakeLoadingFriction(overlay, continueButton);
      break;
    case 'fakeButtons':
      showFakeButtonsFriction(overlay, continueButton);
      break;
    case 'hotCold':
      showHotColdFriction(overlay, continueButton);
      break;
    case 'movingButton':
      showMovingButtonFriction(overlay, continueButton);
      break;
    default:
      showTimerFriction(overlay, continueButton);
  }
};

// Timer friction level
const showTimerFriction = (overlay, continueButton) => {
  // Just make the button clickable immediately after countdown
  continueButton.addEventListener('click', () => {
    overlay.remove();
    updateSkipCount();
    showPageContent();
    setTimeout(() => startScrollTracking(), 1000);
  });
};

// Fake loading bar friction - gets to 99% and sits there
const showFakeLoadingFriction = (overlay, continueButton) => {
  // Hide the timer since we have a loading bar
  const timerDiv = overlay.querySelector('.one-sec-timer');
  if (timerDiv) timerDiv.style.display = 'none';
  
  continueButton.style.display = 'none';
  continueButton.textContent = 'Loading your shame...';
  
  const loadingContainer = document.createElement('div');
  loadingContainer.style.textAlign = 'center';
  loadingContainer.style.marginTop = '20px';
  
  const loadingText = document.createElement('p');
  loadingText.textContent = 'Preparing your personalized guilt trip...';
  loadingText.style.marginBottom = '10px';
  
  const fakeLoadingBar = document.createElement('div');
  fakeLoadingBar.style = 'width: 100%; height: 20px; background: #ddd; border-radius: 10px; margin-bottom: 20px; overflow: hidden; position: relative;';
  
  const progressBar = document.createElement('div');
  progressBar.style = 'width: 0; height: 100%; background: linear-gradient(90deg, #76c7c0, #4a90e2); transition: width 0.2s; position: relative;';
  
  // Add some animated stripes to make it look more realistic
  const stripes = document.createElement('div');
  stripes.style = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px); animation: moveStripes 1s linear infinite;';
  progressBar.appendChild(stripes);
  
  fakeLoadingBar.appendChild(progressBar);
  loadingContainer.appendChild(loadingText);
  loadingContainer.appendChild(fakeLoadingBar);
  
  const contentDiv = overlay.querySelector('.one-sec-content');
  contentDiv.appendChild(loadingContainer);
  
  // Add CSS animation for stripes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes moveStripes {
      0% { background-position: 0 0; }
      100% { background-position: 40px 0; }
    }
  `;
  document.head.appendChild(style);

  let progress = 0;
  let stuckAt99 = false;
  const interval = setInterval(() => {
    if (!stuckAt99) {
      // More erratic progress that slows down as it approaches 99%
      if (progress < 80) {
        progress += Math.random() * 12 + 3; // Fast progress initially
      } else if (progress < 95) {
        progress += Math.random() * 4 + 1; // Slower progress
      } else if (progress < 99) {
        progress += Math.random() * 0.5 + 0.1; // Very slow progress
      } else {
        progress = 99;
        stuckAt99 = true;
        loadingText.textContent = 'Loading... 99% (Almost there...)';
        
        // Show button after being stuck at 99% for 3 seconds
        setTimeout(() => {
          clearInterval(interval);
          progressBar.style.width = '100%';
          loadingText.textContent = 'Loading complete! (Finally...)';
          setTimeout(() => {
            continueButton.style.display = 'block';
            continueButton.textContent = 'Continue (if you must)';
            continueButton.addEventListener('click', () => {
              overlay.remove();
              updateSkipCount();
              showPageContent();
              setTimeout(() => startScrollTracking(), 1000);
            });
          }, 500);
        }, 3000);
      }
      
      if (!stuckAt99) {
        progressBar.style.width = `${Math.min(progress, 99)}%`;
        loadingText.textContent = `Loading... ${Math.floor(Math.min(progress, 99))}%`;
      }
    }
  }, 200);
};
// Fake buttons friction level
const showFakeButtonsFriction = (overlay, continueButton) => {
  // Hide continue button and timer
  continueButton.style.display = 'none';
  const timerDiv = overlay.querySelector('.one-sec-timer');
  if (timerDiv) timerDiv.style.display = 'none';

  // Instruction text - replace the main button area
  const contentDiv = overlay.querySelector('.one-sec-content');
  const instructionText = document.createElement('p');
  instructionText.textContent = 'Find the real button to continue:';
  instructionText.style.cssText = `
    color: #666;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
    text-align: center;
  `;
  contentDiv.appendChild(instructionText);

  // Create buttons scattered across the page
  const realButtonIndex = Math.floor(Math.random() * 8);
  for (let i = 0; i < 8; i++) {
    const button = document.createElement('button');
    button.textContent = 'Continue to site';
    button.style = `
      position: absolute;
      background: #667eea;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 25px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      max-width: 200px;
    `;

    // Scatter buttons anywhere on the page but keep them on-screen
    const margin = 100; // Keep buttons away from edges
    const x = Math.random() * (window.innerWidth - 2 * margin - 200) + margin;
    const y = Math.random() * (window.innerHeight - 2 * margin - 50) + margin;
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

    button.addEventListener('click', i === realButtonIndex ? () => {
      overlay.remove();
      updateSkipCount();
      showPageContent();
      setTimeout(() => startScrollTracking(), 1000);
    } : () => {
      button.textContent = 'Nope! Try another';
      button.style.background = '#ff4444';
      setTimeout(() => {
        button.textContent = 'Continue to site';
        button.style.background = '#667eea';
      }, 500);
    });

    overlay.appendChild(button);
  }
};
// Hot/cold invisible button
const showHotColdFriction = (overlay, continueButton) => {
// Hide the timer and main button since they aren't needed
  const timerDiv = overlay.querySelector('.one-sec-timer');
  if (timerDiv) timerDiv.style.display = 'none';
  if (continueButton) continueButton.style.display = 'none';

  const contentDiv = overlay.querySelector('.one-sec-content');

  // Create an always hidden, smaller clickable area positioned relative to the entire overlay
  const invisibleButton = document.createElement('button');
  invisibleButton.style.cssText = `
    position: fixed;
    left: ${Math.random() * 60 + 20}%;
    top: ${Math.random() * 60 + 20}%;
    width: 30px;
    height: 15px;
    opacity: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1000000;
  `;
  overlay.appendChild(invisibleButton); // Append to overlay, not contentDiv

  // Hint display with temperature feedback
  const hintButton = document.createElement('button');
  hintButton.textContent = 'Find the hidden button by moving your mouse';
  hintButton.style.cssText = `
    background: #667eea;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: default;
    max-width: 300px;
    margin-top: 20px;
  `;
  contentDiv.appendChild(hintButton);

  // Define temperature levels
  const temperatureColors = {
    'Frozen solid! 🧊': '#0066cc',
    'Very cold ❄️': '#0080ff',
    'Cold 🔷': '#4da6ff',
    'Cool 🔹': '#80bfff',
    'Getting warmer 🔸': '#ffb366',
    'Warm 🔶': '#ff9933',
    'Hot 🔥': '#ff6600',
    'Very hot 🌋': '#ff3300',
    'Burning! 🔥🔥': '#ff0000'
  };

  // Attach mousemove to the entire overlay instead of just contentDiv
  overlay.addEventListener('mousemove', (e) => {
    updateTemperatureIndicator(e);
  });

  overlay.addEventListener('mouseenter', updateTemperatureIndicator);

  overlay.addEventListener('mouseleave', () => {
    hintButton.textContent = 'Find the hidden button by moving your mouse';
    hintButton.style.background = '#667eea';
  });

  function updateTemperatureIndicator(e) {
    const rect = invisibleButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

    // Temperature calculation
    let temperature;
    if (dist <= 30) {
      temperature = 'Burning! 🔥🔥';
    } else if (dist <= 60) {
      temperature = 'Very hot 🌋';
    } else if (dist <= 100) {
      temperature = 'Hot 🔥';
    } else if (dist <= 150) {
      temperature = 'Warm 🔶';
    } else if (dist <= 200) {
      temperature = 'Getting warmer 🔸';
    } else if (dist <= 250) {
      temperature = 'Cool 🔹';
    } else if (dist <= 300) {
      temperature = 'Cold 🔷';
    } else if (dist <= 400) {
      temperature = 'Very cold ❄️';
    } else {
      temperature = 'Frozen solid! 🧊';
    }

    hintButton.textContent = temperature;
    hintButton.style.background = temperatureColors[temperature];
  };

  invisibleButton.addEventListener('click', () => {
    overlay.remove();
    updateSkipCount();
    showPageContent();
    setTimeout(() => startScrollTracking(), 1000);
  });
};


// Moving button friction - even crazier movement
const showMovingButtonFriction = (overlay, continueButton) => {
  // Hide timer and setup moving button
  const timerDiv = overlay.querySelector('.one-sec-timer');
  if (timerDiv) timerDiv.style.display = 'none';

  continueButton.style.position = 'relative';
  continueButton.style.transition = 'all 0.2s ease';
  continueButton.textContent = 'Try to catch me! 😈';

  let moveCount = 0;
  const maxMoves = 15; // Reduced from 25 to make it more reasonable
  
  // Get button dimensions for boundary calculations
  const buttonWidth = 200; // Approximate button width
  const buttonHeight = 50; // Approximate button height
  const margin = 50; // Keep button away from edges
  
  // Calculate safe movement bounds (keep button on screen)
  const maxX = (window.innerWidth - buttonWidth - margin) / 2;
  const maxY = (window.innerHeight - buttonHeight - margin) / 2;

  const moveButton = () => {
    moveCount++;
    
    // More controlled movement - stay within safe bounds
    const randomX = (Math.random() - 0.5) * maxX * 1.5;
    const randomY = (Math.random() - 0.5) * maxY * 1.5;
    const randomRotation = (Math.random() - 0.5) * 30; // Less rotation

    continueButton.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    
    const messages = [
      `Nope! Try again! (${maxMoves - moveCount} left)`,
      `Missed me! (${maxMoves - moveCount} left)`,
      `Too slow! (${maxMoves - moveCount} left)`,
      `Can't catch me! (${maxMoves - moveCount} left)`,
      `Keep trying! (${maxMoves - moveCount} left)`,
      `Almost there! (${maxMoves - moveCount} left)`,
      `So close! (${maxMoves - moveCount} left)`,
      `One more time! (${maxMoves - moveCount} left)`,
      `Still trying? (${maxMoves - moveCount} left)`,
      `Getting tired? (${maxMoves - moveCount} left)`,
      `I'm faster! (${maxMoves - moveCount} left)`,
      `You're persistent! (${maxMoves - moveCount} left)`,
      `Almost got me! (${maxMoves - moveCount} left)`,
      `Final attempts! (${maxMoves - moveCount} left)`,
      `Last chance! (${maxMoves - moveCount} left)`
    ];

    continueButton.textContent = messages[Math.min(moveCount - 1, messages.length - 1)];
    
    if (moveCount >= maxMoves) {
      continueButton.textContent = 'Fine, you caught me! 😤';
      continueButton.style.transform = 'translate(0, 0) rotate(0deg)';
      continueButton.style.background = '#28a745'; // Green when caught
      continueButton.removeEventListener('mouseenter', moveButton);
      continueButton.removeEventListener('mouseover', moveButton);
      continueButton.removeEventListener('mousedown', moveButton);
    }
  };

  // Initiate move on hover, mouseover, and mousedown events
  continueButton.addEventListener('mouseenter', moveButton);
  continueButton.addEventListener('mouseover', moveButton);
  continueButton.addEventListener('mousedown', moveButton);
  
  continueButton.addEventListener('click', (e) => {
    if (moveCount >= maxMoves) {
      overlay.remove();
      updateSkipCount();
      showPageContent();
      setTimeout(() => startScrollTracking(), 1000);
    } else {
      e.preventDefault();
    }
  });
};


// Function to update skip count for current site
const updateSkipCount = () => {
  const siteName = getSiteName();
  const siteKey = `skipCount_${siteName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  chrome.storage.sync.get([siteKey, 'totalSkipCount'], function (result) {
    let siteSkipCount = result[siteKey] || 0;
    let totalSkipCount = result.totalSkipCount || 0;

    siteSkipCount++;
    totalSkipCount++;

    const updateData = {};
    updateData[siteKey] = siteSkipCount;
    updateData['totalSkipCount'] = totalSkipCount;

    chrome.storage.sync.set(updateData);
  });
};

// Function to get skip count for current site
const getCurrentSiteSkipCount = (callback) => {
  const siteName = getSiteName();
  const siteKey = `skipCount_${siteName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  
  chrome.storage.sync.get([siteKey], function(result) {
    callback(result[siteKey] || 0);
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

// Scroll tracking variables
let scrollTriggered = false;
let initialScrollY = 0;
let scrollThreshold = window.innerHeight; // One viewport height

// Function to handle scroll-based re-prompting
const handleScroll = () => {
  if (scrollTriggered) return;
  
  const currentScrollY = window.scrollY;
  const scrollDistance = currentScrollY - initialScrollY;
  
  // If they've scrolled one full viewport height
  if (scrollDistance >= scrollThreshold) {
    scrollTriggered = true;
    
    // Check if extension is still enabled
    chrome.storage.sync.get(['enabled'], function(result) {
      const enabled = result.enabled !== false;
      if (enabled) {
        // Get current delay setting and run the overlay again
        chrome.storage.sync.get(['delay'], function(result) {
          const delay = parseInt(result.delay) || 3;
          runOneSecDelay(delay, true); // Pass true to indicate this is a scroll trigger
        });
      }
    });
  }
};

// Function to start scroll tracking
const startScrollTracking = () => {
  initialScrollY = window.scrollY;
  scrollTriggered = false;
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Function to stop scroll tracking
const stopScrollTracking = () => {
  window.removeEventListener('scroll', handleScroll);
};

// Ensure initialization logic runs at correct timing
document.addEventListener('DOMContentLoaded', () => {
    initializeExtension();
});

