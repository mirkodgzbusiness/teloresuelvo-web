"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(Observer, CustomEase);

interface Slide {
  title: string;
  price: string;
  bg: string;
  mask: string;
}

const SLIDES: Slide[] = [
  {
    title: "Bogotá",
    price: "desde 699€",
    bg: "/slide-bogota-bg.jpg",
    mask: "/slide-bogota-mask.jpg",
  },
  {
    title: "Lima",
    price: "desde 649€",
    bg: "/slide-peru-bg.jpg",
    mask: "/slide-peru-mask.jpg",
  },
  {
    title: "Guayaquil",
    price: "desde 799€",
    bg: "/slide-ecuador-bg.jpg",
    mask: "/slide-ecuador-mask.jpg",
  },
  {
    title: "El Salvador",
    price: "desde 899€",
    bg: "/slide-salvador-bg.jpg",
    mask: "/slide-salvador-mask.jpg",
  },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    CustomEase.create("heroSlide", "M0,0 C0.625,0.05 0,1 1,1");

    const root = rootRef.current;
    if (!root) return;

    const titles = [
      ...root.querySelectorAll("[data-layered-slider-title]"),
    ] as HTMLElement[];
    if (!titles.length) return;
    const count = titles.length;

    const backgrounds = [
      ...root.querySelectorAll("[data-layered-slider-bg]"),
    ] as HTMLElement[];
    const maskItems = [
      ...root.querySelectorAll("[data-layered-slider-mask-item]"),
    ] as HTMLElement[];
    const maskFrame = root.querySelector(
      "[data-layered-slider-mask]"
    ) as HTMLElement | null;
    const fill = root.querySelector(
      "[data-layered-slider-fill]"
    ) as HTMLElement | null;
    const currentEl = root.querySelector(
      "[data-layered-slider-current]"
    ) as HTMLElement | null;
    const totalEl = root.querySelector(
      "[data-layered-slider-total]"
    ) as HTMLElement | null;
    const prevBtn = root.querySelector(
      "[data-layered-slider-prev]"
    ) as HTMLElement | null;
    const nextBtn = root.querySelector(
      "[data-layered-slider-next]"
    ) as HTMLElement | null;

    const controls = [
      ...new Set([
        ...titles,
        ...root.querySelectorAll<HTMLElement>("a, button"),
      ]),
    ];

    const autoplayAttr = root.getAttribute("data-layered-slider-autoplay");
    const autoplay = autoplayAttr !== null ? parseFloat(autoplayAttr) : 5;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = gsap.utils.clamp;
    const wrap = (distance: number) =>
      distance - count * Math.round(distance / count);

    const transitionDuration = 1;
    const backgroundZoom = 0;
    const titleGap = 0.5;
    const titleSpacing = 40;

    if (totalEl) totalEl.textContent = String(count).padStart(2, "0");

    let titleStep = 0;
    let maskStep = 0;
    const measure = () => {
      const widestTitle = Math.max(
        ...titles.map((title) => title.offsetWidth)
      );
      titleStep = Math.max(
        root.clientWidth * titleGap,
        widestTitle + titleSpacing
      );
      maskStep = maskFrame ? maskFrame.clientWidth : root.clientWidth;
    };
    measure();

    const state = { progress: 0 };
    let activeIndex = -1;

    const setActive = (previousIndex: number, index: number) => {
      [backgrounds, titles, maskItems].forEach((list) => {
        if (previousIndex >= 0 && list[previousIndex])
          list[previousIndex].removeAttribute("data-active");
        if (list[index]) list[index].setAttribute("data-active", "");
      });
    };

    const render = (progress: number) => {
      const centeredIndex = ((Math.round(progress) % count) + count) % count;

      for (let i = 0; i < count; i++) {
        const offset = wrap(i - progress);
        const distance = Math.abs(offset);

        const background = backgrounds[i];
        if (background) {
          const backgroundOpacity = clamp(0, 1, 1 - distance);
          gsap.set(background, {
            opacity: backgroundOpacity,
            scale: 1 + backgroundZoom - backgroundZoom * backgroundOpacity,
            zIndex: Math.round(backgroundOpacity * 100),
          });
        }

        gsap.set(titles[i], {
          x: offset * titleStep,
          opacity: i === centeredIndex ? 1 : 0.4,
          pointerEvents: "auto",
        });

        const maskItem = maskItems[i];
        if (maskItem) {
          gsap.set(maskItem, { x: offset * maskStep });
        }
      }

      if (centeredIndex !== activeIndex) {
        const previousIndex = activeIndex;
        activeIndex = centeredIndex;
        setActive(previousIndex, centeredIndex);
        if (currentEl)
          currentEl.textContent = String(centeredIndex + 1).padStart(2, "0");
      }
    };

    let hovering = 0;
    let autoTween: gsap.core.Tween | null = null;
    const startAutoplay = () => {
      if (!autoTween) return;
      autoTween.restart();
      if (hovering > 0) autoTween.pause();
    };

    let slideTween: gsap.core.Tween | null = null;
    let current = 0;
    function goTo(delta: number) {
      current += delta;
      if (slideTween) slideTween.kill();
      slideTween = gsap.to(state, {
        progress: current,
        duration: reduced ? 0 : transitionDuration,
        ease: "heroSlide",
        onUpdate: () => render(state.progress),
      });
      startAutoplay();
    }

    function goToIndex(i: number) {
      const delta = wrap(i - current);
      if (delta !== 0) goTo(delta);
    }

    if (autoplay > 0 && !reduced && fill) {
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      autoTween = gsap.to(fill, {
        scaleX: 1,
        duration: autoplay,
        ease: "none",
        paused: true,
        onComplete: () => goTo(1),
      });
    }

    let gestureUsed = false;
    const observer = Observer.create({
      target: root,
      type: "touch,pointer",
      dragMinimum: 10,
      tolerance: 25,
      lockAxis: true,
      onDragStart() {
        gestureUsed = false;
      },
      onLeft() {
        if (!gestureUsed) {
          gestureUsed = true;
          goTo(1);
        }
      },
      onRight() {
        if (!gestureUsed) {
          gestureUsed = true;
          goTo(-1);
        }
      },
    });

    const onPrev = () => goTo(-1);
    const onNext = () => goTo(1);
    if (prevBtn) prevBtn.addEventListener("click", onPrev);
    if (nextBtn) nextBtn.addEventListener("click", onNext);

    const onTitleClick = (e: Event) => {
      const i = titles.indexOf(e.currentTarget as HTMLElement);
      if (i === activeIndex) return;
      e.preventDefault();
      goToIndex(i);
    };
    titles.forEach((title) => title.addEventListener("click", onTitleClick));

    const onEnter = () => {
      hovering++;
      if (autoTween) autoTween.pause();
    };
    const onLeave = () => {
      hovering = Math.max(0, hovering - 1);
      if (autoTween && hovering === 0) autoTween.resume();
    };
    controls.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    const onResize = () => {
      measure();
      render(state.progress);
    };
    window.addEventListener("resize", onResize);

    if (document.fonts) document.fonts.ready.then(onResize);

    render(0);
    startAutoplay();

    return () => {
      observer.kill();
      if (slideTween) slideTween.kill();
      if (autoTween) autoTween.kill();
      window.removeEventListener("resize", onResize);
      if (prevBtn) prevBtn.removeEventListener("click", onPrev);
      if (nextBtn) nextBtn.removeEventListener("click", onNext);
      titles.forEach((title) =>
        title.removeEventListener("click", onTitleClick)
      );
      controls.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-layered-slider-init
      data-layered-slider-autoplay="5"
      className="layered-slider"
    >
      <div className="layered-slider__container">
        {/* Background images */}
        <div className="layered-slider__bg-collection">
          <div className="layered-slider__bg-list">
            {SLIDES.map((slide, i) => (
              <div key={i} data-layered-slider-bg className="layered-slider__bg-item">
                <img
                  src={slide.bg}
                  alt={`Viaja a ${slide.title}`}
                  className="layered-slider__bg-img"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="layered-slider__bg-dark" />

        {/* Titles */}
        <div className="layered-slider__text-collection">
          <div className="layered-slider__text-list">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                data-layered-slider-title
                className="layered-slider__text-item"
              >
                <span className="layered-slider__text-eyebrow">Viaja a</span>
                <span className="layered-slider__text-title">
                  {slide.title}
                </span>
                <span className="layered-slider__text-price">{slide.price}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Mask images */}
        <div
          data-layered-slider-mask
          className="layered-slider__mask-collection"
        >
          <div className="layered-slider__mask-list">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                data-layered-slider-mask-item
                className="layered-slider__mask-item"
              >
                <img
                  src={slide.mask}
                  draggable={false}
                  alt=""
                  className="layered-slider__mask-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay: counter + nav */}
        <div className="layered-slider__overlay">
          <div className="layered-slider__overlay-top" style={{ visibility: "hidden" }}>
            <span data-layered-slider-current className="layered-slider__span">
              01
            </span>
            <div className="layered-slider__progress">
              <div
                data-layered-slider-fill
                className="layered-slider__progress-inner"
              />
            </div>
            <span data-layered-slider-total className="layered-slider__span">
              05
            </span>
          </div>
          <div className="layered-slider__overlay-btm">
            <div className="layered-slider__nav">
              <button
                data-layered-slider-prev
                className="layered-slider__nav-button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="100%"
                  className="layered-slider__nav-icon"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                data-layered-slider-next
                className="layered-slider__nav-button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="100%"
                  className="layered-slider__nav-icon"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
