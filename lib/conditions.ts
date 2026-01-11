import { ConditionConfig } from './types';

const conditions: Record<string, ConditionConfig> = {
  c1: {
    id: 'c1',
    heterogeneity: 'low',
    interrelatedness: 'low',
    service2Label: 'Package',
    taskBModel: 'review_confirm',
    showSharedNav: false,
    showResumeCue: false,
    showCrossServiceHint: false,
  },
  c2: {
    id: 'c2',
    heterogeneity: 'low',
    interrelatedness: 'high',
    service2Label: 'Package',
    taskBModel: 'review_confirm',
    showSharedNav: true,
    showResumeCue: true,
    showCrossServiceHint: true,
  },
  c3: {
    id: 'c3',
    heterogeneity: 'high',
    interrelatedness: 'low',
    service2Label: 'Grocery',
    taskBModel: 'compose_confirm',
    showSharedNav: false,
    showResumeCue: false,
    showCrossServiceHint: false,
  },
  c4: {
    id: 'c4',
    heterogeneity: 'high',
    interrelatedness: 'high',
    service2Label: 'Grocery',
    taskBModel: 'compose_confirm',
    showSharedNav: true,
    showResumeCue: true,
    showCrossServiceHint: true,
  },
};

export function getCondition(id: string): ConditionConfig | null {
  return conditions[id] || null;
}

export function getAllConditionIds(): string[] {
  return Object.keys(conditions);
}
