// Type definitions for the experiment prototype

export type HeterogeneityLevel = 'low' | 'high';
export type InterrelatednessLevel = 'low' | 'high';
export type TaskModel = 'review_confirm' | 'compose_confirm';
export type ServiceLabel = 'Package' | 'Grocery';

export interface ConditionConfig {
  id: string;
  heterogeneity: HeterogeneityLevel;
  interrelatedness: InterrelatednessLevel;
  service2Label: ServiceLabel;
  taskBModel: TaskModel;
  showSharedNav: boolean;
  showResumeCue: boolean;
  showCrossServiceHint: boolean;
}

export type ScreenId = 'home' | 'service' | 'taskA' | 'switch' | 'taskB' | 'resumeA' | 'finish';

export interface FlowState {
  currentScreen: ScreenId;
  taskA: {
    step: 1 | 2;
    started: boolean;
  };
  taskB: {
    step: 1 | 2;
    completed: boolean;
  };
  timestamps: Record<string, number>;
  counters: {
    backtracks: number;
    misclicks: number;
  };
}

export type FlowEvent =
  | { type: 'GO_HOME' }
  | { type: 'GO_SERVICE' }
  | { type: 'OPEN_RIDE' }
  | { type: 'OPEN_SERVICE2' }
  | { type: 'TASKA_CONTINUE' }
  | { type: 'TASKA_SWITCH' }
  | { type: 'SWITCH_TO_RIDE' }
  | { type: 'SWITCH_TO_SERVICE2' }
  | { type: 'TASKB_CONTINUE' }
  | { type: 'TASKB_CONFIRM' }
  | { type: 'RESUME_TASKA' }
  | { type: 'FINISH_TASKA' }
  | { type: 'RETURN_HOME' };

export interface LogEvent {
  timestamp: number;
  conditionId: string;
  eventName: string;
  screen: ScreenId;
  payload?: any;
}
