# CHANGELOG

All notable changes to One-Sec Reminder will be documented in this file.

## [Unreleased] - 2025-07-09

### Added - Cross-Browser Compatibility & Bug Fixes 🌐

#### Cross-Browser Compatibility
- **NEW**: Firefox support added alongside Chrome compatibility
- **NEW**: Universal browser API detection layer that works with both `chrome.*` and `browser.*` APIs
- **NEW**: Single manifest.json file that works for both Chrome (V3) and Firefox (V2)
- **NEW**: Manifest includes both `browser_action` and `action` fields for universal compatibility
- **NEW**: Firefox-specific settings with `browser_specific_settings` configuration
- **IMPROVED**: Installation process simplified - no file renaming required
- **IMPROVED**: Documentation updated with installation instructions for both browsers

#### Bug Fixes & Improvements
- **FIXED**: Hot/cold mouse tracking now works across entire purple background overlay (not just white card)
- **FIXED**: Moving button properly contained within screen boundaries
- **FIXED**: Moving button speed reduced and movement range optimized for better user experience
- **FIXED**: Button height issues in Firefox - all buttons now have consistent height and proper text centering
- **FIXED**: Moving button mouseover behavior in Chrome - now properly triggers on hover events
- **IMPROVED**: Button styling uses flexbox for proper vertical centering across browsers
- **IMPROVED**: Moving button attempts reduced from 25 to 15 for better user experience
- **IMPROVED**: Button transitions slowed from 0.1s to 0.2s for smoother movement
- **IMPROVED**: All inline button styles now include min-height and proper centering

#### Technical Improvements
- **ENHANCED**: Cross-browser API compatibility layer automatically detects browser environment
- **ENHANCED**: Button styling consistency across all friction levels
- **ENHANCED**: Event handling for moving button improved with multiple event types
- **ENHANCED**: Proper boundary calculations for moving elements
- **ENHANCED**: Enhanced mouseover detection for better cross-browser compatibility

### Added - The Great Shame Update 🔥

#### Modular Friction System - Choose Your Annoyance Level 🎭🎮
- **NEW**: Modular system with 6 friction levels, easily reorderable
- **Level 1: Timer** - 5-second wait before proceeding
- **Level 2: Fake Loading Bar** - Pretend loading with progress bar
- **Level 3: Fake Buttons** - Find the real button among fakes
- **Level 4: Hot/Cold Invisible Button** - Find invisible button with hints
- **Level 5: Captcha Hell** - Simple checkbox captcha simulation
- **Level 6: Moving Button** - Runs away, 8 moves before you can catch it
- **IMPROVED**: Dynamic configuration allows easy rearrangement of friction levels
- **NEW**: Progressive friction system that gets more annoying with each skip
- **Skip 1-2**: Normal button behavior (being nice... for now)
- **Skip 3-5**: **Moving Button** - runs away from cursor when you hover!
  - Button moves to random positions **8 times** before you can catch it (increased from 3)
  - **Much larger movement range**: 300px horizontal, 200px vertical (tripled!)
  - **Faster animations**: 0.2s transitions make it snappier and more evasive
  - **Multiple triggers**: Moves on hover, mouseover, AND click attempts
  - **Varied taunting messages**: "Nope! Try again!", "Missed me!", "Too slow!", "Can't catch me!"
  - Text changes to "Try to click me! 😈" and progresses through sarcastic messages
  - **Much more genuinely frustrating** - takes real effort to catch
- **Skip 6+**: **Math Puzzle** - solve simple addition to continue
  - Random math problems (e.g., "7 + 3 = ?")
  - Wrong answers show "Wrong! Try again, genius. 🤦‍♂️"
  - Forces actual brain engagement instead of mindless clicking
- **IMPROVED**: Much more entertaining than boring click counters

#### Site-Specific Skip Tracking System 🎯
- **NEW**: Skip counts are now tracked individually per site (Reddit, Twitter/X, YouTube, etc.)
- **NEW**: Site-specific storage keys (e.g., `skipCount_reddit`, `skipCount_youtube`) for granular tracking
- **NEW**: Total skip count (`totalSkipCount`) maintained across all sites
- **NEW**: Site-specific shame messages that reference individual site skip counts
- **NEW**: Enhanced statistics display showing per-site breakdown in popup
- **NEW**: Smart reset functionality that clears all site-specific counters
- **IMPROVED**: More personalized guilt messages ("You've ignored me 3 times on Reddit")

#### Scroll-Based Re-Prompting System 📜
- **NEW**: Scroll tracking that triggers shame overlay after one viewport height of scrolling
- **NEW**: Special "CAUGHT YOU DOOM-SCROLLING!" messages for scroll triggers
- **NEW**: Escalating scroll-shame messages based on existing skip count:
  - **Low skip count**: "I saw you scrolling... and scrolling... This is exactly what I was trying to prevent! 🤦‍♂️"
  - **Medium skip count**: "Really? You bypassed my warning AND now you're doom-scrolling? I'm losing faith in humanity. 😮‍💨"
  - **High skip count**: "OH COME ON! Not only did you ignore me, but now you're mindlessly scrolling?! 🤬"
- **NEW**: Scroll-specific button text ("Continue your mindless scrolling", "Continue doom-scrolling like a zombie")
- **NEW**: Passive scroll listener with automatic cleanup and 1-second delay
- **NEW**: Red color scheme for scroll-triggered overlays
- **NEW**: Scroll detection counter ("One full page of mindless scrolling detected. 📱💀")

#### Enhanced Statistics and UI 📊
- **NEW**: Popup shows total skip count plus per-site breakdown
- **NEW**: Site breakdown display ("Reddit: 5 • YouTube: 3") in popup
- **NEW**: Motivational message when no skips recorded ("No skips yet... staying strong! 💪")
- **NEW**: Visual escalation based on total skip count across all sites
- **IMPROVED**: Reset button now clears all site-specific data
- **IMPROVED**: Button centering fixed for longer shame text messages

#### Skip Count Tracking System
- **NEW**: Extension now tracks every time user clicks "Continue" to bypass the delay
- **NEW**: Skip count is stored persistently in Chrome sync storage
- **NEW**: Progressive guilt system that escalates with each skip

#### Intermodal (Overlay) Enhancements - Maximum Shame Mode
- **ENHANCED**: Dynamic guilt messages that get progressively more brutal:
  - **Skip 1**: "Is this how you want to spend your time?" (baseline)
  - **Skip 2+**: "Seriously? AGAIN? Your future self is crying. 😭"
  - **Skip 4+**: "At this rate, you'll achieve nothing today. Congrats! 🎉"
  - **Skip 6+**: "Your goals are laughing at you right now. Can you hear them? 😂"
  - **Skip 9+**: "Just uninstall me. You clearly don't want help. I'll go cry in a corner now. 💔"
  - **Skip 13+**: "At this point, I'm just here to watch you destroy your own productivity. 🍿"

- **ENHANCED**: Dynamic header text that escalates with shame:
  - **Default**: "Take a breath..."
  - **Skip 4+**: "Another productive moment... WASTED"
  - **Skip 6+**: "REALLY? AGAIN?!" (in red, uppercase)
  - **Skip 9+**: "I've given up on you"
  - **Skip 13+**: "Another failure incoming..."

- **NEW**: Extra shame messages with calculated time waste:
  - Shows skip count and estimated wasted time
  - Gets increasingly disappointed with each skip
  - Red text styling for maximum guilt impact

- **ENHANCED**: Button text evolution for maximum shame:
  - **Default**: "Continue to [Site]"
  - **Skip 2+**: "Fine, waste more time on [Site]"
  - **Skip 4+**: "Surrender your dreams to [Site]"
  - **Skip 6+**: "Shamefully crawl to [Site]"
  - **Skip 9+**: "Pathetically crawl to [Site] (loser)"
  - **Skip 13+**: "Continue your descent into digital hell"

- **NEW**: Visual escalation system:
  - Button color changes to red for skip counts > 5
  - Guilt message text becomes bold and colored for skip counts > 1
  - Header text becomes red and uppercase for skip counts > 3

#### Popup Window Enhancements - Persistent Shame
- **NEW**: "Shame Counter" display showing total skip count
- **NEW**: Dynamic header messages based on skip behavior:
  - **Default**: "Your friendly neighborhood procrastination buster"
  - **Skip 3+**: "I've seen you around before... 🤔"
  - **Skip 6+**: "Seems like you're a regular here... 🙃"
  - **Skip 11+**: "Still procrastinating? 😒"

- **NEW**: Progressive footer shame messages:
  - **Default**: "Take a moment to consider your digital habits"
  - **Skip 3+**: "Maybe consider doing something productive? 🤷"
  - **Skip 6+**: "You know what you should be doing instead... 😏"
  - **Skip 11+**: "Your productivity called. It's very disappointed. 😔"
  - **Skip 16+**: "At this point, I'm just watching you fail... 😑"

- **NEW**: Visual shame escalation for skip counter:
  - **Skip 6+**: Red border, light red background, red text
  - **Skip 11+**: Darker red border, darker red background, bold red text
  - **Skip 16+**: Text changes to "(pathetic!)" for maximum shame

- **NEW**: Progressive shame labels for skip count:
  - **Skip 6+**: "X guilty escapes (yikes!)"
  - **Skip 11+**: "X guilty escapes (seriously?!)"
  - **Skip 16+**: "X guilty escapes (pathetic!)"

- **NEW**: "Reset (Fresh Start)" button to reset shame counter
- **ENHANCED**: Reset button shows encouraging "Starting fresh! 🚀" message temporarily

#### Technical Changes
- **ENHANCED**: `content.js` - Added skip count tracking and progressive messaging system
- **ENHANCED**: `popup.js` - Added dynamic shame updates and visual styling changes
- **ENHANCED**: `popup.html` - Added shame counter display and dynamic message containers
- **ENHANCED**: `manifest.json` - Updated description to "Your digital intervention specialist (with a sense of humor)"

#### UX Improvements
- **IMPROVED**: Messages now use psychological escalation techniques
- **IMPROVED**: Visual feedback increases with shame level
- **IMPROVED**: Consistent snarky tone throughout all interfaces
- **IMPROVED**: Time-based guilt calculations for added impact

### Changed
- **BREAKING**: Extension now prioritizes shame over gentle reminders
- **BREAKING**: User experience becomes increasingly uncomfortable with repeated use
- **IMPROVED**: All user-facing text now has witty/snarky tone
- **IMPROVED**: Popup settings description changed to "How long should I shame you?"

### Technical Details
- Skip count stored in `chrome.storage.sync` for cross-device synchronization
- Progressive messaging system uses conditional logic based on skip thresholds
- Visual styling changes applied dynamically via JavaScript
- All shame messages designed to be humorous while encouraging behavior change

---

## [1.0.0] - Previous Release

### Added
- Initial release with basic mindful pause functionality
- Support for Reddit, Twitter/X, YouTube, Instagram, Facebook, TikTok
- Configurable delay duration (1-5 seconds)
- Enable/disable toggle
- Dark mode support
- Clean, modern UI with smooth animations

### Features
- Mindful pause before accessing addictive websites
- Customizable delay duration
- Beautiful overlay with countdown timer
- Settings popup for configuration
- Cross-site functionality
