

# ChatGPT Interface Prototype

A pixel-perfect recreation of the ChatGPT UI as a design prototype — no backend, no AI integration, just the look and feel.

## Pages & Layout

### 1. Main Chat View
- **Sidebar** (collapsible) with:
  - "New Chat" button at the top
  - List of past conversations (hardcoded/mock), grouped by "Today", "Yesterday", "Previous 7 Days"
  - User profile section at the bottom with avatar and name
- **Chat Area** with:
  - Clean centered layout with model selector dropdown at the top (e.g. "GPT-4o")
  - Message bubbles — user messages (right-aligned or distinct style) and assistant messages (left-aligned with GPT avatar)
  - Markdown-style formatting in assistant responses (code blocks, lists, bold)
  - "Copy", "Thumbs up/down" action icons on assistant messages

### 2. Empty/Welcome State
- Centered greeting: "What can I help with?"
- Suggestion chips/cards for quick prompts (e.g. "Write a poem", "Explain quantum computing")

### 3. Chat Input Bar
- Textarea input at the bottom with placeholder "Message ChatGPT..."
- Attach file icon, web search toggle
- Send button (arrow icon) that activates when text is entered
- Typing simulation — clicking send shows a brief loading animation then renders a mock response

## Design Details
- **Dark mode by default** matching ChatGPT's dark theme (with option to toggle light mode)
- Clean, minimal typography (sans-serif)
- Smooth sidebar open/close animation
- Responsive: sidebar collapses to hamburger on mobile
- Mock data for conversations and messages — everything is static/hardcoded

## Interactions (No Backend)
- Clicking "New Chat" clears the chat area and shows the welcome state
- Clicking a sidebar conversation loads mock messages
- Typing and hitting send appends the user message and shows a mock AI response
- Sidebar can be toggled open/closed

