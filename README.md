# One-Sec Reminder 🕰️

A Chrome extension that adds a mindful pause before accessing addictive websites like Reddit, Twitter, YouTube, and more.

## Features

- **Mindful Pause**: Shows a 1-3 second countdown before accessing social media sites
- **Customizable Delay**: Choose from 1 to 5 seconds of delay
- **Toggle On/Off**: Easily enable or disable the extension
- **Beautiful UI**: Clean, modern interface with smooth animations
- **Dark Mode Support**: Automatically adapts to your system's theme

## Supported Sites

- Reddit
- Twitter/X
- YouTube
- Instagram
- Facebook
- TikTok

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `one-sec-reminder` folder
5. The extension should now be installed and active

### Icon Setup

Since the extension uses placeholder icons, you can:
1. Open `create-icons.html` in your browser
2. Right-click each generated icon and save as PNG
3. Replace the placeholder `icon16.png`, `icon48.png`, and `icon128.png` files

## Usage

1. **Automatic Activation**: The extension automatically activates when you visit supported sites
2. **Settings**: Click the extension icon in the toolbar to access settings
3. **Customization**: Adjust the delay duration or disable the extension entirely

## How It Works

When you navigate to a supported site, the extension:
1. Temporarily hides the page content
2. Shows a mindful overlay with a countdown
3. Asks you to consider if this is how you want to spend your time
4. Provides a "Continue" button after the countdown completes

## Settings

- **Enable/Disable**: Toggle the extension on or off
- **Delay Duration**: Choose from 1, 2, 3, or 5 seconds

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `activeTab`, `storage`
- **Content Scripts**: Injected into supported sites
- **Storage**: Uses Chrome's sync storage for settings

## Privacy

This extension:
- ✅ Works entirely offline
- ✅ Stores settings locally in Chrome
- ✅ Does not collect or transmit any data
- ✅ Does not track your browsing habits

## Development

### File Structure
```
one-sec-reminder/
├── manifest.json       # Extension configuration
├── content.js          # Main extension logic
├── styles.css          # UI styling
├── popup.html          # Settings popup
├── popup.js            # Settings logic
├── icon16.png          # 16x16 icon
├── icon48.png          # 48x48 icon
├── icon128.png         # 128x128 icon
└── README.md           # This file
```

### Building

No build process required - this is a vanilla JavaScript extension.

## License

MIT License - feel free to modify and distribute!

## Contributing

Pull requests welcome! Please ensure your code follows the existing style and includes appropriate comments.

## Inspiration

Inspired by the [One Sec app](https://one-sec.app/) for mobile devices, bringing mindful browsing to the desktop.
