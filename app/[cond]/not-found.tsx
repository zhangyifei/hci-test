import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>Condition Not Found</h1>
      <p>The condition you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}
