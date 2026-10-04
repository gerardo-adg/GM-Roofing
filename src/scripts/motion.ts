/**
 * Scroll-triggered motion. Elements opt in with data-reveal:
 *   data-reveal          fade and rise
 *   data-reveal="lines"  headline lines (.l > .l__in) slide up from behind a mask
 *   data-reveal="media"  image/video wipes open and settles from a slight zoom
 *   data-reveal="draw"   SVG strokes draw themselves in
 * Children of [data-stagger] get an increasing delay automatically.
 * All of it is skipped for visitors who prefer reduced motion (see global.css).
 */
export function initMotion() {
  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
  });

  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );
  els.forEach((el) => io.observe(el));

  // Fast scrolls or anchor jumps can skip past an element between frames.
  // Reveal anything that's already above the fold so nothing stays hidden.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    const limit = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add("is-in");
        io.unobserve(el);
      }
    });
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    },
    { passive: true }
  );
}
