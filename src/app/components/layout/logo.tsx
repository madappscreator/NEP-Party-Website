import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
      <Shield className="h-7 w-7 text-primary" />
      <span className="hidden font-bold sm:inline-block text-xl">
        NEP
      </span>
    </Link>
  );
}
