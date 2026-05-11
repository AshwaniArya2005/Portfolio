import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Certifications } from "@/sections/Certifications";
import { CodingProfiles } from "@/sections/CodingProfiles";
import { Resume } from "@/sections/Resume";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <CodingProfiles />
      <Resume />
      <Contact />
    </>
  );
}
