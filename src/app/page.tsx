import { Hero } from './components/sections/hero';
import { About } from './components/sections/about';
import { Journey } from './components/sections/journey';
import { OurPromise } from './components/sections/our-promise';
import { Leadership } from './components/sections/leadership';
import { PolicyLeaders } from './components/sections/policy-leaders';
import { WhyJoin } from './components/sections/why-join';
import { OurWings } from './components/sections/our-wings';
import { FinalCta } from './components/sections/final-cta';
import { ContactStrip } from './components/sections/contact-strip';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Journey />
      <About />
      <OurPromise />
      <Leadership />
      <PolicyLeaders />
      <WhyJoin />
      <OurWings />
      <FinalCta />
      <ContactStrip />
    </div>
  );
}
