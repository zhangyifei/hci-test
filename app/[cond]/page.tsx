import { notFound } from 'next/navigation';
import { getCondition } from '@/lib/conditions';
import { PhoneFrame } from '@/components/PhoneFrame';
import { ScreenRenderer } from '@/components/ScreenRenderer';

interface ConditionPageProps {
  params: {
    cond: string;
  };
}

export default function ConditionPage({ params }: ConditionPageProps) {
  const config = getCondition(params.cond);

  if (!config) {
    notFound();
  }

  return (
    <div className="condition-page">
      <div className="condition-info">
        <h1>Condition {config.id.toUpperCase()}</h1>
        <div className="condition-meta">
          <span>Heterogeneity: {config.heterogeneity}</span>
          <span>•</span>
          <span>Interrelatedness: {config.interrelatedness}</span>
        </div>
      </div>
      <PhoneFrame config={config}>
        <ScreenRenderer config={config} />
      </PhoneFrame>
    </div>
  );
}
