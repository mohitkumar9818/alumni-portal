# Dashboard QA Checklist

## Pre-Testing Setup

### 1. Install Dependencies
```bash
cd frontend
npm install framer-motion recharts lucide-react @react-three/fiber @react-three/drei three
```

### 2. Seed Leaderboard Data
```bash
# From project root
seed-leaderboard.bat
```

### 3. Start Services
- Backend: `start-backend.bat` (port 5000)
- Frontend: `start-frontend.bat` (port 5173)
- Verify you're logged in

---

## Functional Testing

### ✅ Time-Based Greeting

**Test 1: Morning Greeting (5:00 - 11:59)**
- [ ] Change system time to 9:00 AM
- [ ] Refresh dashboard
- [ ] Verify greeting shows "Good Morning" with 🌅 emoji
- [ ] Verify user's name is displayed

**Test 2: Afternoon Greeting (12:00 - 16:59)**
- [ ] Change system time to 2:00 PM
- [ ] Refresh dashboard
- [ ] Verify greeting shows "Good Afternoon" with ☀️ emoji

**Test 3: Evening Greeting (17:00 - 20:59)**
- [ ] Change system time to 7:00 PM
- [ ] Refresh dashboard
- [ ] Verify greeting shows "Good Evening" with 🌆 emoji

**Test 4: Night Greeting (21:00 - 4:59)**
- [ ] Change system time to 11:00 PM
- [ ] Refresh dashboard
- [ ] Verify greeting shows "Good Night" with 🌙 emoji

---

### ✅ KPI Grid

**Test 5: KPI Cards Display**
- [ ] Verify 4 KPI cards are visible
- [ ] Check "Monthly Active Users" card shows value and sparkline
- [ ] Check "Mentorships This Week" card shows value and sparkline
- [ ] Check "Donations This Month" card shows value and sparkline
- [ ] Check "Events Today" card shows value and sparkline

**Test 6: Sparklines**
- [ ] Verify each card has a line chart at the bottom
- [ ] Charts should show trend data
- [ ] Lines should be colored (blue, green, orange, purple)

**Test 7: Hover Tilt Animation**
- [ ] Hover over each KPI card
- [ ] Verify card tilts slightly (3D perspective effect)
- [ ] Verify card elevates with shadow
- [ ] Verify icon scales up slightly
- [ ] Verify chart opacity increases

**Test 8: KPI Responsive Layout**
- [ ] Desktop (>1024px): 4 columns
- [ ] Tablet (768-1024px): 2 columns
- [ ] Mobile (<768px): 1 column

---

### ✅ AI Chat Widget

**Test 9: Widget Button**
- [ ] Verify floating button in bottom-right corner
- [ ] Button shows message icon
- [ ] Click button to open widget
- [ ] Verify widget panel appears

**Test 10: Chat Interface**
- [ ] Widget header shows "AI Career Assistant"
- [ ] Status indicator shows "Online" with green dot
- [ ] Initial AI message is displayed
- [ ] Quick action buttons are visible

**Test 11: Send Message**
- [ ] Type a message in input field
- [ ] Click send button
- [ ] Verify message appears in chat
- [ ] Verify loading indicator (typing dots) appears
- [ ] Verify AI response is received
- [ ] Verify timestamp is shown

**Test 12: Quick Actions**
- [ ] Click "Help with resume" button
- [ ] Verify text appears in input field
- [ ] Send the message
- [ ] Verify AI responds appropriately

**Test 13: Authorization Header**
- [ ] Open browser DevTools → Network tab
- [ ] Send a message in AI widget
- [ ] Find the POST request to `/api/ai/chat`
- [ ] Verify `Authorization: Bearer <token>` header is present
- [ ] Verify no API keys in request

**Test 14: Widget Controls**
- [ ] Click minimize button (⏷)
- [ ] Verify widget collapses to header only
- [ ] Click maximize button (⏶)
- [ ] Verify widget expands
- [ ] Click close button (X)
- [ ] Verify widget closes
- [ ] Click floating button again
- [ ] Verify widget reopens with message history

**Test 15: Keyboard Interaction**
- [ ] Focus on input field
- [ ] Type message and press Enter
- [ ] Verify message sends
- [ ] Press Shift+Enter
- [ ] Verify new line is created (message doesn't send)

---

### ✅ Leaderboard Preview

**Test 16: Leaderboard Display (Desktop)**
- [ ] Verify "Top Alumni" section is visible
- [ ] Verify 5 alumni cards are shown
- [ ] Center card should be larger/more prominent
- [ ] Rank badges show 🥇, 🥈, 🥉 for top 3

**Test 17: Carousel Navigation**
- [ ] Click right arrow button
- [ ] Verify carousel moves to next alumni
- [ ] Click left arrow button
- [ ] Verify carousel moves to previous alumni
- [ ] Press Right Arrow key
- [ ] Verify carousel advances
- [ ] Press Left Arrow key
- [ ] Verify carousel goes back

**Test 18: Profile Modal**
- [ ] Click on an alumni card
- [ ] Verify modal opens
- [ ] Modal shows:
  - [ ] Alumni photo/avatar
  - [ ] Name and company
  - [ ] Graduation year
  - [ ] Score breakdown (4 scores)
  - [ ] Badges with icons
- [ ] Click X button to close
- [ ] Verify modal closes
- [ ] Press Escape key
- [ ] Verify modal closes

**Test 19: Mobile Leaderboard**
- [ ] Resize browser to mobile width (<768px)
- [ ] Verify carousel is hidden
- [ ] Verify vertical list is shown
- [ ] All 5 alumni visible in list
- [ ] Click an alumni
- [ ] Verify modal opens

**Test 20: View All Link**
- [ ] Click "View All →" link
- [ ] Verify navigation to `/leaderboard` page
- [ ] Use browser back button
- [ ] Verify return to dashboard

---

### ✅ 3D Globe / 2D Map

**Test 21: 3D Globe (Desktop with WebGL)**
- [ ] On desktop browser, verify 3D globe is visible
- [ ] Globe should be rotating automatically
- [ ] Drag to rotate globe manually
- [ ] Verify orbit controls work
- [ ] Stats overlay shows:
  - [ ] "50+ Countries"
  - [ ] "2,847 Active Alumni"
  - [ ] "156 Cities"

**Test 22: 2D Map Fallback (Mobile)**
- [ ] Resize to mobile width (<768px)
- [ ] Verify 2D world map image is shown
- [ ] Verify overlay text is visible
- [ ] No 3D globe should load

**Test 23: Low Power Mode**
- [ ] Add `?lowPower=1` to URL
- [ ] Refresh page
- [ ] Verify 2D map is shown instead of 3D globe

**Test 24: WebGL Detection**
- [ ] Disable WebGL in browser (if possible)
- [ ] Refresh dashboard
- [ ] Verify 2D map fallback is shown

**Test 25: Lazy Loading**
- [ ] Open DevTools → Network tab
- [ ] Refresh dashboard
- [ ] Verify 3D libraries load after initial page load
- [ ] Skeleton loader should appear briefly

---

### ✅ Animation Controls

**Test 26: Animation Toggle Button**
- [ ] Verify button in top-right corner
- [ ] Shows 🎬 icon (animations enabled)
- [ ] Click button
- [ ] Icon changes to ⏸️ (animations disabled)
- [ ] Verify animations stop:
  - [ ] KPI hover effects disabled
  - [ ] Globe stops rotating
  - [ ] Framer Motion animations disabled
- [ ] Click button again
- [ ] Verify animations resume

**Test 27: Prefers-Reduced-Motion**
- [ ] Enable "Reduce Motion" in OS settings
- [ ] Refresh dashboard
- [ ] Verify animations are automatically disabled
- [ ] Verify animation toggle shows ⏸️

---

## Accessibility Testing

### ✅ Keyboard Navigation

**Test 28: Tab Navigation**
- [ ] Press Tab key repeatedly
- [ ] Verify focus moves through all interactive elements:
  - [ ] Animation toggle button
  - [ ] KPI cards
  - [ ] Carousel buttons
  - [ ] Alumni cards
  - [ ] AI widget button
  - [ ] View All link
- [ ] Verify focus indicators are visible

**Test 29: Keyboard Shortcuts**
- [ ] Focus on leaderboard carousel
- [ ] Press Left/Right arrows
- [ ] Verify carousel navigation works
- [ ] Open profile modal
- [ ] Press Escape
- [ ] Verify modal closes
- [ ] Focus on AI widget input
- [ ] Press Enter
- [ ] Verify message sends

### ✅ Screen Reader

**Test 30: ARIA Labels**
- [ ] Enable screen reader (NVDA/JAWS/VoiceOver)
- [ ] Navigate through dashboard
- [ ] Verify all buttons have descriptive labels
- [ ] Verify modal has `aria-modal="true"`
- [ ] Verify chat has `aria-live="polite"`

### ✅ Color Contrast

**Test 31: Text Contrast**
- [ ] Use browser DevTools → Accessibility
- [ ] Check contrast ratios for:
  - [ ] Greeting text (should be ≥ 4.5:1)
  - [ ] KPI values (should be ≥ 4.5:1)
  - [ ] Button text (should be ≥ 4.5:1)
  - [ ] Chat messages (should be ≥ 4.5:1)

---

## Responsive Testing

### ✅ Desktop (1400px+)

**Test 32: Desktop Layout**
- [ ] KPI grid: 4 columns
- [ ] Leaderboard: Horizontal carousel
- [ ] 3D globe visible
- [ ] All hover effects work
- [ ] AI widget: 380px width

### ✅ Tablet (768px - 1024px)

**Test 33: Tablet Layout**
- [ ] KPI grid: 2 columns
- [ ] Leaderboard: Horizontal carousel
- [ ] 2D map fallback
- [ ] Touch-friendly buttons
- [ ] AI widget: Full width minus margins

### ✅ Mobile (< 768px)

**Test 34: Mobile Layout**
- [ ] KPI grid: 1 column
- [ ] Leaderboard: Vertical list
- [ ] 2D map only
- [ ] No hover effects
- [ ] AI widget: Full width
- [ ] Larger touch targets

---

## Performance Testing

### ✅ Load Time

**Test 35: Initial Load**
- [ ] Open DevTools → Performance
- [ ] Refresh dashboard
- [ ] Verify page loads in < 3 seconds
- [ ] Verify no console errors

**Test 36: Lazy Loading**
- [ ] Check Network tab
- [ ] Verify 3D libraries load separately
- [ ] Verify skeleton appears during load
- [ ] Verify smooth transition to 3D globe

### ✅ Memory Usage

**Test 37: Memory Leaks**
- [ ] Open DevTools → Memory
- [ ] Take heap snapshot
- [ ] Navigate away and back to dashboard 5 times
- [ ] Take another heap snapshot
- [ ] Verify no significant memory increase

---

## Cross-Browser Testing

### ✅ Chrome

**Test 38: Chrome Compatibility**
- [ ] All features work
- [ ] 3D globe renders correctly
- [ ] Animations smooth
- [ ] No console errors

### ✅ Firefox

**Test 39: Firefox Compatibility**
- [ ] All features work
- [ ] 3D globe renders correctly
- [ ] Animations smooth
- [ ] No console errors

### ✅ Safari

**Test 40: Safari Compatibility**
- [ ] All features work
- [ ] 3D globe renders correctly
- [ ] Animations smooth
- [ ] No console errors

### ✅ Edge

**Test 41: Edge Compatibility**
- [ ] All features work
- [ ] 3D globe renders correctly
- [ ] Animations smooth
- [ ] No console errors

---

## Dark Mode Testing

### ✅ Theme Switching

**Test 42: Dark Mode**
- [ ] Toggle dark mode in app
- [ ] Verify all components adapt:
  - [ ] Greeting background
  - [ ] KPI cards
  - [ ] Leaderboard cards
  - [ ] AI widget
  - [ ] Globe info overlay
- [ ] Verify text remains readable
- [ ] Verify contrast ratios maintained

---

## Error Handling

### ✅ API Errors

**Test 43: AI Chat Error**
- [ ] Stop backend server
- [ ] Send message in AI widget
- [ ] Verify error message appears
- [ ] Verify app doesn't crash

**Test 44: Leaderboard Error**
- [ ] Stop backend server
- [ ] Refresh dashboard
- [ ] Verify empty state or error message
- [ ] Verify app doesn't crash

### ✅ Network Issues

**Test 45: Offline Mode**
- [ ] Enable offline mode in DevTools
- [ ] Try to send AI message
- [ ] Verify graceful error handling
- [ ] Disable offline mode
- [ ] Verify functionality resumes

---

## Integration Testing

### ✅ Other Pages Unaffected

**Test 46: Navigation**
- [ ] Navigate to /profile
- [ ] Verify page works normally
- [ ] Navigate to /leaderboard
- [ ] Verify page works normally
- [ ] Navigate to /events
- [ ] Verify page works normally
- [ ] Navigate back to /dashboard
- [ ] Verify dashboard still works

**Test 47: Authentication**
- [ ] Logout
- [ ] Try to access dashboard
- [ ] Verify redirect to login
- [ ] Login again
- [ ] Verify dashboard loads correctly

---

## Summary

### Pass Criteria
- [ ] All 47 tests pass
- [ ] No console errors
- [ ] No accessibility violations
- [ ] Responsive on all screen sizes
- [ ] Works in all major browsers
- [ ] Other pages unaffected

### Known Limitations
- 3D globe requires WebGL support
- Animations disabled on reduced motion preference
- Mobile devices use 2D map fallback

### Sign-Off
- Tester Name: _______________
- Date: _______________
- Status: ☐ PASS ☐ FAIL
- Notes: _______________
