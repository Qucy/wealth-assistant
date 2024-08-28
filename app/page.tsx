import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Wealth Assistant</h1>
      <Link href="/login">
        <button>Go to login</button>
      </Link>
      <Link href="/dashboard">
        <button>Go to dashboard</button>
      </Link>
    </div>
  );
}