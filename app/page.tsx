import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <h1>Super-App Prototype</h1>
        <p className="landing-subtitle">
          2×2 Experiment: Feature Heterogeneity × Feature Interrelatedness
        </p>

        <div className="instructions">
          <h2>Instructions</h2>
          <p>
            This prototype demonstrates a cross-service task flow. You will:
          </p>
          <ol>
            <li>Start Task A in Service 1 (Ride)</li>
            <li>Switch to Service 2 to complete Task B</li>
            <li>Return to Service 1 to finish Task A</li>
          </ol>
          <p>
            Each condition manipulates two factors while keeping interaction mechanics constant.
          </p>
        </div>

        <div className="conditions-grid">
          <Link href="/c1" className="condition-card">
            <div className="condition-label">Condition 1</div>
            <div className="condition-desc">
              Low Heterogeneity + Low Interrelatedness
            </div>
          </Link>
          <Link href="/c2" className="condition-card">
            <div className="condition-label">Condition 2</div>
            <div className="condition-desc">
              Low Heterogeneity + High Interrelatedness
            </div>
          </Link>
          <Link href="/c3" className="condition-card">
            <div className="condition-label">Condition 3</div>
            <div className="condition-desc">
              High Heterogeneity + Low Interrelatedness
            </div>
          </Link>
          <Link href="/c4" className="condition-card">
            <div className="condition-label">Condition 4</div>
            <div className="condition-desc">
              High Heterogeneity + High Interrelatedness
            </div>
          </Link>
        </div>

        <div className="landing-footer">
          <p>
            This is a research prototype. All interactions are logged locally
            for analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
