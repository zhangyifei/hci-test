'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Step {
  from: string;
  action: string;
  to: string;
  note?: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  heterogeneity: 'Low' | 'High';
  interrelatedness: 'Low' | 'High';
  service2: string;
  taskBModel: string;
  steps: Step[];
}

const scenarios: Scenario[] = [
  {
    id: 'c1',
    title: 'Scenario C1',
    description: 'Low Heterogeneity × Low Interrelatedness',
    heterogeneity: 'Low',
    interrelatedness: 'Low',
    service2: 'Package',
    taskBModel: 'Review & Confirm',
    steps: [
      { from: 'home', action: 'Tap "Choose a service"', to: 'service' },
      { from: 'service', action: 'Tap "Open Ride"', to: 'taskA (Step 1)' },
      { from: 'taskA Step 1', action: 'Select an option, then tap "Continue"', to: 'taskA (Step 2)' },
      { from: 'taskA Step 2', action: 'Tap "Continue"', to: 'taskA (Step 2)', note: 'Task A is now started' },
      { from: 'taskA Step 2', action: 'Tap "Switch service"', to: 'switch' },
      { from: 'switch', action: 'Tap "Go to Package"', to: 'taskB (Step 1)' },
      { from: 'taskB Step 1', action: 'Tap "Continue"', to: 'taskB (Step 2)' },
      { from: 'taskB Step 2', action: 'Tap "Confirm"', to: 'switch' },
      { from: 'switch', action: 'Tap "Go to Ride"', to: 'resumeA' },
      { from: 'resumeA', action: 'Tap "Finish Task A"', to: 'finish' },
      { from: 'finish', action: 'Tap "Return to Home"', to: 'home' },
    ],
  },
  {
    id: 'c2',
    title: 'Scenario C2',
    description: 'Low Heterogeneity × High Interrelatedness',
    heterogeneity: 'Low',
    interrelatedness: 'High',
    service2: 'Package',
    taskBModel: 'Review & Confirm',
    steps: [
      { from: 'home', action: 'Tap "Choose a service"', to: 'service' },
      { from: 'service', action: 'Tap "Open Ride"', to: 'taskA (Step 1)' },
      { from: 'taskA Step 1', action: 'Select an option, then tap "Continue"', to: 'taskA (Step 2)' },
      { from: 'taskA Step 2', action: 'Tap "Continue"', to: 'taskA (Step 2)', note: 'Task A is now started' },
      { from: 'taskA Step 2', action: 'Tap "Switch service"', to: 'switch' },
      { from: 'switch', action: 'Tap "Go to Package"', to: 'taskB (Step 1)' },
      { from: 'taskB Step 1', action: 'Tap "Continue"', to: 'taskB (Step 2)' },
      { from: 'taskB Step 2', action: 'Tap "Confirm"', to: 'switch' },
      { from: 'switch', action: 'Tap "Resume" on the Resume Task A card', to: 'resumeA', note: 'Resume card visible' },
      { from: 'resumeA', action: 'Tap "Finish Task A"', to: 'finish' },
      { from: 'finish', action: 'Tap "Return to Home"', to: 'home' },
    ],
  },
  {
    id: 'c3',
    title: 'Scenario C3',
    description: 'High Heterogeneity × Low Interrelatedness',
    heterogeneity: 'High',
    interrelatedness: 'Low',
    service2: 'Grocery',
    taskBModel: 'Compose & Confirm',
    steps: [
      { from: 'home', action: 'Tap "Choose a service"', to: 'service' },
      { from: 'service', action: 'Tap "Open Ride"', to: 'taskA (Step 1)' },
      { from: 'taskA Step 1', action: 'Select an option, then tap "Continue"', to: 'taskA (Step 2)' },
      { from: 'taskA Step 2', action: 'Tap "Continue"', to: 'taskA (Step 2)', note: 'Task A is now started' },
      { from: 'taskA Step 2', action: 'Tap "Switch service"', to: 'switch' },
      { from: 'switch', action: 'Tap "Go to Grocery"', to: 'taskB (Step 1)' },
      { from: 'taskB Step 1', action: 'Select item(s), then tap "Continue"', to: 'taskB (Step 2)', note: 'Compose UI: select groceries' },
      { from: 'taskB Step 2', action: 'Tap "Confirm"', to: 'switch' },
      { from: 'switch', action: 'Tap "Go to Ride"', to: 'resumeA' },
      { from: 'resumeA', action: 'Tap "Finish Task A"', to: 'finish' },
      { from: 'finish', action: 'Tap "Return to Home"', to: 'home' },
    ],
  },
  {
    id: 'c4',
    title: 'Scenario C4',
    description: 'High Heterogeneity × High Interrelatedness',
    heterogeneity: 'High',
    interrelatedness: 'High',
    service2: 'Grocery',
    taskBModel: 'Compose & Confirm',
    steps: [
      { from: 'home', action: 'Tap "Choose a service"', to: 'service' },
      { from: 'service', action: 'Tap "Open Ride"', to: 'taskA (Step 1)' },
      { from: 'taskA Step 1', action: 'Select an option, then tap "Continue"', to: 'taskA (Step 2)' },
      { from: 'taskA Step 2', action: 'Tap "Continue"', to: 'taskA (Step 2)', note: 'Task A is now started' },
      { from: 'taskA Step 2', action: 'Tap "Switch service"', to: 'switch' },
      { from: 'switch', action: 'Tap "Go to Grocery"', to: 'taskB (Step 1)' },
      { from: 'taskB Step 1', action: 'Select item(s), then tap "Continue"', to: 'taskB (Step 2)', note: 'Compose UI: select groceries' },
      { from: 'taskB Step 2', action: 'Tap "Confirm"', to: 'switch' },
      { from: 'switch', action: 'Tap "Resume" on the Resume Task A card', to: 'resumeA', note: 'Resume card visible' },
      { from: 'resumeA', action: 'Tap "Finish Task A"', to: 'finish' },
      { from: 'finish', action: 'Tap "Return to Home"', to: 'home' },
    ],
  },
];

export default function DocsPage() {
  const [activeScenario, setActiveScenario] = useState<string>('c1');
  const scenario = scenarios.find((s) => s.id === activeScenario)!;

  return (
    <div className="docs-page">
      <header className="docs-header">
        <Link href="/" className="docs-back-link">
          ← Back to Home
        </Link>
        <h1>Execution Steps Documentation</h1>
        <p className="docs-subtitle">
          Step-by-step guide for each experimental scenario
        </p>
      </header>

      <div className="docs-container">
        <aside className="docs-sidebar">
          <h3>Scenarios</h3>
          <nav className="docs-nav">
            {scenarios.map((s) => (
              <button
                key={s.id}
                className={`docs-nav-item ${activeScenario === s.id ? 'active' : ''}`}
                onClick={() => setActiveScenario(s.id)}
              >
                <span className="docs-nav-id">{s.id.toUpperCase()}</span>
                <span className="docs-nav-desc">{s.description}</span>
              </button>
            ))}
          </nav>

          <div className="docs-legend">
            <h4>Global Rule</h4>
            <p>
              Only actions available in the current step are enabled and clickable.
              All other operations are disabled.
            </p>
          </div>
        </aside>

        <main className="docs-content">
          <div className="scenario-header">
            <h2>{scenario.title}</h2>
            <p className="scenario-description">{scenario.description}</p>
            <div className="scenario-tags">
              <span className={`tag tag-het-${scenario.heterogeneity.toLowerCase()}`}>
                Heterogeneity: {scenario.heterogeneity}
              </span>
              <span className={`tag tag-int-${scenario.interrelatedness.toLowerCase()}`}>
                Interrelatedness: {scenario.interrelatedness}
              </span>
              <span className="tag tag-service">
                Service 2: {scenario.service2}
              </span>
              <span className="tag tag-model">
                Task B: {scenario.taskBModel}
              </span>
            </div>
            <Link href={`/${scenario.id}`} className="try-scenario-btn">
              Try {scenario.id.toUpperCase()} →
            </Link>
          </div>

          <div className="steps-container">
            <h3>Execution Steps</h3>
            <ol className="steps-list">
              {scenario.steps.map((step, index) => (
                <li key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <div className="step-flow">
                      <span className="step-screen">{step.from}</span>
                      <span className="step-arrow">→</span>
                      <span className="step-action">{step.action}</span>
                      <span className="step-arrow">→</span>
                      <span className="step-screen">{step.to}</span>
                    </div>
                    {step.note && <div className="step-note">💡 {step.note}</div>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flow-diagram">
            <h3>Flow Diagram</h3>
            <div className="diagram-container">
              <div className="diagram-row">
                <div className="diagram-node diagram-node-start">home</div>
                <div className="diagram-connector">→</div>
                <div className="diagram-node">service</div>
                <div className="diagram-connector">→</div>
                <div className="diagram-node">taskA</div>
              </div>
              <div className="diagram-vertical">↓</div>
              <div className="diagram-row">
                <div className="diagram-node diagram-node-end">finish</div>
                <div className="diagram-connector">←</div>
                <div className="diagram-node">resumeA</div>
                <div className="diagram-connector">←</div>
                <div className="diagram-node diagram-node-switch">switch</div>
              </div>
              <div className="diagram-vertical diagram-vertical-right">↑</div>
              <div className="diagram-row diagram-row-bottom">
                <div className="diagram-spacer"></div>
                <div className="diagram-node diagram-node-taskb">taskB</div>
                <div className="diagram-connector">→</div>
                <div className="diagram-node diagram-node-switch">switch</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
