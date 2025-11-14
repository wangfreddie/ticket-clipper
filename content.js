// Prevent multiple injections
if (!window.jiraTicketCopierLoaded) {
    window.jiraTicketCopierLoaded = true;

    // Listen for keyboard shortcut: Cmd+Shift+Comma (Mac) or Ctrl+Shift+Comma (Windows/Linux)
    document.addEventListener('keydown', (event) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifierKey = isMac ? event.metaKey : event.ctrlKey;

        // cmd + shift + comma
        if (modifierKey && event.shiftKey && event.key === ',') {
            event.preventDefault();
            event.stopPropagation();
            copyBasic();
        }

        // cmd + shift + period
        if (modifierKey && event.shiftKey && event.key === '.') {
            event.preventDefault();
            event.stopPropagation();
            copyForMarkdown();
        }

        // cmd + shift + s
        if (modifierKey && event.shiftKey && event.key === 's') {
            event.preventDefault();
            event.stopPropagation();
            copyForSlack();
        }
    }, true); // Use capture phase to ensure we catch it first
}

function copyBasic() {
    const ticketId = extractTicketId();
    if (ticketId) {
        navigator.clipboard.writeText(ticketId).then(() => {
            showToast(`Copied: ${ticketId}`);
        }).catch(err => {
            console.error('Failed to copy ticket ID:', err);
            fallbackCopy(ticketId);
        });
    } else {
        showToast('No Jira ticket ID found on this page', true);
    }
}

function copyForMarkdown() {
    const ticketId = extractTicketId();
    if (ticketId) {
        const markdown = `[${ticketId}](https://procoretech.atlassian.net/browse/${ticketId})`;
        navigator.clipboard.writeText(markdown).then(() => {
            showToast(`Copied markdown: ${ticketId}`);
        }).catch(err => {
            console.error('Failed to copy markdown:', err);
            fallbackCopy(markdown);
        });
    } else {
        showToast('No Jira ticket ID found on this page', true);
    }
}

function copyForSlack() {
    const ticketId = extractTicketId();
    if (ticketId) {
        const url = `https://procoretech.atlassian.net/browse/${ticketId}`;

        // Copy as rich text (HTML) for Slack
        const htmlLink = `<a href="${url}">${ticketId}</a>`;

        navigator.clipboard.write([
            new ClipboardItem({
                'text/html': new Blob([htmlLink], { type: 'text/html' }),
                'text/plain': new Blob([url], { type: 'text/plain' })
            })
        ]).then(() => {
            showToast(`Copied Rich Text: ${ticketId}`);
        }).catch(err => {
            console.error('Failed to copy Slack link:', err);
            // Fallback to plain URL
            fallbackCopy(url);
        });
    } else {
        showToast('No Jira ticket ID found on this page', true);
    }
}



function extractTicketId() {
    const url = window.location.href;
    let ticketId = null;

    // Try to match /browse/TICKET-ID format
    const browseMatch = url.match(/\/browse\/([A-Z]+-\d+)/);
    if (browseMatch && browseMatch[1]) {
        ticketId = browseMatch[1];
    }

    // Try to match ?selectedIssue=TICKET-ID format
    if (!ticketId) {
        const selectedIssueMatch = url.match(/[?&]selectedIssue=([A-Z]+-\d+)/);
        if (selectedIssueMatch && selectedIssueMatch[1]) {
            ticketId = selectedIssueMatch[1];
        }
    }

    return ticketId;
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast(`Copied: ${text}`);
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showToast('Failed to copy ticket ID', true);
    }

    document.body.removeChild(textarea);
}

function showToast(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `jira-ticket-notification ${isError ? 'error' : 'success'}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

