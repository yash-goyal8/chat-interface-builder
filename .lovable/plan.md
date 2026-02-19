

# Responsive UI + Ad Placements for Phone, Tablet, and Laptop

## Breakpoints

| Device | Width | Tailwind Prefix |
|--------|-------|-----------------|
| Phone | below 768px | default (no prefix) |
| Tablet | 768px - 1023px | `md:` |
| Laptop/Desktop | 1024px+ | `lg:` |

## Layout Changes by Device

### Phone (below 768px)
- **Left sidebar**: Overlay mode -- opens as a full-screen overlay with a backdrop, closes on conversation select or backdrop click. Default closed.
- **Right ad sidebar**: Hidden entirely.
- **Suggestion grid**: Single column (`grid-cols-1`) instead of 2.
- **Ad placements**:
  - **Inline ads in chat**: A `320x100` "Large Mobile Banner" inserted every 3 messages in the chat scroll.
  - **Welcome screen ad**: A `320x250` ad below the suggestion chips.

### Tablet (768px - 1023px)
- **Left sidebar**: Same overlay behavior as phone (hidden by default, slides in as overlay).
- **Right ad sidebar**: Hidden.
- **Suggestion grid**: Keep 2 columns.
- **Ad placements**:
  - **Sticky bottom banner**: A `728x90` "Leaderboard" ad fixed above the chat input area.
  - **Inline ads in chat**: Same `320x100` banners every 3 messages.
  - **Welcome screen ad**: A `468x60` banner below the suggestion chips.

### Laptop/Desktop (1024px+)
- **Left sidebar**: Current push behavior (no overlay), toggles width 0/256px.
- **Right ad sidebar**: Visible, locked at 300px with the existing 300x250 and 300x600 slots.
- **No inline ads or bottom banners** -- the sidebar handles monetization.

## Technical Implementation

### 1. Update `ChatSidebar.tsx` -- Mobile/Tablet Overlay
- On screens below `lg` (below 1024px), when `isOpen` is true, render the sidebar as a fixed overlay with a semi-transparent backdrop.
- Clicking the backdrop or selecting a conversation closes the sidebar.
- On `lg+`, keep the current push-style behavior.

### 2. Update `Index.tsx` -- Sidebar default state
- Use the `useIsMobile` hook concept but with a broader check: default `sidebarOpen` to `false` on screens below 1024px.
- Add the sidebar toggle button in the header for all screen sizes when sidebar is closed.
- Render inline ad banners every 3 messages in the chat area, wrapped in `lg:hidden` so they only show on phone/tablet.
- Render a sticky `728x90` tablet banner above `ChatInput`, visible only on `md` screens (`hidden md:block lg:hidden`).

### 3. Create `MobileAdBanner.tsx`
- A reusable component for inline chat ads.
- Renders a centered `320x100` placeholder with "Advertisement" label.
- Hidden on desktop (`lg:hidden`).

### 4. Update `WelcomeScreen.tsx`
- Add a `320x250` ad placeholder below the suggestion grid on mobile (`md:hidden`).
- Add a `468x60` ad placeholder below the suggestion grid on tablet (`hidden md:block lg:hidden`).

### 5. Update `ChatInput.tsx` or `Index.tsx`
- Add a `728x90` sticky leaderboard banner above the input on tablet only (`hidden md:block lg:hidden`).

### 6. `AdSidebar.tsx` -- No changes
- Already has `hidden lg:flex` which handles the responsive hiding correctly.

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/chat/MobileAdBanner.tsx` | Create -- inline 320x100 ad component |
| `src/components/chat/TabletAdBanner.tsx` | Create -- 728x90 leaderboard banner |
| `src/components/chat/ChatSidebar.tsx` | Modify -- overlay mode for mobile/tablet |
| `src/components/chat/WelcomeScreen.tsx` | Modify -- add mobile/tablet ad slots |
| `src/pages/Index.tsx` | Modify -- responsive sidebar default, inline ads every 3 messages, tablet banner |
| `src/hooks/use-mobile.tsx` | Modify -- add `useIsDesktop` or adjust breakpoint logic |

