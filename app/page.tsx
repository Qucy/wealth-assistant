import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>welcome to wealth assistant</h1>
      <Link href="/login">
        <button>Go to login</button>
      </Link>
    </div>
  );
}