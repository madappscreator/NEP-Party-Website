import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 mr-4" aria-label="Back to homepage">
      <Image src="/NEP Flag.jpg" alt="NEP Flag" width={60} height={60} className="h-14 w-14" />
      <div>
        <p className="font-bold text-2xl leading-tight">NEP</p>
        <p className="text-sm text-muted-foreground leading-tight hidden sm:block">National Ex-Servicemen Party</p>
      </div>
    </Link>
  );
}
