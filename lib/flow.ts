import { FlowState, FlowEvent, ScreenId } from './types';

export const initialState: FlowState = {
  currentScreen: 'home',
  taskA: {
    step: 1,
    started: false,
  },
  taskB: {
    step: 1,
    completed: false,
  },
  timestamps: {},
  counters: {
    backtracks: 0,
    misclicks: 0,
  },
};

export function flowReducer(state: FlowState, event: FlowEvent): FlowState {
  const newState = { ...state };
  const now = Date.now();

  switch (event.type) {
    case 'GO_HOME':
      newState.currentScreen = 'home';
      newState.timestamps['GO_HOME'] = now;
      break;

    case 'GO_SERVICE':
      newState.currentScreen = 'service';
      newState.timestamps['GO_SERVICE'] = now;
      break;

    case 'OPEN_RIDE':
      newState.currentScreen = 'taskA';
      newState.timestamps['OPEN_RIDE'] = now;
      break;

    case 'OPEN_SERVICE2':
      newState.currentScreen = 'taskB';
      newState.timestamps['OPEN_SERVICE2'] = now;
      break;

    case 'TASKA_CONTINUE':
      if (state.taskA.step === 1) {
        newState.taskA = { step: 2, started: false };
      } else if (state.taskA.step === 2) {
        newState.taskA = { ...state.taskA, started: true };
      }
      newState.timestamps['TASKA_CONTINUE'] = now;
      break;

    case 'TASKA_SWITCH':
      // Always send to switch; UI will gate what is shown
      newState.currentScreen = 'switch';
      newState.timestamps['TASKA_SWITCH'] = now;
      break;

    case 'SWITCH_TO_RIDE':
      newState.currentScreen = 'resumeA';
      newState.timestamps['SWITCH_TO_RIDE'] = now;
      break;

    case 'SWITCH_TO_SERVICE2':
      newState.currentScreen = 'taskB';
      newState.timestamps['SWITCH_TO_SERVICE2'] = now;
      break;

    case 'TASKB_CONTINUE':
      if (state.taskB.step === 1) {
        newState.taskB = { ...state.taskB, step: 2 };
      }
      newState.timestamps['TASKB_CONTINUE'] = now;
      break;

    case 'TASKB_CONFIRM':
      newState.taskB = { ...state.taskB, completed: true };
      newState.currentScreen = 'switch';
      newState.timestamps['TASKB_CONFIRM'] = now;
      break;

    case 'RESUME_TASKA':
      newState.currentScreen = 'resumeA';
      newState.timestamps['RESUME_TASKA'] = now;
      break;

    case 'FINISH_TASKA':
      newState.currentScreen = 'finish';
      newState.timestamps['FINISH_TASKA'] = now;
      break;

    case 'RETURN_HOME':
      newState.currentScreen = 'home';
      newState.timestamps['RETURN_HOME'] = now;
      break;

    default:
      break;
  }

  return newState;
}
