import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { Contact, Footer, Ribbons, Studio, Toolkit, Work, Wrap } from "./components/Sections";

// Small inverted dot that follows the pointer and grows over links.
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.classList.toggle("big", !!(e.target as Element).closest?.("a, button"));
    };
    addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, []);
  return <div ref={ref} className="cursor" aria-hidden />;
}

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Wrap>
          <Hero />
        </Wrap>
        <Ribbons />
        <Wrap>
          <Work />
          <Studio />
          <Toolkit />
          <Contact />
        </Wrap>
      </main>
      <Footer />
    </>
  );
}
