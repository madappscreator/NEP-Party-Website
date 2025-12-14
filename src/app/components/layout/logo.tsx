import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 mr-4" aria-label="Back to homepage">
      <Shield className="h-10 w-10 text-primary" />
      <div>
        <p className="font-bold text-xl leading-tight">NEP</p>
        <p className="text-xs text-muted-foreground leading-tight hidden sm:block">National Ex-Servicemen Party</p>
      </div>
    </Link>
  );
}
