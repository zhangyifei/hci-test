'use client';

import React, { useReducer, useEffect, useState } from 'react';
import { Car, Package, ShoppingBasket, Home, MapPin, Sparkles } from 'lucide-react';
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
  const interrelatednessHigh = config.interrelatedness === 'high';

  useEffect(() => {
    logEvent(config.id, 'SCREEN_VIEW', state.currentScreen, { state });
  }, [state.currentScreen, config.id, state]);

  // Reset local selections when returning to home screen for a fresh start
  useEffect(() => {
    if (state.currentScreen === 'home') {
      setSelectedOption(null);
      setSelectedItems([]);
    }
  }, [state.currentScreen]);

  const handleEvent = (event: FlowEvent) => {
    logEvent(config.id, event.type, state.currentScreen, event);
    dispatch(event);
  };

  // Home screen
  if (state.currentScreen === 'home') {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    };

    return (
      <div className="screen screen-home" data-testid="screen" data-screen-id="home">
        {/* Header with greeting */}
        <div className="home-header">
          <div className="home-greeting">
            <span className="greeting-text">{getGreeting()}</span>
            <h1 className="greeting-name">Ready to go?</h1>
          </div>
          <div className="home-avatar">
            <div className="avatar-circle">
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* Map preview */}
        <div className="home-map-section">
          <Image
            src="/img/map-placeholder.jpg"
            alt="Map"
            fill
            className="map-preview-image"
            sizes="390px"
            priority
          />
          <div className="map-preview-overlay">
            <div className="map-current-location">
              <div className="location-pulse"></div>
              <div className="location-dot"></div>
            </div>
          </div>
        </div>

        {/* Service icons (visual only, not clickable) */}
        <div className="home-services-preview">
          <div className="service-preview-item">
            <div className="service-preview-icon service-preview-ride">
              <Car size={20} />
            </div>
            <span>Ride</span>
          </div>
          <div className="service-preview-item">
            <div className="service-preview-icon service-preview-package">
              <Package size={20} />
            </div>
            <span>Package</span>
          </div>
          <div className="service-preview-item">
            <div className="service-preview-icon service-preview-grocery">
              <ShoppingBasket size={20} />
            </div>
            <span>Grocery</span>
          </div>
        </div>

        {/* Single CTA button */}
        <div className="home-cta-section">
          <Button 
            onClick={() => handleEvent({ type: 'GO_SERVICE' })} 
            size="large" 
            data-testid="cta-choose-service"
          >
            Choose a service
          </Button>
        </div>
      </div>
    );
  }

  // Services screen
  // Per flow: service → tap Open Ride → taskA (only Ride is the intended path)
  if (state.currentScreen === 'service') {
    return (
      <div className="screen screen-services" data-testid="screen" data-screen-id="service">
        <h2 className="screen-title" data-testid="screen-title">Services</h2>
        <div className="services-grid">
          <Card hoverable onClick={() => handleEvent({ type: 'OPEN_RIDE' })} data-testid="card-open-ride">
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
          <Card data-testid="card-open-service2" className="card-disabled">
            <div className="service-card service-card-disabled">
              <div className="service-icon">
                {config.service2Label === 'Package' ? (
                  <Package size={32} />
                ) : (
                  <ShoppingBasket size={32} />
                )}
              </div>
              <div className="service-info">
                <h3 className="service-title">{config.service2Label}</h3>
                <Button variant="primary" disabled>Open {config.service2Label}</Button>
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
      <div className="screen screen-task" data-testid="screen" data-screen-id="taskA">
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title" data-testid="screen-title">Ride</h2>
          </div>
          <Tag data-testid="step-label">Step {state.taskA.step} of 2</Tag>
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
            <p className="task-body" data-testid="body-text">Pick an option to continue.</p>
            <div className="chips-row">
              <Chip
                selected={selectedOption === 'Standard'}
                onClick={() => setSelectedOption('Standard')}
                data-testid="taska-option-0"
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
            <div className="button-group">
              <Button
                onClick={() => handleEvent({ type: 'TASKA_CONTINUE' })}
                size="large"
                data-testid="primary-cta"
                disabled={selectedOption === null}
              >
                Continue
              </Button>
              <Button
                onClick={() => handleEvent({ type: 'TASKA_SWITCH' })}
                variant="secondary"
                size="large"
                data-testid="secondary-cta"
                disabled
              >
                Switch service
              </Button>
            </div>
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
            <p className="task-body" data-testid="body-text">Review your request.</p>
            {!state.taskA.started && (
              <p className="state-cue" data-testid="state-cue-start">Tap Continue to start your ride.</p>
            )}
            {state.taskA.started && (
              <p className="state-cue" data-testid="state-cue-started">Your ride has started.</p>
            )}
            <Card>
              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-label">Option:</span>
                  <span className="summary-value">{selectedOption || 'Standard'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Status:</span>
                  <span className="summary-value">{state.taskA.started ? 'In progress' : 'Ready to confirm'}</span>
                </div>
              </div>
            </Card>
            <div className="button-group">
              <Button
                onClick={() => handleEvent({ type: 'TASKA_CONTINUE' })}
                size="large"
                data-testid="primary-cta"
                disabled={state.taskA.started}
              >
                {state.taskA.started ? 'Started' : 'Continue'}
              </Button>
              <Button
                onClick={() => handleEvent({ type: 'TASKA_SWITCH' })}
                variant="secondary"
                size="large"
                data-testid="secondary-cta"
                disabled={!state.taskA.started}
              >
                Switch service
              </Button>
            </div>
            {config.showCrossServiceHint && (
              <p className="hint-text" data-testid="cross-service-hint">Labels and navigation are consistent across services.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Switch screen
  if (state.currentScreen === 'switch') {
    return (
      <div className="screen screen-switch" data-testid="screen" data-screen-id="switch">
        <div className="task-header" style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title" data-testid="screen-title">Switch service</h2>
          </div>
        </div>
        <p className="screen-subtitle">Choose another service to continue.</p>

        <div className="cards-stack">
          {/* Resume card - only for high interrelatedness after Task B completed */}
          {config.showResumeCue && interrelatednessHigh && state.taskB.completed && (
            <Card hoverable onClick={() => handleEvent({ type: 'RESUME_TASKA' })} data-testid="resume-card">
              <div className="resume-card">
                <div className="resume-header">
                  <h3 data-testid="resume-card-title">Resume Task A</h3>
                  <span className="resume-badge" data-testid="resume-card-subtitle">Progress saved</span>
                </div>
                <Button variant="primary" data-testid="resume-card-cta">Resume</Button>
              </div>
            </Card>
          )}

          {/* Go to Ride: only shown after TaskB is completed (low interrelatedness path) */}
          {/* Hide if Resume Card is shown (high interrelatedness uses Resume card instead) */}
          {state.taskB.completed && !(config.showResumeCue && interrelatednessHigh) && (
            <Card
              hoverable
              onClick={() => handleEvent({ type: 'SWITCH_TO_RIDE' })}
              data-testid="card-go-ride"
            >
              <div className="service-switch-card">
                <Car size={24} />
                <h3>Go to Ride</h3>
              </div>
            </Card>
          )}

          {/* Service 2 card - only before TaskB completion */}
          {!state.taskB.completed && (
            <Card hoverable onClick={() => handleEvent({ type: 'SWITCH_TO_SERVICE2' })} data-testid="card-go-service2">
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
          <p className="hint-text" data-testid="cross-service-hint">Labels and navigation are consistent across services.</p>
        )}
      </div>
    );
  }

  // Task B screen
  if (state.currentScreen === 'taskB') {
    return (
      <div className="screen screen-task" data-testid="screen" data-screen-id="taskB">
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title" data-testid="screen-title">{config.service2Label}</h2>
          </div>
          <Tag data-testid="step-label">Step {state.taskB.step} of 2</Tag>
        </div>

        {state.taskB.step === 1 ? (
          <div className="content-section">
            {config.taskBModel === 'review_confirm' ? (
              <div data-testid="taskb-model-review">
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
                <p className="task-body" data-testid="body-text">Review the details below.</p>
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
              </div>
            ) : (
              <div data-testid="taskb-model-compose">
                <p className="task-body" data-testid="body-text">Select items to add.</p>
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
                    data-testid="compose-chip"
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
                    data-testid="compose-chip"
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
                    data-testid="compose-chip"
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
              </div>
            )}
            <div className="button-group">
              <Button
                onClick={() => handleEvent({ type: 'TASKB_CONTINUE' })}
                size="large"
                data-testid="primary-cta"
                disabled={config.taskBModel !== 'review_confirm' && selectedItems.length < 1}
              >
                Continue
              </Button>
              <Button
                onClick={() => handleEvent({ type: 'TASKB_CONFIRM' })}
                variant="secondary"
                size="large"
                data-testid="confirm-cta"
                disabled
              >
                Confirm
              </Button>
            </div>
            {config.showCrossServiceHint && (
              <p className="hint-text" data-testid="cross-service-hint">Labels and navigation are consistent across services.</p>
            )}
          </div>
        ) : (
          <div className="content-section">
            <p className="task-body" data-testid="body-text">Ready to confirm.</p>
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
              data-testid="primary-cta"
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
      <div className="screen screen-task" data-testid="screen" data-screen-id="resumeA">
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {config.showSharedNav && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={20} />
              </div>
            )}
            <h2 className="screen-title" data-testid="screen-title">
              {config.showResumeCue ? 'Resume Task A' : 'Ride'}
            </h2>
          </div>
          <Tag data-testid="step-label">Step 2 of 2</Tag>
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
          <p className="task-body" data-testid="body-text">Continue from where you left off.</p>
          {config.showResumeCue && (
            <p className="state-cue" data-testid="state-cue">Your progress is preserved.</p>
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
            data-testid="primary-cta"
          >
            Finish Task A
          </Button>
          {config.showCrossServiceHint && (
            <p className="hint-text" data-testid="cross-service-hint">Labels and navigation are consistent across services.</p>
          )}
        </div>
      </div>
    );
  }

  // Finish screen
  if (state.currentScreen === 'finish') {
    return (
      <div className="screen screen-finish" data-testid="screen" data-screen-id="finish">
        <div className="finish-content">
          <div className="finish-icon">✓</div>
          <h2 className="screen-title" data-testid="screen-title">All set</h2>
          <p className="screen-subtitle" data-testid="body-text">You&apos;ve completed today&apos;s tasks.</p>
        </div>
        <div className="button-group">
          <Button
            onClick={() => handleEvent({ type: 'RETURN_HOME' })}
            size="large"
            data-testid="primary-cta"
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
