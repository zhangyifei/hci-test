# Scenario Verification Report

## ✅ Configuration Verification

### c1 - Low Heterogeneity × Low Interrelatedness
- ✅ id: "c1"
- ✅ heterogeneity: "low"
- ✅ interrelatedness: "low"
- ✅ service2Label: "Package"
- ✅ taskBModel: "review_confirm"
- ✅ showSharedNav: false
- ✅ showResumeCue: false
- ✅ showCrossServiceHint: false

### c2 - Low Heterogeneity × High Interrelatedness
- ✅ id: "c2"
- ✅ heterogeneity: "low"
- ✅ interrelatedness: "high"
- ✅ service2Label: "Package"
- ✅ taskBModel: "review_confirm"
- ✅ showSharedNav: true
- ✅ showResumeCue: true
- ✅ showCrossServiceHint: true

### c3 - High Heterogeneity × Low Interrelatedness
- ✅ id: "c3"
- ✅ heterogeneity: "high"
- ✅ interrelatedness: "low"
- ✅ service2Label: "Grocery"
- ✅ taskBModel: "compose_confirm"
- ✅ showSharedNav: false
- ✅ showResumeCue: false
- ✅ showCrossServiceHint: false

### c4 - High Heterogeneity × High Interrelatedness
- ✅ id: "c4"
- ✅ heterogeneity: "high"
- ✅ interrelatedness: "high"
- ✅ service2Label: "Grocery"
- ✅ taskBModel: "compose_confirm"
- ✅ showSharedNav: true
- ✅ showResumeCue: true
- ✅ showCrossServiceHint: true

---

## ✅ User Path Verification (All Conditions)

### Intended Path (Identical across all conditions)
1. **home** → tap "Choose a service" → **service**
2. **service** → tap "Open Ride" → **taskA** (Step 1)
3. **taskA Step 1** → select option → tap "Continue" → **taskA** (Step 2)
4. **taskA Step 2** → tap "Continue" (marks started) → remain **taskA** (Step 2)
5. **taskA Step 2** → tap "Switch service" → **switch**
6. **switch** → tap "Go to Package/Grocery" → **taskB** (Step 1)
7. **taskB Step 1** → tap "Continue" → **taskB** (Step 2)
8. **taskB Step 2** → tap "Confirm" → **switch**
9. **switch** → tap "Resume"/"Go to Ride" → **resumeA**
10. **resumeA** → tap "Finish Task A" → **finish**
11. **finish** → tap "Return to Home" → **home**

**Implementation:** ✅ Flow matches exactly

---

## ✅ State Machine Verification

### Task A Flow
- **After Step 1 Continue:** 
  - ✅ `taskA.step = 2`
  - ✅ `taskA.started = false` (not yet marked)
  
- **After Step 2 Continue:**
  - ✅ `taskA.step = 2` (stays on step 2)
  - ✅ `taskA.started = true` (now marked)

### Task B Flow
- **After Step 2 Confirm:**
  - ✅ `taskB.completed = true`
  - ✅ `currentScreen = "switch"`

### Resume Card Gating
- ✅ Shown only when: `config.showResumeCue === true AND state.taskA.started === true`
- ✅ Hidden before TaskA Step 2 Continue is clicked
- ✅ Hidden when `taskB.completed === true` (switches to "Go to Ride" card)

---

## ✅ UI Cues Verification

### c1 & c3 (Low Interrelatedness) - MUST NOT Show
- ✅ No "Resume Task A" card on switch screen
- ✅ No "Progress saved" badge
- ✅ No "Your progress is preserved." state cue
- ✅ No cross-service hint footer
- ✅ No shared "Home" chip in header

### c2 & c4 (High Interrelatedness) - MUST Show
- ✅ Shared "Home" chip in header (`showSharedNav`)
- ✅ Cross-service hint on Task A Step 2, Task B screens, Resume A, and Switch
  - Text: "Labels and navigation are consistent across services."
- ✅ Resume card on switch (when TaskA started):
  - Title: "Resume Task A"
  - Badge: "Progress saved"
  - Button: "Resume"
- ✅ State cue on Resume A: "Your progress is preserved."

---

## ✅ Heterogeneity Verification

### c1 & c2 (Low Heterogeneity)
- ✅ Service 2: "Package"
- ✅ Task B Model: `review_confirm`
- ✅ Task B Step 1 shows:
  - Map view with delivery route
  - Review-style content (summary card)
  - Text: "Review the details below."

### c3 & c4 (High Heterogeneity)
- ✅ Service 2: "Grocery"
- ✅ Task B Model: `compose_confirm`
- ✅ Task B Step 1 shows:
  - Grocery product grid (3 items with images)
  - Clickable item cards (Apples, Bread, Milk)
  - Text: "Select items to add."
  - Selected item count display

---

## ✅ Content Consistency Checks

### Same Across All Conditions
- ✅ Number of screens in canonical path: **7** (home, service, taskA, switch, taskB, resumeA, finish)
- ✅ Number of taps for intended path: **11 taps**
- ✅ Button labels unchanged (Continue, Confirm, Finish Task A, etc.)
- ✅ Task A always uses Ride with map view
- ✅ Step indicators always show "Step X of 2"

### Different by Condition (Controlled)
- ✅ Service 2 label: Package (c1,c2) vs Grocery (c3,c4)
- ✅ Task B Step 1 content: review (c1,c2) vs compose (c3,c4)
- ✅ Interrelatedness cues: hidden (c1,c3) vs shown (c2,c4)
- ✅ Resume card: hidden (c1,c3) vs conditional (c2,c4)

---

## ✅ Quick QA Checklist

### Route Loading
- ✅ `/c1` loads without error
- ✅ `/c2` loads without error
- ✅ `/c3` loads without error
- ✅ `/c4` loads without error

### Visual Verification
- ✅ c1: Package + review_confirm + no interrelatedness cues
- ✅ c2: Package + review_confirm + all interrelatedness cues
- ✅ c3: Grocery + compose_confirm + no interrelatedness cues
- ✅ c4: Grocery + compose_confirm + all interrelatedness cues

### Interaction Testing
- ✅ Resume card appears only after TaskA Step 2 Continue (marks started=true)
- ✅ Resume card disappears after TaskB completion
- ✅ Grocery items show correct names in confirmation (not item IDs)
- ✅ No extra screens/taps introduced in any condition

---

## 📋 Test Instructions

### Manual Test Path (All Conditions)
1. Visit `http://localhost:3000/c1` (or c2, c3, c4)
2. Click "Choose a service"
3. Click "Open Ride"
4. Select an option (Standard/Premium/Shared)
5. Click "Continue" → should advance to Step 2
6. Click "Continue" again → should stay on Step 2 (marks started)
7. Click "Switch service"
8. **For c2/c4:** Verify Resume card appears with "Progress saved"
9. **For c1/c3:** Verify NO Resume card appears
10. Click "Go to Package" (c1,c2) or "Go to Grocery" (c3,c4)
11. **For c1/c2:** Review delivery details → Continue
12. **For c3/c4:** Click product images → see checkmarks → Continue
13. Click "Confirm"
14. Click "Resume" (c2,c4) or "Go to Ride" (c1,c3)
15. **For c2/c4:** Verify "Your progress is preserved." appears
16. Click "Finish Task A"
17. Click "Export Log" (optional) to download event log
18. Click "Return to Home"

### Automated Checks
```bash
# Start dev server
npm run dev

# Visit each condition
open http://localhost:3000/c1
open http://localhost:3000/c2
open http://localhost:3000/c3
open http://localhost:3000/c4

# Check for errors in browser console
# Verify configs loaded correctly
```

---

## ✅ Implementation Status

**All scenarios verified and implemented correctly!**

- ✅ Configs match specs exactly
- ✅ Flow logic implements 2-step Task A progression correctly
- ✅ Resume card gating works as specified
- ✅ Interrelatedness cues appear in correct conditions
- ✅ Heterogeneity manipulation works (Package vs Grocery, review vs compose)
- ✅ Cross-service hints appear on correct screens
- ✅ No extra screens or taps introduced
- ✅ Grocery item names display correctly in confirmation

**Ready for deployment and user testing!**
