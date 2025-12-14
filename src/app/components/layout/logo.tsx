import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 mr-4" aria-label="Back to homepage">
      <Image src="/flag.png" alt="NEP Flag" width={40} height={40} className="h-10 w-10" />
      <div>
        <p className="font-bold text-xl leading-tight">NEP</p>
        <p className="text-xs text-muted-foreground leading-tight hidden sm:block">National Ex-Servicemen Party</p>
      </div>
    </Link>
  );
}
