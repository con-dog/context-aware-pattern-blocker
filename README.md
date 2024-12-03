# Context Aware Word & Phrase Blocker (Extension) 🛡️

AI-powered content filtering chrome extension that understands context. Unlike other content blockers, it knows when "shooting" means basketball vs violence, using Chrome's Gemini Nano to make smart unblocking decisions.

![Screenshot of extension blocking gambling content](./0__screenshots__0/Main%20Extension%20View%201.png)

---

![Screenshot of extension blocking gambling content](./0__screenshots__0/Create%20a%20rule%20view%20example.png)

## Features ✨

- **Context-Aware Filtering**: Unblock blocked content based on specific context insights, not just keywords
- **Dual Blocking Modes**: Choose between matching specific phrases or blocking surrounding content
- **AI-Powered Analysis**: Uses Gemini Nano to intelligently analyze blocked content for safe unblocking
- **Advanced Regex Support**: Create sophisticated filtering rules with regex and real-time syntax highlighting
- **Real-time Protection**: Blocks unwanted content instantly as you browse

# Examples
## 1) Blocking "Gambling" content with 2 blocking modes
Before blocking:

![Before](./0__screenshots__0/Gambling%20unblocked.png)
---
After blocking exact matches:

![After blocking exact matches](./0__screenshots__0/Gambling%20partial%20block.png)
---
After blocking surrounding text:

![After blocking surrounding text](./0__screenshots__0/Gambling%20full%20block.png)


## 2) Using AI to unblock content "Shooting" in a basketball context

1) First line blocking kicks in straight away on keyword "Shooting":

![Before](./0__screenshots__0/Shooting%201.png)

2) User selects blocked content and clicks "Analyze with AI" - the AI recommends its safe to unblock:

![Before](./0__screenshots__0/Shooting%202.png)

3) User unblocks the content:

![Before](./0__screenshots__0/Shooting%203.png)

4) Move to the next blocked content and repeat:

![Before](./0__screenshots__0/Shooting%204.png)

5) Safe to assume the content on this page is safe to unblock:

![Before](./0__screenshots__0/Shooting%205.png)


## API Used 🧠

- [Prompt API Cin Chrome Extensions](https://developer.chrome.com/docs/extensions/ai/prompt-api)

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
- React/TypeScript/Shadcn
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

# Story

## Inspiration
Like many people, I found myself increasingly affected by an endless stream of political content and sensitive, triggering topics online (politics, religion, war, substances, profanity) with no power to hide them.

Traditional keyword blockers - and there actually weren't any good ones at all - suffer from blocking legitimate content alongside unwanted content.

So I set out to:

1) Build an actual useful, usable content blocker
2) Make it a bit smarter

## What it does
First line, the extension uses powerful regex to block content. It can block content in two modes: matching specific phrases or blocking the entire surrounding text.

Secondly, it can analyze blocked content to determine if it's safe to unblock, based on context - for example, understanding when "shooting" refers to basketball rather than violence.

The user always has the power to determine their custom blocking rules and contexts, the AI simply guides them to determine content safety.

## How I built it
The development evolved through four major iterations:

1) Word Blocker
- Just a popup.html
- Started with vanilla JavaScript, no frameworks
- 1 pattern to block per line in textarea
- Implemented basic regex testing
- Simple content script to handle the actual text blocking
- Project was called "Word Blocker"
- No AI yet

2) Improving the UI/UX
- Moved to a SidePanel
- Started writing custom JS framework like JQuery for fun
- Re-used majority of UI from (1)
- Added complex syntax highlighting to regex textarea

3) Cloned Word Blocker, renamed it to "Context Aware .... Blocker"
- Moved away from sidepanel to a dedicated extension page
- Removed custom JS framework, added TypeScript, React, a build step for simpler state management
- Recreated the UI (Rules belong in a table now, rules are now a complex object, not just a pattern)
- Created forms for creating rules
- Rules can now take context (used later)

4) Okay we need the Sidepanel back (and a popup)!
- Now user flow is click popup, open either main extension page ( to manage rules) OR sidepanel (as you browse)
- Implement complex messaging system to handle rule changes, page changes, viewport changes (Popup -> Page  / Sidepanel <-> Content Script <-> Service Worker)
- Now we need to let the user UNBLOCK content - but how?
- Create a custom element unique selector generator, user can click on element selector in Sidepanel, then see blocked element highlighted in page
- Then get the AI to analyse the blocked content and assign a relevancy score
- Then its in the users hands to block/unblock content safely.

The final architecture involves careful coordination between the popup, sidepanel, extension homepage, content scripts, and service worker - all working together to provide seamless content filtering.

## Challenges I ran into
- Optimizing model performance and response time for real-time content analysis.
- Found the model could not handle "lots of hits" eg: if there were many "hits" for blocked content on a page, the model could not reliably give the content a relevancy score based on the users rules contexts.
- Tried parallel processing, mutation observers (only process content in view), batching, and ultimately nothing worked reliably when it came to content blocking - so I flipped the AI use-case to "smart unblocking" - that way content is unblocked piece-by-piece at a throughput and content-window size the AI can reliably handle and score sensibly for.
- Extension messaging and timing is tricky, my code got really bad and hacky due to this and time constraints.
- The code is terrible.
- Creating a sophisticated regex testing interface with live syntax highlighting by abusing a textarea - came up with a novel solution styling a "mirror" div behind the textarea.
- Balancing aggressive content blocking with user convenience and extensibility.

## Accomplishments that I'm proud of
- Built a sophisticated regex testing textarea with syntax highlighting, pushing the boundaries of what's possible with a textarea.
- Somehow it all works with the communication between all extension components (panel, popup, page, content scripts, service worker etc). Some known bugs.
- The UI looks great!
- It took ages to create a good system prompt for the Prompt API.
- Achieved real-time content filtering without impacting browsing performance at all.
- The AI feature I came up with isn't a "kitchen-sink" approach, I found a very relevant and useful application of on-device AI in my project.

## What I learned
- On-device AI is a complex beast, but powerful, and only getting better
- Don't roll your own UI framework. Just use React.

## Roadmap 🗺️
- [ ] Smarter first-pass content blocking, more configuration options
- [ ] Implement second pass content blocking based on semantic analysis
- [ ] Import / Export rules
- [ ] Content analytics dashboard
- [ ] More advanced AI analysis
- [ ] More advanced regex support


## License 📄

[MIT License](LICENSE)

## Privacy 🔒

This extension processes all content locally using Chrome's built-in AI.

## Support 💪

If you find this project helpful, please give it a ⭐️ on GitHub and consider supporting its development.

## Screenshots

![Main extension view](./0__screenshots__0/Main%20Extension%20View%201.png)
---
![Creating a rule](./0__screenshots__0/Create%20a%20rule%20view%20example.png)

![Screenshot of extension blocking gambling content](./0__screenshots__0/Shooting%203.png)

---

*Built with ❤️ for a better browsing experience*
