# CHANGELOG

All notable changes to One-Sec Reminder will be documented in this file.

## [Unreleased] - 2025-07-09

### Added - The Great Shame Update 🔥

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
