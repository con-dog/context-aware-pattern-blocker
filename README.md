# Context Aware Word & Phrase Blocker 🛡️

An intelligent Chrome extension that filters online content using powerful context-aware rules and AI.

Unlike traditional content blockers, this extension understands context - knowing when "shooting" means basketball versus violence - using Chrome's built-in Gemini Nano AI.

![Screenshot of extension blocking gambling content](./0__screenshots__0/Shooting%204.png)

## Features ✨

- **Context-Aware Filtering**: Unblock blocked content based on specific context insights, not just keywords
- **Dual Blocking Modes**: Choose between matching specific phrases or blocking surrounding content
- **AI-Powered Analysis**: Uses Gemini Nano to intelligently analyze blocked content for safe unblocking
- **Advanced Regex Support**: Create sophisticated filtering rules with regex and real-time syntax highlighting
- **Real-time Protection**: Blocks unwanted content instantly as you browse

## Installation 🚀
1. Clone this repository
2. Install dependencies `npm install | pnpm install`
3. Build the project `npm run build | pnpm run build`
4. Open Chrome and navigate to `chrome://extensions`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the `dist` directory containing the built extension

## Usage 💡

1. Click the extension icon to open the popup panel
2. Follow the onscreen instructions to create new rules (`Open Rules App`)
3. Click `Add new rule`
4. Add a name, and block pattern then use the inline regex tester to verify your patterns
5. Browse normally - matching content will be blocked automatically
6. Select blocked content and use "Analyze with AI" to check if it should be unblocked

## Technical Details 🔧

- Built with Chrome Extension Manifest V3
- Uses Chrome's built-in Gemini Nano AI model
- Complex architecture coordinating:
  - Popup interface
  - Side panel
  - Extension home page
  - Content scripts
  - Service worker

## Development 🛠️

```bash
# Install dependencies
npm install

# Build extension
npm run build

# build and watch for changes
npm run build --watch
```

## Roadmap 🗺️

- [ ] Import / Export rules
- [ ] Content analytics dashboard


## License 📄

[MIT License](LICENSE)

## Privacy 🔒

This extension processes all content locally using Chrome's built-in AI.

## Support 💪

If you find this project helpful, please give it a ⭐️ on GitHub and consider supporting its development.

---

*Built with ❤️ for a better browsing experience*
