"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

function debounce(fn: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

interface NavMultilevelProps {
  transparent?: boolean;
}

export default function NavMultilevel({ transparent = false }: NavMultilevelProps) {
  const navRef = useRef<HTMLElement>(null);
  const initRef = useRef<{ lastMode: string | null }>({ lastMode: null });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    function initNavigation() {
      const isMobile = window.innerWidth < 768;
      if (isMobile && initRef.current.lastMode !== "mobile") {
        initMobileMenu();
        initRef.current.lastMode = "mobile";
      } else if (!isMobile && initRef.current.lastMode !== "desktop") {
        initDesktopDropdowns();
        initRef.current.lastMode = "desktop";
      }
    }

    function initMobileMenu() {
      const btn = nav!.querySelector("[data-menu-button]") as HTMLElement;
      const navEl = nav!.matches("[data-menu-status]") ? nav! : nav!.querySelector("[data-menu-status]") as HTMLElement;
      if (!btn || !navEl) return;

      btn.setAttribute("aria-expanded", "false");

      const handler = () => {
        const open = navEl.dataset.menuStatus === "open";
        navEl.dataset.menuStatus = open ? "closed" : "open";
        btn.setAttribute("aria-expanded", String(!open));
        if (open) {
          nav!.querySelectorAll<HTMLElement>("[data-dropdown-toggle]").forEach(
            (toggle) => {
              toggle.dataset.dropdownToggle = "closed";
              toggle.setAttribute("aria-expanded", "false");
            }
          );
        }
      };

      btn.removeEventListener("click", handler);
      btn.addEventListener("click", handler);
      (btn as any)._handler = handler;

      nav!.querySelectorAll<HTMLElement>("[data-dropdown-toggle]").forEach(
        (toggle) => {
          const dd = toggle.nextElementSibling as HTMLElement;
          if (!dd || !dd.classList.contains("nav-dropdown")) return;

          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-haspopup", "true");

          const clickHandler = () => {
            const open = toggle.dataset.dropdownToggle === "open";
            nav!
              .querySelectorAll<HTMLElement>("[data-dropdown-toggle]")
              .forEach((other) => {
                if (other !== toggle) {
                  other.dataset.dropdownToggle = "closed";
                  other.setAttribute("aria-expanded", "false");
                }
              });
            toggle.dataset.dropdownToggle = open ? "closed" : "open";
            toggle.setAttribute("aria-expanded", String(!open));
          };

          toggle.removeEventListener("click", clickHandler);
          toggle.addEventListener("click", clickHandler);
          (toggle as any)._clickHandler = clickHandler;
        }
      );
    }

    function initDesktopDropdowns() {
      const toggles = Array.from(
        nav!.querySelectorAll<HTMLElement>("[data-dropdown-toggle]")
      );
      const links = Array.from(
        nav!.querySelectorAll<HTMLElement>(
          ".nav-link:not([data-dropdown-toggle])"
        )
      );

      toggles.forEach((toggle) => {
        const dd = toggle.nextElementSibling as HTMLElement;
        if (!dd || !dd.classList.contains("nav-dropdown")) return;

        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-haspopup", "true");
        dd.setAttribute("aria-hidden", "true");

        const enterHandler = () => {
          const anyOpen = toggles.some(
            (x) => x.dataset.dropdownToggle === "open"
          );
          toggles.forEach((other) => {
            if (other !== toggle) {
              other.dataset.dropdownToggle = "closed";
              other.setAttribute("aria-expanded", "false");
              const otherDd = other.nextElementSibling as HTMLElement;
              if (otherDd) otherDd.setAttribute("aria-hidden", "true");
            }
          });
          if (anyOpen) {
            setTimeout(() => {
              toggle.dataset.dropdownToggle = "open";
              toggle.setAttribute("aria-expanded", "true");
              dd.setAttribute("aria-hidden", "false");
            }, 20);
          } else {
            toggle.dataset.dropdownToggle = "open";
            toggle.setAttribute("aria-expanded", "true");
            dd.setAttribute("aria-hidden", "false");
          }
        };

        const leaveHandler = () => {
          toggle.dataset.dropdownToggle = "closed";
          toggle.setAttribute("aria-expanded", "false");
          dd.setAttribute("aria-hidden", "true");
        };

        toggle.addEventListener("mouseenter", enterHandler);
        dd.addEventListener("mouseleave", leaveHandler);

        toggle.addEventListener("keydown", (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            leaveHandler();
            toggle.focus();
          }
        });

        dd.addEventListener("keydown", (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            e.preventDefault();
            leaveHandler();
            toggle.focus();
          }
        });
      });

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          toggles.forEach((toggle) => {
            toggle.dataset.dropdownToggle = "closed";
            toggle.setAttribute("aria-expanded", "false");
            const dd = toggle.nextElementSibling as HTMLElement;
            if (dd) dd.setAttribute("aria-hidden", "true");
          });
        });
      });

      const docClickHandler = (e: MouseEvent) => {
        const inside = toggles.some((toggle) => {
          const dd = toggle.nextElementSibling;
          return (
            toggle.contains(e.target as Node) ||
            (dd && dd.contains(e.target as Node))
          );
        });
        if (!inside) {
          toggles.forEach((toggle) => {
            toggle.dataset.dropdownToggle = "closed";
            toggle.setAttribute("aria-expanded", "false");
            const dd = toggle.nextElementSibling as HTMLElement;
            if (dd) dd.setAttribute("aria-hidden", "true");
          });
        }
      };

      document.addEventListener("click", docClickHandler);
    }

    initNavigation();

    const debouncedInit = debounce(() => {
      initRef.current.lastMode = null;
      initNavigation();
    }, 200);

    window.addEventListener("resize", debouncedInit);

    const onScroll = () => {
      if (!transparent || window.scrollY > 100) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    function handleBtnHover(event: MouseEvent) {
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const mx = event.clientX;
      const my = event.clientY;
      const offsetXFromLeft = ((mx - rect.left) / w) * 100;
      const offsetYFromTop = ((my - rect.top) / h) * 100;
      const cx = rect.left + w / 2;
      let offsetXFromCenter = ((mx - cx) / (w / 2)) * 50;
      offsetXFromCenter = Math.abs(offsetXFromCenter);
      const circle = button.querySelector(".btn__circle") as HTMLElement;
      if (circle) {
        circle.style.left = `${offsetXFromLeft.toFixed(1)}%`;
        circle.style.top = `${offsetYFromTop.toFixed(1)}%`;
        circle.style.width = `${115 + parseFloat(offsetXFromCenter.toFixed(1)) * 2}%`;
      }
    }

    const btnHovers = document.querySelectorAll("[data-btn-hover]");
    btnHovers.forEach((btn) => {
      btn.addEventListener("mouseenter", handleBtnHover as EventListener);
      btn.addEventListener("mouseleave", handleBtnHover as EventListener);
    });

    return () => {
      window.removeEventListener("resize", debouncedInit);
      window.removeEventListener("scroll", onScroll);
      btnHovers.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleBtnHover as EventListener);
        btn.removeEventListener("mouseleave", handleBtnHover as EventListener);
      });
    };
  }, []);

  return (
    <nav
      ref={navRef}
      data-menu-status="closed"
      className={transparent ? "nav" : "nav nav--scrolled"}
    >
      <div className="nav-container">
        <div className="nav-bg" />
        <div className="nav-inner">
          {/* Logo */}
          <a href="/" className="nav-logo">
            <Image
              src="/LogoTeLoResuelvoPNG (1).webp"
              alt="Te Lo Resuelvo Viajes"
              width={48}
              height={48}
              className="nav-logo__img"
              priority
              loading="eager"
            />
          </a>

          {/* Center links */}
          <div className="nav-center">
            <ul className="nav-center__list">
              {/* Home */}
              <li>
                <a href="/" className="nav-link">
                  <span className="nav-link__label">Home</span>
                </a>
              </li>
              {/* Dropdown: Destinos */}
              <li>
                <button data-dropdown-toggle="" className="nav-link">
                  <span className="nav-link__label">Ofertas</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 17 10"
                    fill="none"
                    className="nav-link__dropdown-icon"
                  >
                    <path
                      d="M1.5 1.5L8.5 8.5L15.5 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="nav-dropdown">
                  <div className="nav-dropdown__overflow">
                    <div className="nav-dropdown__overflow-inner">
                      <div className="nav-container">
                        <ul className="nav-dropdown__content">
                          {[
                            { label: "Lima", img: "/slide-peru-mask.jpg" },
                            { label: "Bogotá", img: "/slide-bogota-mask.jpg" },
                            { label: "Guayaquil", img: "/slide-ecuador-mask.jpg" },
                            { label: "Buenos Aires", img: "/slide-salvador-mask.jpg" },
                          ].map((item) => (
                            <li key={item.label} className="nav-dropdown__content-li">
                              <a href="https://wa.me/393514915445?text=Hola%20Te%20Lo%20Resuelvo%2C%20vi%20la%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20vuelo.%20%C2%BFMe%20podr%C3%ADan%20dar%20precios%20y%20disponibilidad%3F" target="_blank" rel="noopener noreferrer" className="nav-dropdown__link">
                                <div className="nav-dropdown__link-bg">
                                  <img src={item.img} alt="" className="nav-dropdown__img" />
                                  <div className="nav-dropdown__img-overlay" />
                                </div>
                                <div className="nav-dropdown__link-inner">
                                  <span className="nav-dropdown__link-label">{item.label}</span>
                                  <div className="nav-dropdown__link-bubble">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className="icon">
                                      <path d="M9.33398 12.6666L14.0007 7.99992L9.33398 3.33325" stroke="currentColor" strokeMiterlimit="10" />
                                      <path d="M14.0007 8H1.33398" stroke="currentColor" strokeMiterlimit="10" />
                                    </svg>
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Dropdown: Servicios */}
              <li>
                <button data-dropdown-toggle="" className="nav-link">
                  <span className="nav-link__label">Servicios</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 17 10"
                    fill="none"
                    className="nav-link__dropdown-icon"
                  >
                    <path
                      d="M1.5 1.5L8.5 8.5L15.5 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="nav-dropdown">
                  <div className="nav-dropdown__overflow">
                    <div className="nav-dropdown__overflow-inner">
                      <div className="nav-container">
                        <ul className="nav-dropdown__content">
                          {[
                            { label: "Vuelos", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=jpg&q=60&w=800&auto=format&fit=crop" },
                            { label: "Asesoría Migratoria", img: "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?fm=jpg&q=60&w=800&auto=format&fit=crop" },
                            { label: "Grupo VIP", img: "https://images.unsplash.com/photo-1540339832862-474599807836?fm=jpg&q=60&w=800&auto=format&fit=crop" },
                          ].map((item) => (
                            <li key={item.label} className="nav-dropdown__content-li">
                              <a href="https://wa.me/393514915445?text=Hola%20Te%20Lo%20Resuelvo%2C%20vi%20la%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20vuelo.%20%C2%BFMe%20podr%C3%ADan%20dar%20precios%20y%20disponibilidad%3F" target="_blank" rel="noopener noreferrer" className="nav-dropdown__link">
                                <div className="nav-dropdown__link-bg">
                                  <img src={item.img} alt="" className="nav-dropdown__img" />
                                  <div className="nav-dropdown__img-overlay" />
                                </div>
                                <div className="nav-dropdown__link-inner">
                                  <span className="nav-dropdown__link-label">{item.label}</span>
                                  <div className="nav-dropdown__link-bubble">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className="icon">
                                      <path d="M9.33398 12.6666L14.0007 7.99992L9.33398 3.33325" stroke="currentColor" strokeMiterlimit="10" />
                                      <path d="M14.0007 8H1.33398" stroke="currentColor" strokeMiterlimit="10" />
                                    </svg>
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Contacto */}
              <li>
                <a href="/contacto" className="nav-link">
                  <span className="nav-link__label">Contacto</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right side */}
          <div className="nav-end">
            <a
              href="https://wa.me/393514915445?text=Hola%20Te%20Lo%20Resuelvo%2C%20vi%20la%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20vuelo."
              target="_blank"
              rel="noopener noreferrer"
              data-btn-hover
              className="btn is--nav"
            >
              <div className="btn__bg" />
              <div className="btn__circle-wrap">
                <div className="btn__circle">
                  <div className="before__100" />
                </div>
              </div>
              <div className="btn__text">
                <p className="btn-text-p">Cotizar Vuelo</p>
              </div>
            </a>
            <button data-menu-button="" aria-label="toggle menu" className="menu-button">
              <div className="menu-button__line" />
              <div className="menu-button__line" />
            </button>
          </div>
        </div>
      </div>
      <div className="page-bg" />
    </nav>
  );
}
