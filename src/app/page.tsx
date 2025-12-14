import { Hero } from './components/sections/hero';
import { About } from './components/sections/about';
import { News } from './components/sections/news';
import { Manifesto } from './components/sections/manifesto';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Separator className="my-12 md:my-24" />
      <News />
      <Separator className="my-12 md:my-24" />
      <Manifesto />
    </div>
  );
}
