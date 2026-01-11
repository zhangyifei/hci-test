# Execution Steps Documentation

This document describes the step-by-step execution flow for each experimental scenario in the Super-App Prototype.

## Overview

The experiment uses a 2×2 factorial design with two independent variables:

| Factor | Low | High |
|--------|-----|------|
| **Heterogeneity** | Same task model (Review & Confirm) | Different task model (Compose & Confirm) |
| **Interrelatedness** | No shared navigation, no resume cues | Shared navigation, resume cues, cross-service hints |

### Scenarios Matrix

| Scenario | Heterogeneity | Interrelatedness | Service 2 | Task B Model |
|----------|---------------|------------------|-----------|--------------|
| **C1** | Low | Low | Package | Review & Confirm |
| **C2** | Low | High | Package | Review & Confirm |
| **C3** | High | Low | Grocery | Compose & Confirm |
| **C4** | High | High | Grocery | Compose & Confirm |

---

## Global Rule

> **Only actions available in the current step are enabled and clickable. All other operations are disabled and unclickable.**

This ensures users follow the intended flow and prevents navigation errors.

---

## Scenario C1: Low Heterogeneity × Low Interrelatedness

**Configuration:**
- Service 2: Package
- Task B Model: Review & Confirm
- Shared Navigation: ❌
- Resume Cues: ❌
- Cross-Service Hints: ❌

### Execution Steps

| Step | From Screen | Action | To Screen | Notes |
|------|-------------|--------|-----------|-------|
| 1 | `home` | Tap **"Choose a service"** | `service` | |
| 2 | `service` | Tap **"Open Ride"** | `taskA (Step 1)` | Package card is disabled |
| 3 | `taskA Step 1` | Select an option, then tap **"Continue"** | `taskA (Step 2)` | |
| 4 | `taskA Step 2` | Tap **"Continue"** | `taskA (Step 2)` | ⚡ Task A is now started |
| 5 | `taskA Step 2` | Tap **"Switch service"** | `switch` | Only enabled after Task A started |
| 6 | `switch` | Tap **"Go to Package"** | `taskB (Step 1)` | "Go to Ride" not available |
| 7 | `taskB Step 1` | Tap **"Continue"** | `taskB (Step 2)` | Review UI displayed |
| 8 | `taskB Step 2` | Tap **"Confirm"** | `switch` | Task B completed |
| 9 | `switch` | Tap **"Go to Ride"** | `resumeA` | Package card hidden |
| 10 | `resumeA` | Tap **"Finish Task A"** | `finish` | |
| 11 | `finish` | Tap **"Return to Home"** | `home` | ✅ Complete |

---

## Scenario C2: Low Heterogeneity × High Interrelatedness

**Configuration:**
- Service 2: Package
- Task B Model: Review & Confirm
- Shared Navigation: ✅
- Resume Cues: ✅
- Cross-Service Hints: ✅

### Execution Steps

| Step | From Screen | Action | To Screen | Notes |
|------|-------------|--------|-----------|-------|
| 1 | `home` | Tap **"Choose a service"** | `service` | Home chip visible in header |
| 2 | `service` | Tap **"Open Ride"** | `taskA (Step 1)` | Package card is disabled |
| 3 | `taskA Step 1` | Select an option, then tap **"Continue"** | `taskA (Step 2)` | |
| 4 | `taskA Step 2` | Tap **"Continue"** | `taskA (Step 2)` | ⚡ Task A is now started |
| 5 | `taskA Step 2` | Tap **"Switch service"** | `switch` | Cross-service hint visible |
| 6 | `switch` | Tap **"Go to Package"** | `taskB (Step 1)` | |
| 7 | `taskB Step 1` | Tap **"Continue"** | `taskB (Step 2)` | Review UI, hint visible |
| 8 | `taskB Step 2` | Tap **"Confirm"** | `switch` | Task B completed |
| 9 | `switch` | Tap **"Resume"** on Resume Task A card | `resumeA` | 🔄 Resume card visible |
| 10 | `resumeA` | Tap **"Finish Task A"** | `finish` | "Your progress is preserved" cue |
| 11 | `finish` | Tap **"Return to Home"** | `home` | ✅ Complete |

---

## Scenario C3: High Heterogeneity × Low Interrelatedness

**Configuration:**
- Service 2: Grocery
- Task B Model: Compose & Confirm
- Shared Navigation: ❌
- Resume Cues: ❌
- Cross-Service Hints: ❌

### Execution Steps

| Step | From Screen | Action | To Screen | Notes |
|------|-------------|--------|-----------|-------|
| 1 | `home` | Tap **"Choose a service"** | `service` | |
| 2 | `service` | Tap **"Open Ride"** | `taskA (Step 1)` | Grocery card is disabled |
| 3 | `taskA Step 1` | Select an option, then tap **"Continue"** | `taskA (Step 2)` | |
| 4 | `taskA Step 2` | Tap **"Continue"** | `taskA (Step 2)` | ⚡ Task A is now started |
| 5 | `taskA Step 2` | Tap **"Switch service"** | `switch` | Only enabled after Task A started |
| 6 | `switch` | Tap **"Go to Grocery"** | `taskB (Step 1)` | "Go to Ride" not available |
| 7 | `taskB Step 1` | Select item(s), then tap **"Continue"** | `taskB (Step 2)` | 🛒 Compose UI: select groceries |
| 8 | `taskB Step 2` | Tap **"Confirm"** | `switch` | Task B completed |
| 9 | `switch` | Tap **"Go to Ride"** | `resumeA` | Grocery card hidden |
| 10 | `resumeA` | Tap **"Finish Task A"** | `finish` | |
| 11 | `finish` | Tap **"Return to Home"** | `home` | ✅ Complete |

---

## Scenario C4: High Heterogeneity × High Interrelatedness

**Configuration:**
- Service 2: Grocery
- Task B Model: Compose & Confirm
- Shared Navigation: ✅
- Resume Cues: ✅
- Cross-Service Hints: ✅

### Execution Steps

| Step | From Screen | Action | To Screen | Notes |
|------|-------------|--------|-----------|-------|
| 1 | `home` | Tap **"Choose a service"** | `service` | Home chip visible in header |
| 2 | `service` | Tap **"Open Ride"** | `taskA (Step 1)` | Grocery card is disabled |
| 3 | `taskA Step 1` | Select an option, then tap **"Continue"** | `taskA (Step 2)` | |
| 4 | `taskA Step 2` | Tap **"Continue"** | `taskA (Step 2)` | ⚡ Task A is now started |
| 5 | `taskA Step 2` | Tap **"Switch service"** | `switch` | Cross-service hint visible |
| 6 | `switch` | Tap **"Go to Grocery"** | `taskB (Step 1)` | |
| 7 | `taskB Step 1` | Select item(s), then tap **"Continue"** | `taskB (Step 2)` | 🛒 Compose UI, hint visible |
| 8 | `taskB Step 2` | Tap **"Confirm"** | `switch` | Task B completed |
| 9 | `switch` | Tap **"Resume"** on Resume Task A card | `resumeA` | 🔄 Resume card visible |
| 10 | `resumeA` | Tap **"Finish Task A"** | `finish` | "Your progress is preserved" cue |
| 11 | `finish` | Tap **"Return to Home"** | `home` | ✅ Complete |

---

## Screen Descriptions

### `home`
The landing screen with a map hero image and two buttons:
- **Choose a service** (enabled) → navigates to service selection
- **Switch service** (disabled) → only available later in flow

### `service`
Service selection screen showing available services:
- **Ride** card (enabled) → opens Task A
- **Package/Grocery** card (disabled) → not directly accessible

### `taskA`
The Ride service task with 2 steps:
- **Step 1**: Select a ride option (Standard/Premium/Shared)
- **Step 2**: Review and start the ride

### `switch`
Service switching screen:
- **First visit**: Only Service 2 card visible
- **Second visit**: Either "Go to Ride" (low int) or "Resume Task A" card (high int)

### `taskB`
The Service 2 task (Package or Grocery) with 2 steps:
- **Step 1**: Review details (Package) OR Select items (Grocery)
- **Step 2**: Confirm the task

### `resumeA`
Resume screen for Task A after completing Task B:
- Shows preserved progress
- High interrelatedness: "Your progress is preserved" message

### `finish`
Completion screen:
- Success message
- Return to Home button
- Export Log button (for data collection)

---

## Flow Diagram

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   home   │────▶│  service │────▶│  taskA   │
└──────────┘     └──────────┘     └──────────┘
                                       │
                                       ▼
┌──────────┐     ┌──────────┐     ┌──────────┐
│  finish  │◀────│ resumeA  │◀────│  switch  │
└──────────┘     └──────────┘     └──────────┘
                                       ▲
                                       │
                                  ┌──────────┐
                                  │  taskB   │
                                  └──────────┘
```

---

## Key Differences Between Scenarios

| Feature | C1 | C2 | C3 | C4 |
|---------|----|----|----|----|
| Service 2 | Package | Package | Grocery | Grocery |
| Task B UI | Review | Review | Compose | Compose |
| Home Chip | ❌ | ✅ | ❌ | ✅ |
| Resume Card | ❌ | ✅ | ❌ | ✅ |
| Cross-Service Hint | ❌ | ✅ | ❌ | ✅ |
| Progress Cue on Resume | ❌ | ✅ | ❌ | ✅ |

---

## URLs

- **Home**: `/`
- **Documentation**: `/docs`
- **Scenario C1**: `/c1`
- **Scenario C2**: `/c2`
- **Scenario C3**: `/c3`
- **Scenario C4**: `/c4`
