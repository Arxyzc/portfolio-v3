import { AnimatedRoot } from "@/components/layout/AnimatedRoot";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/about/About";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { Experience } from "@/components/experience/Experience";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <AnimatedRoot>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </AnimatedRoot>
  );
}
