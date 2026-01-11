import { test, expect, Page } from '@playwright/test';

// --- Helpers ---

async function gotoCondition(page: Page, condId: string) {
  // Assuming localhost:3000 or similar base URL is set in config or passed
  await page.goto(`/${condId}`);
  await expect(page.getByTestId('phone-frame')).toBeVisible();
}

async function assertOnScreen(page: Page, screenId: string) {
  await expect(page.getByTestId('screen')).toHaveAttribute('data-screen-id', screenId);
}

async function clickByTestId(page: Page, testId: string) {
  await page.getByTestId(testId).click();
}

async function startTaskA(page: Page) {
  // 1. Home -> Service
  await assertOnScreen(page, 'home');
  await clickByTestId(page, 'cta-choose-service');

  // 2. Service -> Task A
  await assertOnScreen(page, 'service');
  await clickByTestId(page, 'card-open-ride');

  // 3. Task A Step 1
  await assertOnScreen(page, 'taskA');
  await expect(page.getByTestId('step-label')).toContainText('Step 1');
  await clickByTestId(page, 'taska-option-0');
  await clickByTestId(page, 'primary-cta'); // Continue

  // 4. Task A Step 2 (Start)
  await assertOnScreen(page, 'taskA');
  await expect(page.getByTestId('step-label')).toContainText('Step 2');
  await clickByTestId(page, 'primary-cta'); // Mark started
  // Remains on Step 2
  await assertOnScreen(page, 'taskA');
  await expect(page.getByTestId('step-label')).toContainText('Step 2');
}

async function goToSwitchFromTaskA(page: Page) {
  await clickByTestId(page, 'secondary-cta'); // Switch service
  await assertOnScreen(page, 'switch');
}

async function returnToRideFromSwitch(page: Page, interrelatednessHigh: boolean) {
  if (interrelatednessHigh) {
    // High Int: Resume Card should be visible
    await expect(page.getByTestId('resume-card')).toBeVisible();
    await expect(page.getByTestId('resume-card-title')).toHaveText('Resume Task A');
    await expect(page.getByTestId('resume-card-subtitle')).toHaveText('Progress saved');
    
    // Ensure Standard "Go to Ride" card is NOT visible (Mutual exclusion)
    await expect(page.getByTestId('card-go-ride')).not.toBeVisible();

    await clickByTestId(page, 'resume-card-cta'); // Resume
    await assertOnScreen(page, 'resumeA');
  } else {
    // Low Int: Standard Card
    await expect(page.getByTestId('resume-card')).not.toBeVisible();
    await expect(page.getByTestId('card-go-ride')).toBeVisible();
    await clickByTestId(page, 'card-go-ride');
    await assertOnScreen(page, 'resumeA');
  }
}

async function finishTaskA(page: Page, interrelatednessHigh: boolean) {
  await assertOnScreen(page, 'resumeA');
  if (interrelatednessHigh) {
    await expect(page.getByTestId('screen-title')).toHaveText('Resume Task A');
    await expect(page.getByTestId('state-cue')).toHaveText('Your progress is preserved.');
  } else {
    // Low Int: Check title is generic Ride
     await expect(page.getByTestId('screen-title')).toHaveText('Ride');
     await expect(page.getByTestId('state-cue')).not.toBeVisible();
  }

  await clickByTestId(page, 'primary-cta'); // Finish Task A
}

async function verifyFinishAndReturnHome(page: Page) {
  await assertOnScreen(page, 'finish');
  await expect(page.getByTestId('screen-title')).toHaveText('All set');
  await expect(page.getByTestId('body-text')).toHaveText("You've completed today's tasks.");
  await clickByTestId(page, 'primary-cta'); // Return to Home
  await assertOnScreen(page, 'home');
}

async function expectInterrelatednessCues(page: Page, shouldExist: boolean) {
  if (shouldExist) {
    await expect(page.getByTestId('home-chip')).toBeVisible();
  } else {
    await expect(page.getByTestId('home-chip')).not.toBeVisible();
    await expect(page.getByTestId('cross-service-hint')).not.toBeVisible();
  }
}

// --- Tests ---

test('c1: Low Het x Low Int', async ({ page }) => {
  await gotoCondition(page, 'c1');

  // Verify shell cues
  await expectInterrelatednessCues(page, false);

  // Workflow: home → service → taskA Step 1 → taskA Step 2
  await startTaskA(page);
  // Verify we're on taskA Step 2 after startTaskA
  await assertOnScreen(page, 'taskA');
  
  // taskA Step 2 → switch
  await goToSwitchFromTaskA(page);

  // Switch: Resume card check (Should NOT exist even if started)
  await expect(page.getByTestId('resume-card')).not.toBeVisible();
  
  // Switch: Verify both cards are visible (Go to Ride and Go to Package)
  await expect(page.getByTestId('card-go-ride')).not.toBeVisible(); // Hidden until TaskB complete
  await expect(page.getByTestId('card-go-service2')).toBeVisible(); // Go to Package

  // Task B (Package, Review)
  await clickByTestId(page, 'card-go-service2');
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('screen-title')).toHaveText('Package');
  
  // Verify Heterogeneity: Review Model
  await expect(page.getByTestId('taskb-model-review')).toBeVisible();
  await expect(page.getByTestId('taskb-model-compose')).not.toBeVisible();
  
  // Highlighting checking hint not visible
  await expect(page.getByTestId('cross-service-hint')).not.toBeVisible();

  // TaskB Step 1 - Verify step label
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 1');
  
  // taskB Step 1 → Continue → taskB Step 2
  await clickByTestId(page, 'primary-cta');
  
  // TaskB Step 2 - Verify step label
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 2');
  await clickByTestId(page, 'primary-cta'); // Confirm
  await assertOnScreen(page, 'switch');
  
  // Switch: After TaskB completion, verify Go to Ride card is visible
  await expect(page.getByTestId('card-go-ride')).toBeVisible();
  await expect(page.getByTestId('card-go-service2')).not.toBeVisible(); // Package card now hidden

  // Return to Ride (Low Int)
  await returnToRideFromSwitch(page, false);

  // Finish A
  await finishTaskA(page, false);
  await verifyFinishAndReturnHome(page);
});

test('c2: Low Het x High Int', async ({ page }) => {
  await gotoCondition(page, 'c2');

  // Gating Check: Resume card NOT visible before start
  await clickByTestId(page, 'cta-switch-service'); // Go to switch from home
  await assertOnScreen(page, 'switch');
  await expect(page.getByTestId('resume-card')).not.toBeVisible();
  
  await gotoCondition(page, 'c2');

  // Verify shell cues on home
  await expectInterrelatednessCues(page, true);

  // Workflow: home → service → taskA Step 1 → taskA Step 2
  await startTaskA(page);
  // Verify we're on taskA Step 2 and hint visible
  await assertOnScreen(page, 'taskA');
  await expect(page.getByTestId('cross-service-hint')).toBeVisible();
  
  // taskA Step 2 → switch
  await goToSwitchFromTaskA(page);
  
  // Switch: Resume card check (Should exist now)
  await expect(page.getByTestId('resume-card')).toBeVisible();

  // Task B (Package, Review)
  await clickByTestId(page, 'card-go-service2');
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('screen-title')).toHaveText('Package');
  await expect(page.getByTestId('taskb-model-review')).toBeVisible();
  await expect(page.getByTestId('taskb-model-compose')).not.toBeVisible();
  
  // TaskB Step 1 - Verify step label and cross-service hint
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 1');
  await expect(page.getByTestId('cross-service-hint')).toBeVisible();
  
  // taskB Step 1 → Continue → taskB Step 2
  await clickByTestId(page, 'primary-cta');
  
  // TaskB Step 2 - Verify step label
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 2');
  await clickByTestId(page, 'primary-cta'); // Confirm
  await assertOnScreen(page, 'switch');
  
  // Switch: Verify cross-service hint is visible
  await expect(page.getByTestId('cross-service-hint')).toBeVisible();

  // Return to Ride (High Int: Resume Card)
  await returnToRideFromSwitch(page, true);

  // Finish A
  await finishTaskA(page, true);
  await verifyFinishAndReturnHome(page);
});

test('c3: High Het x Low Int', async ({ page }) => {
  await gotoCondition(page, 'c3');

  // Verify shell cues on home
  await expectInterrelatednessCues(page, false);

  // Workflow: home → service → taskA Step 1 → taskA Step 2
  await startTaskA(page);
  // Verify we're on taskA Step 2
  await assertOnScreen(page, 'taskA');
  
  // taskA Step 2 → switch
  await goToSwitchFromTaskA(page);

  // Switch: Resume card check (Should NOT exist)
  await expect(page.getByTestId('resume-card')).not.toBeVisible();

  // Task B (Grocery, Compose)
  await clickByTestId(page, 'card-go-service2');
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('screen-title')).toHaveText('Grocery');

  // Verify Heterogeneity: Compose Model
  await expect(page.getByTestId('taskb-model-compose')).toBeVisible();
  await expect(page.getByTestId('taskb-model-review')).not.toBeVisible();
  await expect(page.getByTestId('compose-chip').first()).toBeVisible();
  expect(await page.getByTestId('compose-chip').count()).toBeGreaterThanOrEqual(2);
  
  // TaskB Step 1 - Verify step label and NO cross-service hint
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 1');
  await expect(page.getByTestId('cross-service-hint')).not.toBeVisible();

  // taskB Step 1 → Continue → taskB Step 2
  await clickByTestId(page, 'primary-cta');
  
  // TaskB Step 2 - Verify step label
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 2');
  await clickByTestId(page, 'primary-cta');
  await assertOnScreen(page, 'switch');
  
  // Switch: Verify Go to Ride card is visible, no cross-service hint
  await expect(page.getByTestId('card-go-ride')).toBeVisible();
  await expect(page.getByTestId('cross-service-hint')).not.toBeVisible();

  // Return to Ride (Low Int)
  await returnToRideFromSwitch(page, false);

  await finishTaskA(page, false);
  await verifyFinishAndReturnHome(page);
});

test('c4: High Het x High Int', async ({ page }) => {
  await gotoCondition(page, 'c4');

  // Gating Check
  await clickByTestId(page, 'cta-switch-service');
  await expect(page.getByTestId('resume-card')).not.toBeVisible();
  await gotoCondition(page, 'c4');

  // Verify shell cues on home
  await expectInterrelatednessCues(page, true);

  // Workflow: home → service → taskA Step 1 → taskA Step 2
  await startTaskA(page);
  // Verify we're on taskA Step 2
  await assertOnScreen(page, 'taskA');
  
  // taskA Step 2 → switch
  await goToSwitchFromTaskA(page);

  // Switch: Resume card check
  await expect(page.getByTestId('resume-card')).toBeVisible();

  // Task B (Grocery, Compose)
  await clickByTestId(page, 'card-go-service2');
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('screen-title')).toHaveText('Grocery');
  await expect(page.getByTestId('taskb-model-compose')).toBeVisible();
  await expect(page.getByTestId('taskb-model-review')).not.toBeVisible();
  await expect(page.getByTestId('compose-chip').first()).toBeVisible();
  expect(await page.getByTestId('compose-chip').count()).toBeGreaterThanOrEqual(2);
  
  // TaskB Step 1 - Verify step label and cross-service hint
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 1');
  await expect(page.getByTestId('cross-service-hint')).toBeVisible();

  // taskB Step 1 → Continue → taskB Step 2
  await clickByTestId(page, 'primary-cta');
  
  // TaskB Step 2 - Verify step label
  await assertOnScreen(page, 'taskB');
  await expect(page.getByTestId('step-label')).toContainText('Step 2');
  await clickByTestId(page, 'primary-cta');
  await assertOnScreen(page, 'switch');
  
  // Switch: Verify cross-service hint is visible
  await expect(page.getByTestId('cross-service-hint')).toBeVisible();

  // Return to Ride (High Int)
  await returnToRideFromSwitch(page, true);

  await finishTaskA(page, true);
  await verifyFinishAndReturnHome(page);
});
