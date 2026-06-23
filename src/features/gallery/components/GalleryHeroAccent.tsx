import { useEffect, useRef } from "react";
import { getThumbnailUrl } from "../paths";
import type { GalleryItem } from "../types";

const HERO_ACCENT_PARALLAX_DEPTHS = [
  0.7, 1.05, 0.85, 1.15, 0.75, 1.25, 0.9, 1.1, 0.8, 1.2, 0.95, 1,
];
const HERO_ACCENT_BUMP_RADIUS = 130;
const HERO_ACCENT_BUMP_STRENGTH = 1.65;
const HERO_ACCENT_DAMPING = 0.82;
const HERO_ACCENT_MAX_SHIFT = 34;
const HERO_ACCENT_SPRING = 0.065;

type HeroAccentTileMotion = {
  depth: number;
  element: HTMLElement;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

export function GalleryHeroAccent({
  items,
}: {
  items: GalleryItem[];
}): React.JSX.Element {
  const accentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cursorRef = useRef<{ isActive: boolean; x: number; y: number } | null>(
    null,
  );
  const prefersReducedMotionRef = useRef(false);
  const tileMotionRef = useRef<HeroAccentTileMotion[]>([]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function getTileMotion() {
    const accent = accentRef.current;
    const tileElements = Array.from(
      accent?.querySelectorAll<HTMLElement>(".gallery-hero-accent__tile") ?? [],
    );
    const currentMotionByElement = new Map(
      tileMotionRef.current.map((motion) => [motion.element, motion]),
    );

    tileMotionRef.current = tileElements.map((element) => {
      const currentMotion = currentMotionByElement.get(element);

      if (currentMotion) {
        currentMotion.depth = Number(element.dataset.depth ?? 1);
        return currentMotion;
      }

      return {
        depth: Number(element.dataset.depth ?? 1),
        element,
        vx: 0,
        vy: 0,
        x: 0,
        y: 0,
      };
    });

    return tileMotionRef.current;
  }

  function clampShift(value: number) {
    return Math.max(
      -HERO_ACCENT_MAX_SHIFT,
      Math.min(HERO_ACCENT_MAX_SHIFT, value),
    );
  }

  function animateTiles() {
    const cursor = cursorRef.current;
    const tileMotion = getTileMotion();
    let shouldContinue = Boolean(cursor?.isActive);

    tileMotion.forEach((motion) => {
      const bounds = motion.element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      if (cursor?.isActive) {
        const distanceX = centerX - cursor.x;
        const distanceY = centerY - cursor.y;
        const distance = Math.hypot(distanceX, distanceY);
        const bumpRadius =
          HERO_ACCENT_BUMP_RADIUS + Math.max(bounds.width, bounds.height) / 2;

        if (distance < bumpRadius) {
          const safeDistance = distance || 1;
          const force =
            (1 - distance / bumpRadius) ** 2 *
            HERO_ACCENT_BUMP_STRENGTH *
            motion.depth;

          motion.vx += (distanceX / safeDistance) * force;
          motion.vy += (distanceY / safeDistance) * force;
        }
      }

      motion.vx += -motion.x * HERO_ACCENT_SPRING;
      motion.vy += -motion.y * HERO_ACCENT_SPRING;
      motion.vx *= HERO_ACCENT_DAMPING;
      motion.vy *= HERO_ACCENT_DAMPING;

      const nextX = clampShift(motion.x + motion.vx);
      const nextY = clampShift(motion.y + motion.vy);

      if (nextX !== motion.x + motion.vx) {
        motion.vx *= -0.25;
      }

      if (nextY !== motion.y + motion.vy) {
        motion.vy *= -0.25;
      }

      motion.x = nextX;
      motion.y = nextY;

      motion.element.style.setProperty(
        "--tile-shift-x",
        `${motion.x.toFixed(2)}px`,
      );
      motion.element.style.setProperty(
        "--tile-shift-y",
        `${motion.y.toFixed(2)}px`,
      );

      if (
        Math.abs(motion.x) > 0.05 ||
        Math.abs(motion.y) > 0.05 ||
        Math.abs(motion.vx) > 0.05 ||
        Math.abs(motion.vy) > 0.05
      ) {
        shouldContinue = true;
      }
    });

    if (shouldContinue) {
      animationFrameRef.current = window.requestAnimationFrame(animateTiles);
    } else {
      animationFrameRef.current = null;
      tileMotion.forEach((motion) => {
        motion.x = 0;
        motion.y = 0;
        motion.vx = 0;
        motion.vy = 0;
        motion.element.style.setProperty("--tile-shift-x", "0px");
        motion.element.style.setProperty("--tile-shift-y", "0px");
      });
    }
  }

  function startTileAnimation() {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(animateTiles);
    }
  }

  function moveAccent(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotionRef.current) {
      return;
    }

    cursorRef.current = {
      isActive: true,
      x: event.clientX,
      y: event.clientY,
    };
    startTileAnimation();
  }

  function resetAccent() {
    cursorRef.current = null;
    startTileAnimation();
  }

  return (
    <div
      aria-hidden="true"
      className="gallery-hero-accent hidden lg:block"
      onPointerLeave={resetAccent}
      onPointerMove={moveAccent}
      ref={accentRef}
    >
      <div className="gallery-hero-accent__grid">
        {items.map((item, index) => (
          <div
            className="gallery-hero-accent__tile"
            data-depth={HERO_ACCENT_PARALLAX_DEPTHS[index] ?? 1}
            key={item.slug}
          >
            <img
              alt=""
              className="h-full w-full object-cover"
              decoding="async"
              loading={index < 4 ? "eager" : "lazy"}
              src={getThumbnailUrl(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
