# One-Sec Reminder Browser Extension

Your digital intervention specialist (with a sense of humor) - now compatible with both Chrome and Firefox!

## Features

- **Progressive friction system**: The more you skip, the more creative the challenges become
- **Hot/cold mouse tracking**: Find the hidden button by following temperature clues
- **Moving button challenges**: Catch the elusive button that runs away from your cursor
- **Scroll tracking**: Catches you doom-scrolling and intervenes again
- **Guilt-based messaging**: Progressively more shameful messages based on your skip count
- **Cross-browser compatibility**: Works on both Chrome and Firefox

## Installation

### For Chrome

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder

### For Firefox

1. Clone or download this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension folder

**Note**: The same `manifest.json` file works for both browsers - no renaming required!

## Friction Levels

The extension has 5 escalating friction levels based on your skip count:

1. **Level 1 (0-1 skips)**: Simple timer countdown
2. **Level 2 (2-3 skips)**: Fake loading bar that gets stuck at 99%
3. **Level 3 (4-7 skips)**: Multiple fake buttons scattered around the page
4. **Level 4 (8-11 skips)**: Hot/cold invisible button game
5. **Level 5 (12+ skips)**: Moving button that runs away from your cursor

## Supported Sites

- Reddit
- Twitter/X
- YouTube
- Instagram
- Facebook
- TikTok

## How It Works

### Progressive Guilt System
The extension tracks how many times you've skipped the intervention on each site. The more you skip, the more creative (and guilt-inducing) the challenges become.

### Scroll Detection
After you bypass an intervention, the extension monitors your scrolling behavior. If you scroll more than one viewport height, it triggers another intervention with special "doom-scrolling" messaging.

### Friction Mechanics
- **Fake Loading**: Creates a realistic loading bar that gets stuck at 99% before revealing the real button
- **Fake Buttons**: Scatters multiple fake buttons around the page - only one is real
- **Hot/Cold Game**: Hides an invisible button that you must find using temperature feedback
- **Moving Button**: The button literally runs away from your cursor until you "catch" it

## Customization

### Settings
- **Enable/Disable**: Toggle the extension on/off
- **Delay Duration**: Set how long the countdown timer runs (1-5 seconds)

### Skip Counter
- View your "shame statistics" including total skips and per-site breakdown
- Reset your counter to start fresh

## Technical Details

### Cross-Browser Compatibility

The extension uses a compatibility layer that detects the browser environment:

```javascript
const browserAPI = (() => {
  if (typeof browser !== 'undefined') {
    return browser; // Firefox
  } else if (typeof chrome !== 'undefined') {
    return chrome; // Chrome
  } else {
    throw new Error('Browser API not available');
  }
})();
```

### Manifest Differences

- **Chrome**: Uses Manifest V3 with `action` field
- **Firefox**: Uses Manifest V2 with `browser_action` field and `browser_specific_settings`

### Other Features
- Built with vanilla JavaScript for performance
- Uses browser storage API for persistence
- Responsive design that works on all screen sizes
- Graceful degradation for different site layouts

## Development

To modify the extension:

1. Edit the source files (`content.js`, `popup.js`, `styles.css`)
2. The single `manifest.json` file works for both browsers
3. Reload the extension in your browser's extension manager

## Privacy

This extension:
- Only runs on the specified social media sites
- Stores data locally in your browser
- Does not collect or transmit any personal data
- Does not track your browsing history

## License

This project is open source and available under the MIT License.
