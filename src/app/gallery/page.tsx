import { permanentRedirect } from 'next/navigation';

export default function GalleryRedirectPage() {
  permanentRedirect('/events');
}

