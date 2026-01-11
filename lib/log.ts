import { LogEvent, ScreenId } from './types';

const LOG_KEY = 'proto_log';

export function logEvent(
  conditionId: string,
  eventName: string,
  screen: ScreenId,
  payload?: any
): void {
  const event: LogEvent = {
    timestamp: Date.now(),
    conditionId,
    eventName,
    screen,
    payload,
  };

  if (typeof window !== 'undefined') {
    try {
      const existingLog = localStorage.getItem(LOG_KEY);
      const log: LogEvent[] = existingLog ? JSON.parse(existingLog) : [];
      log.push(event);
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
    } catch (err) {
      console.error('Failed to log event:', err);
    }
  }
}

export function getLog(): LogEvent[] {
  if (typeof window !== 'undefined') {
    try {
      const existingLog = localStorage.getItem(LOG_KEY);
      return existingLog ? JSON.parse(existingLog) : [];
    } catch (err) {
      console.error('Failed to retrieve log:', err);
      return [];
    }
  }
  return [];
}

export function clearLog(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOG_KEY);
  }
}

export function exportLog(): void {
  const log = getLog();
  const dataStr = JSON.stringify(log, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = `proto_log_${Date.now()}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
