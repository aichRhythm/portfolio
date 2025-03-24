"use client";

import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);
  const researchRef = useRef<HTMLDivElement | null>(null);
  const interestsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollWidth(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex bg-gray-100 text-black">
      <Sidebar
        scrollToSection={scrollToSection}
        sectionRefs={{
          aboutRef,
          skillsRef,
          experienceRef,
          projectsRef,
          educationRef,
          researchRef,
          interestsRef,
          contactRef,
        }}
      />
      <MainContent
        sectionRefs={{
          aboutRef,
          skillsRef,
          experienceRef,
          projectsRef,
          educationRef,
          researchRef,
          interestsRef,
          contactRef,
        }}
        scrollWidth={scrollWidth}
      />
    </div>
  );
}
