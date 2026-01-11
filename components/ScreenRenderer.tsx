'use client';

import React, { useReducer, useEffect, useState } from 'react';
import { Car, Package, ShoppingBasket, Home } from 'lucide-react';
import Image from 'next/image';
import { ConditionConfig, FlowEvent } from '@/lib/types';
import { flowReducer, initialState } from '@/lib/flow';
import { logEvent, exportLog } from '@/lib/log';
import { Button, Card, Chip, Tag } from './ui';

interface ScreenRendererProps {
  config: ConditionConfig;
}

export function ScreenRenderer({ config }: ScreenRendererProps) {
  const [state, dispatch] = useReducer(flowReducer, initialState);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    logEvent(config.id, 'SCREEN_VIEW', state.currentScreen, { state });
  }, [state.currentScreen, config.id, state]);

  const handleEvent = (event: FlowEvent) => {
    logEvent(config.id, event.type, state.currentScreen, event);
    dispatch(event);
  };

  // Home screen
  if (state.currentScreen === 'home') {
    return (
      <div className="screen screen-home">
        <div className="hero-section">
          <div className="hero-image-wrapper">
            <Image
              src="/img/map-placeholder.jpg"
              alt="Map"
              fill
              className="hero-image"
              sizes="390px"
              priority
            />
            <div className="hero-overlay">
              <h1 className="hero-headline">Continue your day</h1>
            </div>
          </div>
        </div>
        <div className="content-section">
          <Button onClick={() => handleEvent({ type: 'GO_SERVICE' })} size="large">
            Choose a service
          </Button>
          <Button
            onClick={() => handleEvent({ type: 'GO_SERVICE' })}
            variant="secondary"
            size="large"
          >
            Switch service
          </Button>
        </div>
      </div>
    );
  }

  // Services screen
  if (state.currentScreen === 'service') {
    return (
      <div className="screen screen-services">
        <h2 className="screen-title">Services</h2>
        <div className="services-grid">
          <Card hoverable onClick={() => handleEvent({ type: 'OPEN_RIDE' })}>
            <div className="service-card">
              <div className="service-icon">
                <Car size={32} />
              </div>
              <div className="service-info">
                <h3 className="service-title">Ride</h3>
                <Button variant="primary">Open Ride</Button>
              </div>
            </div>
          </Card>
          <Card hoverable onClick={() => handleEvent({ type: 'OPEN_SERVICE2' })}>
            <div className="service-card">
              <div className="service-icon">
                {config.service2Label === 'Package' ? (
                  <Package size={32} />
                ) : (
                  <ShoppingBasket size={32} />
                )}
              </div>
              <div className="service-info">
                <h3 className="service-title">{config.service2Label}</h3>
                <Button variant="primary">Open {config.service2Label}</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Task A (Ride) screen
  if (state.currentScreen === 'taskA') {
    return (
      <div className="screen screen-task">
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title">Ride</h2>
          </div>
          <Tag>Step {state.taskA.step} of 2</Tag>
        </div>

        {state.taskA.step === 1 ? (
          <div className="content-section">
            <div className="map-view">
              <div className="map-background"></div>
              <div className="map-route"></div>
              <div className="map-pin map-pin-start">A</div>
              <div className="map-pin map-pin-end">B</div>
              <div className="map-overlay-info">
                <span className="map-time">12 min</span>
                <span className="map-distance">3.2 km</span>
              </div>
            </div>
            <p className="task-body">Pick an option to continue.</p>
            <div className="chips-row">
              <Chip
                selected={selectedOption === 'Standard'}
                onClick={() => setSelectedOption('Standard')}
              >
                Standard
              </Chip>
              <Chip
                selected={selectedOption === 'Premium'}
                onClick={() => setSelectedOption('Premium')}
              >
                Premium
              </Chip>
              <Chip
                selected={selectedOption === 'Shared'}
                onClick={() => setSelectedOption('Shared')}
              >
                Shared
              </Chip>
            </div>
            <Button
              onClick={() => handleEvent({ type: 'TASKA_CONTINUE' })}
              size="large"
              className="btn-fixed-bottom"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="content-section">
            <div className="map-view">
              <div className="map-background"></div>
              <div className="map-route"></div>
              <div className="map-pin map-pin-start">A</div>
              <div className="map-pin map-pin-end">B</div>
              <div className="map-overlay-info">
                <span className="map-time">12 min</span>
                <span className="map-distance">3.2 km</span>
              </div>
            </div>
            <p className="task-body">Review your request.</p>
            <Card>
              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-label">Option:</span>
                  <span className="summary-value">{selectedOption || 'Standard'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Status:</span>
                  <span className="summary-value">Ready to confirm</span>
                </div>
              </div>
            </Card>
            <div className="button-group">
              <Button
                onClick={() => handleEvent({ type: 'TASKA_CONTINUE' })}
                size="large"
              >
                Continue
              </Button>
              <Button
                onClick={() => handleEvent({ type: 'TASKA_SWITCH' })}
                variant="secondary"
                size="large"
              >
                Switch service
              </Button>
            </div>
            {config.showCrossServiceHint && (
              <p className="hint-text">Labels and navigation are consistent across services.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Switch screen
  if (state.currentScreen === 'switch') {
    return (
      <div className="screen screen-switch">
        <div className="task-header" style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title">Switch service</h2>
          </div>
        </div>
        <p className="screen-subtitle">Choose another service to continue.</p>

        <div className="cards-stack">
          {/* Resume card - only shown if Task A started and high interrelatedness */}
          {config.showResumeCue && state.taskA.started && (
            <Card hoverable onClick={() => handleEvent({ type: 'RESUME_TASKA' })}>
              <div className="resume-card">
                <div className="resume-header">
                  <h3>Resume Task A</h3>
                  <span className="resume-badge">Progress saved</span>
                </div>
                <Button variant="primary">Resume</Button>
              </div>
            </Card>
          )}

          {/* Return to Ride card - available after TaskB completion if NOT in resume cue mode */}
          {state.taskB.completed && !config.showResumeCue && (
            <Card hoverable onClick={() => handleEvent({ type: 'SWITCH_TO_RIDE' })}>
              <div className="service-switch-card">
                <Car size={24} />
                <h3>Go to Ride</h3>
              </div>
            </Card>
          )}

          {/* Service 2 card - available before TaskB completion */}
          {!state.taskB.completed && (
            <Card hoverable onClick={() => handleEvent({ type: 'SWITCH_TO_SERVICE2' })}>
              <div className="service-switch-card">
                {config.service2Label === 'Package' ? (
                  <Package size={24} />
                ) : (
                  <ShoppingBasket size={24} />
                )}
                <h3>Go to {config.service2Label}</h3>
              </div>
            </Card>
          )}
        </div>

        {config.showCrossServiceHint && (
          <p className="hint-text">Labels and navigation are consistent across services.</p>
        )}
      </div>
    );
  }

  // Task B screen
  if (state.currentScreen === 'taskB') {
    return (
      <div className="screen screen-task">
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title">{config.service2Label}</h2>
          </div>
          <Tag>Step {state.taskB.step} of 2</Tag>
        </div>

        {state.taskB.step === 1 ? (
          <div className="content-section">
            {config.taskBModel === 'review_confirm' ? (
              <>
                <div className="map-view">
                  <div className="map-background"></div>
                  <div className="map-route map-route-delivery"></div>
                  <div className="map-pin map-pin-start">📦</div>
                  <div className="map-pin map-pin-end">🏠</div>
                  <div className="map-overlay-info">
                    <span className="map-time">25 min</span>
                    <span className="map-distance">5.8 km</span>
                  </div>
                </div>
                <p className="task-body">Review the details below.</p>
                <Card>
                  <div className="summary-card">
                    <div className="summary-row">
                      <span className="summary-label">Destination:</span>
                      <span className="summary-value">123 Main St</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Type:</span>
                      <span className="summary-value">Standard</span>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <>
                <p className="task-body">Select items to add.</p>
                <div className="grocery-grid">
                  <div 
                    className={`grocery-item ${selectedItems.includes('Apples') ? 'grocery-item-selected' : ''}`}
                    onClick={() =>
                      setSelectedItems((prev) =>
                        prev.includes('Apples')
                          ? prev.filter((i) => i !== 'Apples')
                          : [...prev, 'Apples']
                      )
                    }
                  >
                    <div className="grocery-image-wrapper">
                      <Image
                        src="/img/grocery-item-1.jpg"
                        alt="Apples"
                        width={106}
                        height={106}
                        className="grocery-image"
                      />
                    </div>
                    <div className="grocery-label">Apples</div>
                  </div>
                  <div 
                    className={`grocery-item ${selectedItems.includes('Bread') ? 'grocery-item-selected' : ''}`}
                    onClick={() =>
                      setSelectedItems((prev) =>
                        prev.includes('Bread')
                          ? prev.filter((i) => i !== 'Bread')
                          : [...prev, 'Bread']
                      )
                    }
                  >
                    <div className="grocery-image-wrapper">
                      <Image
                        src="/img/grocery-item-2.jpg"
                        alt="Bread"
                        width={106}
                        height={106}
                        className="grocery-image"
                      />
                    </div>
                    <div className="grocery-label">Bread</div>
                  </div>
                  <div 
                    className={`grocery-item ${selectedItems.includes('Milk') ? 'grocery-item-selected' : ''}`}
                    onClick={() =>
                      setSelectedItems((prev) =>
                        prev.includes('Milk')
                          ? prev.filter((i) => i !== 'Milk')
                          : [...prev, 'Milk']
                      )
                    }
                  >
                    <div className="grocery-image-wrapper">
                      <Image
                        src="/img/grocery-item-3.jpg"
                        alt="Milk"
                        width={106}
                        height={106}
                        className="grocery-image"
                      />
                    </div>
                    <div className="grocery-label">Milk</div>
                  </div>
                </div>
                <div className="selected-items-summary">
                  {selectedItems.length > 0 && (
                    <p className="selected-count">
                      {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                    </p>
                  )}
                </div>
              </>
            )}
            <Button
              onClick={() => handleEvent({ type: 'TASKB_CONTINUE' })}
              size="large"
              className="btn-fixed-bottom"
            >
              Continue
            </Button>
            {config.showCrossServiceHint && (
              <p className="hint-text">Labels and navigation are consistent across services.</p>
            )}
          </div>
        ) : (
          <div className="content-section">
            <p className="task-body">Ready to confirm.</p>
            <Card>
              <div className="summary-card">
                {config.taskBModel === 'review_confirm' ? (
                  <>
                    <div className="summary-row">
                      <span className="summary-label">Destination:</span>
                      <span className="summary-value">123 Main St</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Status:</span>
                      <span className="summary-value">Ready</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="summary-row">
                      <span className="summary-label">Items:</span>
                      <span className="summary-value">
                        {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Status:</span>
                      <span className="summary-value">Ready</span>
                    </div>
                  </>
                )}
              </div>
            </Card>
            <Button
              onClick={() => handleEvent({ type: 'TASKB_CONFIRM' })}
              size="large"
              className="btn-fixed-bottom"
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Resume Task A screen
  if (state.currentScreen === 'resumeA') {
    return (
      <div className="screen screen-task">
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title">
              {config.showResumeCue ? 'Resume Task A' : 'Ride'}
            </h2>
          </div>
          <Tag>Step 2 of 2</Tag>
        </div>
        <div className="content-section">
          <div className="map-view">
            <div className="map-background"></div>
            <div className="map-route"></div>
            <div className="map-pin map-pin-start">A</div>
            <div className="map-pin map-pin-end">B</div>
            <div className="map-overlay-info">
              <span className="map-time">12 min</span>
              <span className="map-distance">3.2 km</span>
            </div>
          </div>
          <p className="task-body">Continue from where you left off.</p>
          {config.showResumeCue && (
            <p className="state-cue">Your progress is preserved.</p>
          )}
          <Card>
            <div className="summary-card">
              <div className="summary-row">
                <span className="summary-label">Option:</span>
                <span className="summary-value">{selectedOption || 'Standard'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Status:</span>
                <span className="summary-value">Ready to confirm</span>
              </div>
            </div>
          </Card>
          <Button
            onClick={() => handleEvent({ type: 'FINISH_TASKA' })}
            size="large"
            className="btn-fixed-bottom"
          >
            Finish Task A
          </Button>
          {config.showCrossServiceHint && (
            <p className="hint-text">Labels and navigation are consistent across services.</p>
          )}
        </div>
      </div>
    );
  }

  // Finish screen
  if (state.currentScreen === 'finish') {
    return (
      <div className="screen screen-finish">
        <div className="finish-content">
          <div className="finish-icon">✓</div>
          <h2 className="screen-title">All set</h2>
          <p className="screen-subtitle">You&apos;ve completed today&apos;s tasks.</p>
        </div>
        <div className="button-group">
          <Button
            onClick={() => handleEvent({ type: 'RETURN_HOME' })}
            size="large"
          >
            Return to Home
          </Button>
          <Button onClick={exportLog} variant="ghost" size="large">
            Export Log
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
