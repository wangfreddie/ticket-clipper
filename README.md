# Jira Ticket ID Copier

A Chrome extension that allows you to quickly copy Jira ticket IDs to your clipboard with a simple keyboard shortcut.

## Features

- 🎯 Extract and copy Jira ticket IDs from any Atlassian Jira page
- ⌨️ Use keyboard shortcuts: **Cmd+Shift+Comma** (macOS) or **Ctrl+Shift+Comma** (Windows/Linux)
- 📋 Automatic clipboard copying
- ✅ Visual confirmation notification when ticket ID is copied
- 🔄 Works on any `*.atlassian.net` Jira instance

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `jira-ext` folder
5. The extension is now installed!

## Usage

1. Navigate to any Jira ticket page (e.g., `https://procoretech.atlassian.net/browse/NOTIF-3031`)
2. Press **Cmd+Shift+Comma** (macOS) or **Ctrl+Shift+Comma** (Windows/Linux)
3. The ticket ID (e.g., `NOTIF-3031`) will be copied to your clipboard
4. A green notification will appear confirming the copy

## Customizing the Keyboard Shortcut

The keyboard shortcut is **Cmd+Shift+Comma** (macOS) or **Ctrl+Shift+Comma** (Windows/Linux).

If you want to change it, you'll need to modify the keyboard event listener in `content.js` (line 11) and change the key detection logic.

## How It Works

The extension:
1. Injects a content script on all Atlassian Jira pages
2. Listens for the keyboard shortcut (Cmd/Ctrl+Shift+Comma)
3. Extracts the ticket ID from the current page URL using a regex pattern (`/browse/[A-Z]+-\d+`)
4. Copies the ticket ID to your clipboard using the Clipboard API
5. Shows a brief notification to confirm the action

## Architecture

This is a simple single-file extension:
- **content.js** - Listens for keyboard shortcuts, extracts ticket ID from URL, and copies to clipboard
- **manifest.json** - Defines the extension configuration and which sites it runs on
- No background worker needed! Everything runs directly in the page context.

## Supported URL Pattern

The extension matches Jira ticket URLs in the format:
- `https://*.atlassian.net/browse/[PROJECT-KEY]-[NUMBER]`

Examples:
- `https://procoretech.atlassian.net/browse/NOTIF-3031` → Copies `NOTIF-3031`
- `https://yourcompany.atlassian.net/browse/PROJ-123` → Copies `PROJ-123`

