# Jira Ticket ID Copier

A browser extension that allows you to quickly copy Jira ticket IDs the right way.

## Why

Often times you are typing a message and want to link or reference a Jira ticket.

> Hey I was looking into https://mycompany.atlassian.net/browse/PROJECT-123 and ...

That doesn't read very nicely. The alternative is to manually link it by typing out the markdown
> Hey I was looking into [PROJECT-123]\(https://mycompany.atlassian.net/browse/PROJECT-123) and...

That is a lot of typing. Or if a certain specific enterprise messaging application tricks you into thinking it supports Markdown but actually uses its own thing called `mrkdown` which doesn't support Markdown links, you now have to type it out, highlight the ticket ID, and paste in the hyperlink.
> Hey I was looking into PROJECT-123 <highlight PROJECT-123> <paste> <enter> and...

That is a lot of work.

This extension does the work for you.

## Features

- ⌨️ Keyboard shortcuts on Jira pages like `https://mycompany.atlassian.net/browse/PROJECT-123` or `https://mycompany.atlassian.net/jira/software/c/projects/PROJECT/boards/387/backlog?selectedIssue=PROJECT-123`
- 📋 Automatic clipboard copying
- Copy vanilla ticket ID
    - ex: string `PROJ-123`
- Copy ticket ID with link in Markdown format 
    - ex: string `[PROJ-123](https://mycompany.atlassian.net/browse/PROJECT-123)`
- Copy ticket ID with link with rich text link
    - ex: ClipboardItem with an HTML `<a href="https://mycompany.atlassian.net/browse/PROJECT-123">PROJECT-123</a>`, which pastes nicely into Slack or other editors that support this; uses the original url as a fallback.
- ??? more to come if I find something else annoying with Jira

## Installation

### Option 1: Chrome Extension

1. Download or clone this repository to your computer.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked** and select the folder containing the extension files (e.g., `jira-ext`).
5. The extension will appear in your extensions list and is now ready to use.

### Option 2: Tampermonkey Userscript

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension in your browser (available for Chrome, Firefox, Edge, etc.).
2. Click the Tampermonkey extension icon and select **Create a new script...**.
3. Copy the contents of `.tampermonkey/jira-ticket-copier.user.js` from this repository.
4. Paste it into the Tampermonkey editor, then click **File > Save** (or press `Ctrl+S`).
5. The userscript will automatically run on Jira pages and enable the ticket copier functionality.

Choose the approach that works best for your workflow. Both provide the same keyboard shortcuts and features!

## Usage

1. Navigate to any Jira ticket page, or Jira page that has a `selectedIssue=` ticket
2. Use the keyboard shortcuts (see below)
3. The corresponding text will be on your clipboard, along with a confirmation message

#### Keyboard shortcuts:
- `Cmd + Shift + Comma`: just the ticket ID. 
- `Cmd + Shift + Period`: ticket ID with link in Markdown format
- `Cmd + Shift + S`: ticket ID with link in Rich Text (HTML) format


## Supported URL Pattern

The extension is intended to match Jira ticket URLs in the format:
- `https://*.atlassian.net/browse/[PROJECT-KEY]-[NUMBER]`
- `https://*.atlassian.net/jira/software/c/projects/*/boards/*/backlog?selectedIssue=[PROJECT-KEY]-[NUMBER]`

Examples:
- `https://procoretech.atlassian.net/browse/NOTIF-3031` → Copies `NOTIF-3031`
- `https://yourcompany.atlassian.net/browse/PROJ-123` → Copies `PROJ-123`

