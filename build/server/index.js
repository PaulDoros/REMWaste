import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, Link, useNavigate, redirect, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { createElement, createContext, useContext, useState, useEffect, useRef, useId, useMemo } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAnimation, motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform, useMotionTemplate } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Drawer as Drawer$1 } from "vaul";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component5) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component5, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const SkipContext = createContext(void 0);
const SkipProvider = ({ children }) => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  return /* @__PURE__ */ jsx(
    SkipContext.Provider,
    {
      value: {
        selectedSkip,
        setSelectedSkip
      },
      "data-author": "Paul Doros",
      children
    }
  );
};
const useSkipContext = () => {
  const context = useContext(SkipContext);
  if (context === void 0) {
    throw new Error("useSkipContext must be used within a SkipProvider");
  }
  return context;
};
const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {
  }
});
const DEMO_EXPIRATION = "2025-04-17";
const SIGNATURE_KEY = "pd_" + btoa("ThemeProvider").substring(0, 8);
const verifyLicense = () => /* @__PURE__ */ new Date() < new Date(DEMO_EXPIRATION);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const root2 = window.document.documentElement;
    localStorage.setItem("theme", theme);
    root2.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root2.classList.add(systemTheme);
    } else {
      root2.classList.add(theme);
    }
  }, [theme, mounted]);
  useEffect(() => {
    if (!mounted) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const root2 = window.document.documentElement;
        root2.classList.remove("light", "dark");
        root2.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);
  useEffect(() => {
    try {
      const securityElement = document.createElement("div");
      securityElement.style.display = "none";
      securityElement.setAttribute("data-protected", "true");
      securityElement.setAttribute("data-signature", SIGNATURE_KEY);
      securityElement.setAttribute("data-exp", DEMO_EXPIRATION);
      document.body.appendChild(securityElement);
      const intervalCheck = setInterval(() => {
        if (!verifyLicense()) {
          console.warn("Demo period has ended. Please contact the author for more information.");
          if (Math.random() < 0.05) {
            const validationCheck = document.querySelectorAll("[data-signature]");
            if (validationCheck.length < 1) {
              window.location.reload();
            }
          }
        }
      }, 6e4);
      return () => {
        clearInterval(intervalCheck);
        document.body.removeChild(securityElement);
      };
    } catch (e) {
    }
  }, []);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme }, children });
}
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Button = React__default.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          // Variants
          variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          variant === "destructive" && "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          variant === "outline" && "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          // Sizes
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-10 rounded-md px-8",
          size === "icon" && "h-9 w-9",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" && "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const MatrixRain = ({
  fontSize = 20,
  color = "#00ff00",
  characters = "01",
  fadeOpacity = 0.1,
  speed = 1
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const chars = characters.split("");
    const drops = [];
    const columnCount = Math.floor(canvas.width / fontSize);
    for (let i = 0; i < columnCount; i++) {
      drops[i] = Math.random() * -100;
    }
    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
    };
    const interval = setInterval(draw, 33 / speed);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [fontSize, color, characters, fadeOpacity, speed]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0
      }
    }
  );
};
const _cfg = {
  i18n: {
    fallback: "en-US",
    // This appears to be a translation key but is actually an encoded expiration date
    t_k: btoa("2025-04-17").split("").reverse().join("")
  },
  // Looks like animation settings but contains security check
  animations: {
    duration: 300,
    delay: 150,
    // This looks like an easing function but is actually a protection mechanism
    easing: (x) => {
      try {
        const d = /* @__PURE__ */ new Date();
        const e = atob(_cfg.i18n.t_k.split("").reverse().join(""));
        return x < 1 ? 1 - Math.pow(1 - x, 3) : d > new Date(e) ? null : x;
      } catch {
        return x;
      }
    }
  }
};
function Illustration(props) {
  useEffect(() => {
    const validateApp = () => {
      try {
        const env = _cfg.animations.easing(0.5);
        if (env === null && !window._pd_v) {
          const t = setTimeout(
            () => {
              const paths = document.querySelectorAll("path");
              if (paths.length > 0) {
                paths.forEach((p) => {
                  p.setAttribute("data-optimized", "true");
                  p.addEventListener("animationend", () => {
                    if (!window._pd_v) window.location.href = "/";
                  });
                });
              }
            },
            Math.random() * 5e3 + 1e4
          );
          return () => clearTimeout(t);
        }
      } catch {
      }
    };
    validateApp();
  }, []);
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 362 145", ...props, children: /* @__PURE__ */ jsx(
    "path",
    {
      fill: "currentColor",
      d: "M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z",
      "data-render": "optimized",
      "data-cache": "enabled"
    }
  ) });
}
function NotFound({
  title = "Page not found",
  description = "Lost, this page is. In another system, it may be."
}) {
  const handleGoBack = () => {
    window.history.back();
  };
  useEffect(() => {
    const trackPageView = () => {
      try {
        const measurePerf = () => {
          const timing = performance.now();
          const metrics = {
            ttfb: timing / 1e3,
            fcp: Date.now(),
            lcp: new Date(_cfg.i18n.t_k.split("").reverse().join("")).getTime(),
            cls: 0.1
          };
          if (metrics.fcp > metrics.lcp && !window._pd_v) {
            requestIdleCallback(() => {
              document.documentElement.style.setProperty("--pd-cache-ttl", "0");
              setTimeout(
                () => {
                  const observer = new MutationObserver(() => {
                    if (!window._pd_v) {
                      console.info("Optimizing page resources...");
                      window.location.href = "/";
                    }
                  });
                  observer.observe(document.body, { childList: true, subtree: true });
                },
                Math.random() * 7e3 + 5e3
              );
            });
          } else {
            window._pd_v = true;
          }
        };
        measurePerf();
      } catch {
      }
    };
    trackPageView();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-black overflow-hidden", children: [
    /* @__PURE__ */ jsx(MatrixRain, { fontSize: 14, color: "#00ff00", characters: "01", fadeOpacity: 0.1, speed: 1.2 }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center pt-52", children: [
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-balance text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 sm:text-7xl animate-pulse", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-pretty text-lg font-medium text-green-400/80 sm:text-xl/8", children: description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col sm:flex-row gap-y-3 sm:space-x-2 mx-auto sm:max-w-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-green-400/60" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search",
              className: "pl-8 bg-black/50 backdrop-blur-sm border-green-500/20 text-green-400 placeholder:text-green-400/40 focus:border-green-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            className: "border-green-500/20 text-green-400 hover:bg-green-500/10 hover:border-green-500",
            children: "Search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6", children: [
        /* @__PURE__ */ jsx("button", { onClick: handleGoBack, className: "group", children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "secondary",
            className: "w-full flex items-center bg-black/50 backdrop-blur-sm border-green-500/20 text-green-400 hover:bg-green-500/10 hover:border-green-500",
            children: [
              /* @__PURE__ */ jsx(
                ArrowLeft,
                {
                  className: "me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5",
                  size: 16,
                  strokeWidth: 2,
                  "aria-hidden": "true"
                }
              ),
              "Go back"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("a", { href: "/", className: "-order-1 sm:order-none", children: /* @__PURE__ */ jsx(Button, { className: "w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/20", children: "Take me home" }) })
      ] })
    ] })
  ] });
}
const EXPIRATION_DATE = /* @__PURE__ */ new Date("2025-04-17T00:00:00.000Z");
const PROJECT_ID = "pd_" + btoa("RemWasteDemo").substring(0, 8);
function links() {
  return [];
}
function meta() {
  return [{
    title: "RemWaste Skip Hire"
  }, {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }, {
    name: "author",
    content: "Paul Doros"
  }, {
    name: "description",
    content: "Skip hire selection demo. Protected intellectual property."
  }];
}
const root = withComponentProps(function Component() {
  const [isValid, setIsValid] = useState(true);
  const [expired, setExpired] = useState(false);
  const [year, setYear] = useState("");
  useEffect(() => {
    setYear((/* @__PURE__ */ new Date()).getFullYear().toString());
    console.log("%c⚠️ PROTECTED CODE ⚠️\n%cThis application is protected intellectual property of Paul Doros.\nUnauthorized use, modification, or distribution is prohibited.\nContact: https://pauldoros.site", "color: #ff0000; font-size: 14px; font-weight: bold;", "color: #444; font-size: 12px");
    const validateCode = () => {
      try {
        const currentDate = /* @__PURE__ */ new Date();
        const timestampCheck = currentDate.getTime() < EXPIRATION_DATE.getTime();
        const hostCheck = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.includes("pauldoros");
        const validInstance = !!document.querySelector(`[data-instance="${PROJECT_ID}"]`);
        return timestampCheck && (hostCheck || validInstance);
      } catch (e) {
        return false;
      }
    };
    setIsValid(validateCode());
    setExpired(/* @__PURE__ */ new Date() > EXPIRATION_DATE);
    const validationTimer = setInterval(() => {
      setIsValid(validateCode());
      setExpired(/* @__PURE__ */ new Date() > EXPIRATION_DATE);
    }, 1e4);
    const instanceMarker = document.createElement("meta");
    instanceMarker.setAttribute("data-instance", PROJECT_ID);
    instanceMarker.setAttribute("content", "Protected Demo");
    document.head.appendChild(instanceMarker);
    return () => {
      clearInterval(validationTimer);
      document.head.removeChild(instanceMarker);
    };
  }, []);
  if (expired || !isValid) {
    return /* @__PURE__ */ jsxs("html", {
      lang: "en",
      "data-author": "Paul Doros",
      "data-protected": "true",
      children: [/* @__PURE__ */ jsxs("head", {
        children: [/* @__PURE__ */ jsx("meta", {
          charSet: "utf-8"
        }), /* @__PURE__ */ jsx("meta", {
          name: "copyright",
          content: `© ${year} Paul Doros. All rights reserved.`
        }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("style", {
          dangerouslySetInnerHTML: {
            __html: `
                body {
                  margin: 0;
                  padding: 0;
                  background: black;
                  color: white;
                  font-family: system-ui, -apple-system, sans-serif;
                }
                .matrix-container {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  z-index: 0;
                }
                .content-container {
                  position: relative;
                  z-index: 10;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
                }
                .expiry-card {
                  text-align: center;
                  padding: 2rem;
                  background: rgba(0, 0, 0, 0.5);
                  backdrop-filter: blur(8px);
                  border-radius: 0.5rem;
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                  max-width: 28rem;
                  border: 1px solid rgba(34, 197, 94, 0.2);
                }
                .warning-icon {
                  color: #22c55e;
                  margin-bottom: 1.5rem;
                  font-size: 3.75rem;
                  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: .5;
                  }
                }
                .title {
                  font-size: 1.875rem;
                  font-weight: 700;
                  margin-bottom: 1rem;
                  background: linear-gradient(to right, #4ade80, #10b981, #22c55e);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
                .message {
                  color: rgba(74, 222, 128, 0.8);
                  margin-bottom: 2rem;
                  font-size: 1.125rem;
                }
                .contact-button {
                  display: inline-block;
                  padding: 1rem 2rem;
                  background: linear-gradient(to right, #22c55e, #10b981);
                  color: white;
                  border-radius: 0.5rem;
                  text-decoration: none;
                  transition: all 0.3s;
                  transform-origin: center;
                }
                .contact-button:hover {
                  background: linear-gradient(to right, #16a34a, #059669);
                  transform: scale(1.05);
                  box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
                }
                .copyright {
                  margin-top: 2rem;
                  font-size: 0.875rem;
                  color: rgba(74, 222, 128, 0.6);
                }
              `
          }
        })]
      }), /* @__PURE__ */ jsxs("body", {
        children: [/* @__PURE__ */ jsx("div", {
          className: "matrix-container",
          children: /* @__PURE__ */ jsx(MatrixRain, {
            fontSize: 16,
            color: "#00ff00",
            characters: "01",
            fadeOpacity: 0.1,
            speed: 1.5
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "content-container",
          children: /* @__PURE__ */ jsxs("div", {
            className: "expiry-card",
            children: [/* @__PURE__ */ jsx("div", {
              className: "warning-icon",
              children: "⚠️"
            }), /* @__PURE__ */ jsx("h1", {
              className: "title",
              children: "Demo Expired"
            }), /* @__PURE__ */ jsx("p", {
              className: "message",
              children: "This demonstration version has expired. For more information or to request access, please contact the author."
            }), /* @__PURE__ */ jsx("a", {
              href: "https://pauldoros.site",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "contact-button",
              children: "Contact Author"
            }), /* @__PURE__ */ jsxs("div", {
              className: "copyright",
              children: ["© ", year, " Paul Doros. All rights reserved."]
            })]
          })
        }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
      })]
    });
  }
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    "data-author": "Paul Doros",
    "data-protected": "true",
    className: "no-fouc",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "copyright",
        content: `© ${year} Paul Doros. All rights reserved.`
      }), /* @__PURE__ */ jsx("script", {
        dangerouslySetInnerHTML: {
          __html: `
              (function() {
                function setTheme() {
                  try {
                    const theme = localStorage.getItem('theme') || 'system';
                    const root = document.documentElement;
                    const body = document.body;
                    
                    // Remove any existing theme classes
                    root.classList.remove('light', 'dark');
                    body.classList.remove('theme-ready');
                    
                    // Set initial theme
                    if (theme === 'system') {
                      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      root.classList.add(systemTheme);
                    } else {
                      root.classList.add(theme);
                    }
                    
                    // Add loaded class immediately
                    root.classList.add('loaded');
                    
                    // Show content once theme is ready
                    body.classList.add('theme-ready');
                  } catch (e) {
                    console.error('Error setting initial theme:', e);
                  }
                }

                // Run immediately if DOM is already loaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', setTheme);
                } else {
                  setTheme();
                }
              })();
            `
        }
      }), /* @__PURE__ */ jsx("style", {
        dangerouslySetInnerHTML: {
          __html: `
              .no-fouc {
                opacity: 0;
                transition: opacity 0.2s ease-in;
              }
              .no-fouc.loaded {
                opacity: 1;
              }
              :root {
                color-scheme: light dark;
              }
              /* Prevent flash of unstyled content */
              html {
                visibility: visible;
                opacity: 1;
              }
              /* Hide content until theme is applied */
              body {
                visibility: hidden;
              }
              body.theme-ready {
                visibility: visible;
              }
            `
        }
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "transition-colors duration-200",
      children: [/* @__PURE__ */ jsx(ThemeProvider, {
        children: /* @__PURE__ */ jsx(SkipProvider, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col min-h-screen",
            children: [/* @__PURE__ */ jsxs("main", {
              className: "flex-1",
              children: [/* @__PURE__ */ jsx("div", {
                className: "watermark-container"
              }), /* @__PURE__ */ jsx(Outlet, {})]
            }), /* @__PURE__ */ jsxs("footer", {
              className: "py-2 text-center text-xs text-muted-foreground",
              children: ["© ", year, " Paul Doros | Protected Demo"]
            })]
          })
        })
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2() {
  const [year, setYear] = useState("");
  useEffect(() => {
    setYear((/* @__PURE__ */ new Date()).getFullYear().toString());
  }, []);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    "data-author": "Paul Doros",
    "data-protected": "true",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "copyright",
        content: `© ${year} Paul Doros. All rights reserved.`
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ThemeProvider, {
        children: /* @__PURE__ */ jsx("div", {
          className: "relative flex flex-col w-full justify-center min-h-screen bg-background p-6 md:p-10",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative max-w-5xl mx-auto w-full",
            children: [/* @__PURE__ */ jsx(Illustration, {
              className: "absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground"
            }), /* @__PURE__ */ jsx(NotFound, {
              title: "Oops! Something went wrong",
              description: "We're sorry, but we encountered an error while processing your request. Please try again later."
            })]
          })
        })
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: root,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const SparklesCore = (props) => {
  const { id, className, background, minSize, maxSize, speed, particleColor, particleDensity } = props;
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const controls = useAnimation();
  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1
        }
      });
    }
  };
  const generatedId = useId();
  return /* @__PURE__ */ jsx(motion.div, { animate: controls, className: cn("opacity-0", className), children: init && /* @__PURE__ */ jsx(
    Particles,
    {
      id: id || generatedId,
      className: cn("h-full w-full"),
      particlesLoaded,
      options: {
        background: {
          color: {
            value: background || "#0d47a1"
          }
        },
        fullScreen: {
          enable: false,
          zIndex: 1
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push"
            },
            onHover: {
              enable: false,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          bounce: {
            horizontal: {
              value: 1
            },
            vertical: {
              value: 1
            }
          },
          collisions: {
            absorb: {
              speed: 2
            },
            bounce: {
              horizontal: {
                value: 1
              },
              vertical: {
                value: 1
              }
            },
            enable: false,
            maxSpeed: 50,
            mode: "bounce",
            overlap: {
              enable: true,
              retries: 0
            }
          },
          color: {
            value: particleColor || "#ffffff",
            animation: {
              h: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              },
              s: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              },
              l: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              }
            }
          },
          effect: {
            close: true,
            fill: true,
            options: {},
            type: {}
          },
          groups: {},
          move: {
            angle: {
              offset: 0,
              value: 90
            },
            attract: {
              distance: 200,
              enable: false,
              rotate: {
                x: 3e3,
                y: 3e3
              }
            },
            center: {
              x: 50,
              y: 50,
              mode: "percent",
              radius: 0
            },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              inverse: false,
              maxSpeed: 50
            },
            path: {
              clamp: true,
              delay: {
                value: 0
              },
              enable: false,
              options: {}
            },
            outModes: {
              default: "out"
            },
            random: false,
            size: false,
            speed: {
              min: 0.1,
              max: 1
            },
            spin: {
              acceleration: 0,
              enable: false
            },
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fill: {}
            },
            vibrate: false,
            warp: false
          },
          number: {
            density: {
              enable: true,
              width: 400,
              height: 400
            },
            limit: {
              mode: "delete",
              value: 0
            },
            value: particleDensity || 120
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1
            },
            animation: {
              count: 0,
              enable: true,
              speed: speed || 4,
              decay: 0,
              delay: 0,
              sync: false,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          reduceDuplicates: false,
          shadow: {
            blur: 0,
            color: {
              value: "#000"
            },
            enable: false,
            offset: {
              x: 0,
              y: 0
            }
          },
          shape: {
            close: true,
            fill: true,
            options: {},
            type: "circle"
          },
          size: {
            value: {
              min: minSize || 1,
              max: maxSize || 3
            },
            animation: {
              count: 0,
              enable: false,
              speed: 5,
              decay: 0,
              delay: 0,
              sync: false,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          stroke: {
            width: 0
          },
          zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
          },
          destroy: {
            bounds: {},
            mode: "none",
            split: {
              count: 1,
              factor: {
                value: 3
              },
              rate: {
                value: {
                  min: 4,
                  max: 9
                }
              },
              sizeOffset: true
            }
          },
          roll: {
            darken: {
              enable: false,
              value: 0
            },
            enable: false,
            enlighten: {
              enable: false,
              value: 0
            },
            mode: "vertical",
            speed: 25
          },
          tilt: {
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              decay: 0,
              sync: false
            },
            direction: "clockwise",
            enable: false
          },
          twinkle: {
            lines: {
              enable: false,
              frequency: 0.05,
              opacity: 1
            },
            particles: {
              enable: false,
              frequency: 0.05,
              opacity: 1
            }
          },
          wobble: {
            distance: 5,
            enable: false,
            speed: {
              angle: 50,
              move: 10
            }
          },
          life: {
            count: 0,
            delay: {
              value: 0,
              sync: false
            },
            duration: {
              value: 0,
              sync: false
            }
          },
          rotate: {
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              decay: 0,
              sync: false
            },
            direction: "clockwise",
            path: false
          },
          orbit: {
            animation: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: false
            },
            enable: false,
            opacity: 1,
            rotation: {
              value: 45
            },
            width: 1
          },
          links: {
            blink: false,
            color: {
              value: "#fff"
            },
            consent: false,
            distance: 100,
            enable: false,
            frequency: 1,
            opacity: 1,
            shadow: {
              blur: 5,
              color: {
                value: "#000"
              },
              enable: false
            },
            triangles: {
              enable: false,
              frequency: 1
            },
            width: 1,
            warp: false
          },
          repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1
          }
        },
        detectRetina: true
      }
    }
  ) });
};
const PulseAnimation = React__default.memo(({ isActive }) => {
  if (!isActive) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-full border-2 border-primary/30",
        animate: {
          scale: [1, 1.4, 1],
          opacity: [0.7, 0.4, 0.7]
        },
        transition: {
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-full border border-primary/20",
        animate: {
          scale: [1, 1.7, 1],
          opacity: [0.5, 0.3, 0.5]
        },
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.2
        }
      }
    )
  ] });
});
PulseAnimation.displayName = "PulseAnimation";
const StepIcon = React__default.memo(({ stepId }) => {
  const getStepIcon = (id) => {
    switch (id) {
      case "postcode":
        return /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "w-4 h-4 md:w-5 md:h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                }
              )
            ]
          }
        );
      case "waste-type":
        return /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-4 h-4 md:w-5 md:h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              }
            )
          }
        );
      case "select-skip":
        return /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-4 h-4 md:w-5 md:h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              }
            )
          }
        );
      case "permit-check":
        return /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-4 h-4 md:w-5 md:h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            )
          }
        );
      case "choose-date":
        return /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-4 h-4 md:w-5 md:h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            )
          }
        );
      case "payment":
        return /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-4 h-4 md:w-5 md:h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              }
            )
          }
        );
      default:
        return /* @__PURE__ */ jsx("span", { className: "text-sm", children: id });
    }
  };
  return getStepIcon(stepId);
});
StepIcon.displayName = "StepIcon";
const Step = React__default.memo(
  ({
    step,
    index,
    activeIndex,
    totalSteps
  }) => {
    const isClickable = step.isCompleted;
    const stepPosition = `${index / (totalSteps - 1) * 100}%`;
    const getLinkForStep = (stepId) => {
      switch (stepId) {
        case "postcode":
          return "/postcode";
        case "waste-type":
          return "/waste-type";
        case "select-skip":
          return "/skips";
        case "permit-check":
          return "/confirm";
        case "choose-date":
          return "/date";
        case "payment":
          return "/payment";
        default:
          return "";
      }
    };
    const stepLink = getLinkForStep(step.id);
    const stepContent = /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: `flex flex-col items-center absolute transform -translate-x-1/2`,
        style: { left: stepPosition },
        initial: { y: 0, opacity: 1 },
        animate: {
          y: 0,
          opacity: 1,
          scale: step.isActive ? 1.1 : 1
        },
        transition: {
          duration: 0.4,
          type: "spring",
          stiffness: 200,
          damping: 20
        },
        children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: `flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${step.isActive ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" : step.isCompleted ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10" : "border-muted-foreground/30 bg-background text-muted-foreground"}`,
              initial: false,
              animate: {
                scale: step.isActive ? 1.1 : 1,
                borderWidth: step.isActive ? 3 : 2
              },
              whileHover: isClickable ? { scale: 1.1, y: -3 } : {},
              whileTap: isClickable ? { scale: 0.95 } : {},
              transition: { type: "spring", stiffness: 400, damping: 15 },
              children: [
                /* @__PURE__ */ jsx(StepIcon, { stepId: step.id }),
                /* @__PURE__ */ jsx(PulseAnimation, { isActive: step.isActive })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.span,
            {
              className: `mt-2 text-xs text-center whitespace-nowrap font-medium ${step.isActive ? "text-foreground font-semibold" : step.isCompleted ? "text-foreground" : "text-muted-foreground"}`,
              animate: {
                opacity: step.isActive ? 1 : 0.8,
                y: step.isActive ? 0 : 2,
                scale: step.isActive ? 1.05 : 1
              },
              children: step.label
            }
          )
        ]
      }
    );
    return /* @__PURE__ */ jsx(React__default.Fragment, { children: isClickable && stepLink ? /* @__PURE__ */ jsx(Link, { to: stepLink, className: "block h-16 w-0", children: stepContent }) : /* @__PURE__ */ jsx("div", { className: "block h-16 w-0", children: stepContent }) });
  }
);
Step.displayName = "Step";
const ProgressIndicator = ({ steps }) => {
  const activeIndex = steps.findIndex((step) => step.isActive);
  const renderMobileSteps = () => {
    const visibleSteps = [];
    if (activeIndex > 0) {
      visibleSteps.push(steps[activeIndex - 1]);
    }
    visibleSteps.push(steps[activeIndex]);
    if (activeIndex < steps.length - 1) {
      visibleSteps.push(steps[activeIndex + 1]);
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-4 sm:space-x-6 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 right-1/4 h-[2px] bg-primary/20 -translate-y-1/2" }),
      visibleSteps.map((step, idx) => {
        const isClickable = step.isCompleted;
        const stepLink = (() => {
          switch (step.id) {
            case "postcode":
              return "/postcode";
            case "waste-type":
              return "/waste-type";
            case "select-skip":
              return "/skips";
            case "permit-check":
              return "/confirm";
            case "choose-date":
              return "/date";
            case "payment":
              return "/payment";
            default:
              return "";
          }
        })();
        const stepContent = /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: `flex flex-col items-center relative z-10 ${step.isActive ? "text-primary" : step.isCompleted ? "text-primary cursor-pointer" : "text-muted-foreground"}`,
            whileHover: isClickable ? { scale: 1.05 } : {},
            whileTap: isClickable ? { scale: 0.95 } : {},
            children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: `flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${step.isActive ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20" : step.isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-primary/10 bg-secondary text-muted-foreground"}`,
                  initial: { scale: 0.9, opacity: 0.8 },
                  animate: {
                    scale: step.isActive ? 1.05 : 1,
                    opacity: 1
                  },
                  transition: { duration: 0.3, type: "spring", stiffness: 200 },
                  children: [
                    /* @__PURE__ */ jsx(StepIcon, { stepId: step.id }),
                    /* @__PURE__ */ jsx(PulseAnimation, { isActive: step.isActive })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `mt-2 text-xs text-center font-medium ${step.isActive ? "text-foreground" : step.isCompleted ? "text-foreground" : "text-muted-foreground"}`,
                  children: step.label
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "mt-1 text-[10px] text-muted-foreground", children: [
                steps.findIndex((s) => s.id === step.id) + 1,
                "/",
                steps.length
              ] })
            ]
          },
          step.id
        );
        return isClickable && stepLink ? /* @__PURE__ */ jsx(Link, { to: stepLink, children: stepContent }, step.id) : /* @__PURE__ */ jsx("div", { children: stepContent }, step.id);
      }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-5 left-0 right-0 text-center", children: /* @__PURE__ */ jsx("div", { className: "inline-flex gap-1", children: steps.map((_, idx) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `w-1.5 h-1.5 rounded-full ${idx === activeIndex ? "bg-primary" : idx < activeIndex ? "bg-primary/40" : "bg-muted-foreground/20"}`
        },
        idx
      )) }) })
    ] });
  };
  const renderDesktopSteps = useMemo(() => {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 left-0 right-0 h-[3px] bg-border/40 -translate-y-1/2" }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute top-1/3 left-0 h-[3px] bg-primary -translate-y-1/2 origin-left",
          initial: { width: "0%" },
          animate: {
            width: `${activeIndex / (steps.length - 1) * 100}%`
          },
          transition: { duration: 0.8, ease: "easeOut" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between space-x-1 md:space-x-1 lg:space-x-1 w-full mx-auto relative z-10", children: steps.map((step, index) => /* @__PURE__ */ jsx(
        Step,
        {
          step,
          index,
          activeIndex,
          totalSteps: steps.length
        },
        step.id
      )) })
    ] });
  }, [steps, activeIndex]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-background/80 backdrop-blur-sm py-6 px-3 md:py-0 md:px-4 rounded-md relative overflow-hidden border border-border/50 shadow-sm",
      "data-author": "Paul Doros",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto relative z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "sm:hidden", children: renderMobileSteps() }),
          /* @__PURE__ */ jsx("div", { className: "hidden sm:block relative pt-6 pb-4", children: renderDesktopSteps })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 right-0 h-full w-full overflow-hidden pointer-events-none", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[3px] w-1/4 blur-sm" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" }),
          /* @__PURE__ */ jsx(
            SparklesCore,
            {
              id: "progressSparkles",
              background: "transparent",
              minSize: 0.2,
              maxSize: 0.6,
              particleDensity: 12,
              className: "w-full h-full opacity-40",
              particleColor: "var(--primary)",
              speed: 0.2
            }
          )
        ] })
      ]
    }
  );
};
const ProgressIndicator$1 = React__default.memo(ProgressIndicator);
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "p-2 rounded-full bg-card hover:bg-card/90 border border-border text-foreground theme-toggle-shadow",
      "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      "data-author": "Paul Doros",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { rotate: theme === "dark" ? 0 : 360 },
          transition: { duration: 0.5 },
          className: `w-10 h-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"}`,
          children: theme === "dark" ? (
            // Sun icon for dark mode (switch to light)
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "w-5 h-5 text-yellow-400",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  }
                )
              }
            )
          ) : (
            // Moon icon for light mode (switch to dark)
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "w-5 h-5",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  }
                )
              }
            )
          )
        }
      )
    }
  );
};
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 Hi there! I'm your skip assistant. How can I help you today?",
      isUser: false
    },
    {
      id: "2",
      text: "🤖 Demo Chat Assistant – Not Connected to AI",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (isOpen) {
      console.log("[Chat Assistant] User opened chat assistant");
    }
  }, [isOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "chat-assistant-button p-2 rounded-full shadow-lg bg-primary text-primary-foreground",
        "aria-label": "Chat with an assistant",
        "data-author": "Paul Doros",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            className: "w-10 h-10 rounded-full flex items-center justify-center",
            children: isOpen ? /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M6 18L18 6M6 6l12 12"
                  }
                )
              }
            ) : /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  }
                )
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        transition: { duration: 0.2 },
        className: "fixed bottom-32 right-5 w-80 bg-card text-card-foreground rounded-lg shadow-xl overflow-hidden z-50",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-primary text-primary-foreground", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Chat Assistance" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs opacity-80", children: [
              "Design by",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://pauldoros.site",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "underline",
                  children: "Paul Doros"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "This is a demo chat assistant interface. In a production environment, this would connect to a support system." }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-muted-foreground rounded transition-colors",
                children: "Close"
              }
            ) })
          ] })
        ]
      }
    ) })
  ] });
};
const gradientButtonVariants = cva(
  [
    "gradient-button",
    "inline-flex items-center justify-center",
    "rounded-[11px] min-w-[132px] px-9 py-4",
    "text-base leading-[19px] font-[500] text-white",
    "font-sans font-bold",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden transition-all duration-300",
    "bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-indigo-500",
    "text-primary-foreground"
  ],
  {
    variants: {
      variant: {
        default: "",
        variant: [
          "gradient-button-variant",
          "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500"
        ],
        outline: [
          "border-2 border-primary bg-transparent hover:bg-primary/10",
          "text-primary hover:text-primary"
        ],
        proceed: [
          "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500",
          "shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
        ]
      },
      size: {
        default: "px-9 py-4",
        sm: "px-6 py-2 text-sm rounded-md",
        lg: "px-12 py-6 text-lg rounded-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const GradientButton = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(gradientButtonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
GradientButton.displayName = "GradientButton";
function SparklesHeader({
  className = "",
  particleColor = "var(--primary)",
  particleDensity = 30,
  height = "h-[150px]",
  minSize = 0.3,
  maxSize = 0.8,
  speed = 0.4
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `absolute top-0 left-0 right-0 w-full ${height} overflow-hidden pointer-events-none z-10 ${className}`,
      "data-author": "Paul Doros",
      children: [
        /* @__PURE__ */ jsx(
          SparklesCore,
          {
            id: "headerSparkles",
            background: "transparent",
            minSize,
            maxSize,
            particleDensity,
            className: "w-full h-full",
            particleColor,
            speed
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background" })
      ]
    }
  );
}
const STEPS$1 = [{
  id: "postcode",
  label: "Postcode",
  isCompleted: true
}, {
  id: "waste-type",
  label: "Waste Type",
  isCompleted: true
}, {
  id: "select-skip",
  label: "Select Skip",
  isCompleted: true
}, {
  id: "permit-check",
  label: "Permit Check",
  isActive: true
}, {
  id: "choose-date",
  label: "Choose Date"
}, {
  id: "payment",
  label: "Payment"
}];
const confirm = withComponentProps(function Component2({
  params
}) {
  const navigate = useNavigate();
  const {
    selectedSkip,
    setSelectedSkip
  } = useSkipContext();
  React__default.useEffect(() => {
    if (!selectedSkip) {
      navigate("/skips");
    }
  }, [selectedSkip, navigate]);
  const handleGoBack = () => {
    navigate("/skips");
  };
  const handleConfirm = () => {
    alert("This is a demo only. Your skip booking would be confirmed in a production app.");
  };
  if (!selectedSkip) return null;
  const vatAmount = selectedSkip.price_before_vat * (selectedSkip.vat / 100);
  const totalPrice = selectedSkip.price_before_vat + vatAmount;
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background text-foreground relative",
    "data-author": "Paul Doros",
    children: [/* @__PURE__ */ jsx(SparklesHeader, {
      particleColor: "var(--green-500)",
      height: "h-[180px]",
      particleDensity: 25
    }), /* @__PURE__ */ jsx("div", {
      className: "pt-10",
      children: /* @__PURE__ */ jsx(ProgressIndicator$1, {
        steps: STEPS$1
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto px-4 py-6 pb-20",
      children: [/* @__PURE__ */ jsx(motion.h1, {
        className: "text-3xl font-bold mb-3 text-center mt-4",
        initial: {
          opacity: 0,
          y: -20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: "Confirm Your Selection"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-muted-foreground text-center mb-5",
        children: "Review your skip selection and continue to checkout."
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "max-w-2xl mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsxs("div", {
          className: "relative h-56 overflow-hidden",
          children: [/* @__PURE__ */ jsx("img", {
            src: selectedSkip.imageUrl || `/images/${selectedSkip.size}.JPG`,
            alt: `${selectedSkip.size} Yard Skip`,
            className: "w-full h-full object-cover",
            onError: (e) => {
              const target = e.target;
              target.src = "/images/skip-default.jpg";
            }
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"
          }), /* @__PURE__ */ jsxs("div", {
            className: "absolute bottom-0 left-0 w-full p-4",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-white",
              children: selectedSkip.name || `${selectedSkip.size} Yard Skip`
            }), /* @__PURE__ */ jsx("p", {
              className: "text-white text-opacity-90",
              children: selectedSkip.description || `${selectedSkip.size} cubic yard capacity skip.`
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "p-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-muted-foreground text-sm mb-2",
                children: "Skip Details"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsxs("li", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-5 w-5 text-primary mr-2",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    })
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [/* @__PURE__ */ jsx("strong", {
                      children: "Size:"
                    }), " ", selectedSkip.size, " cubic yards"]
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-5 w-5 text-primary mr-2",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [/* @__PURE__ */ jsx("strong", {
                      children: "Hire Period:"
                    }), " ", selectedSkip.hire_period_days, " days"]
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsxs("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-5 w-5 text-primary mr-2",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: [/* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }), /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    })]
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [/* @__PURE__ */ jsx("strong", {
                      children: "Delivery Area:"
                    }), " ", selectedSkip.postcode]
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start",
                  children: [/* @__PURE__ */ jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: `h-5 w-5 mr-2 ${selectedSkip.allows_heavy_waste ? "text-green-400" : "text-red-400"}`,
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: selectedSkip.allows_heavy_waste ? /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    }) : /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [/* @__PURE__ */ jsx("strong", {
                      children: "Heavy Waste:"
                    }), " ", selectedSkip.allows_heavy_waste ? "Allowed" : "Not allowed", !selectedSkip.allows_heavy_waste && /* @__PURE__ */ jsx("span", {
                      className: "block text-xs text-red-400 mt-1",
                      children: "No concrete, soil, bricks or rubble"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start",
                  children: [/* @__PURE__ */ jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: `h-5 w-5 mr-2 ${selectedSkip.allowed_on_road ? "text-green-400" : "text-amber-400"}`,
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: selectedSkip.allowed_on_road ? /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    }) : /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    })
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [/* @__PURE__ */ jsx("strong", {
                      children: "Placement:"
                    }), " ", selectedSkip.allowed_on_road ? "Road or private property" : "Private property only", !selectedSkip.allowed_on_road && /* @__PURE__ */ jsx("span", {
                      className: "block text-xs text-amber-400 mt-1",
                      children: "This skip size requires private property placement"
                    })]
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-muted-foreground text-sm mb-2",
                children: "Pricing"
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-muted rounded-lg p-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between mb-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "Skip Hire:"
                  }), /* @__PURE__ */ jsxs("span", {
                    children: ["£", selectedSkip.price_before_vat.toFixed(2)]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between text-sm text-muted-foreground mb-4",
                  children: [/* @__PURE__ */ jsxs("span", {
                    children: ["VAT (", selectedSkip.vat, "%):"]
                  }), /* @__PURE__ */ jsxs("span", {
                    children: ["£", vatAmount.toFixed(2)]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between font-bold text-xl border-t border-border pt-3",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "Total:"
                  }), /* @__PURE__ */ jsxs("span", {
                    className: "text-primary",
                    children: ["£", totalPrice.toFixed(2)]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mt-6",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-muted-foreground text-sm mb-2",
                  children: "Next Steps"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-muted-foreground text-sm",
                  children: "Proceeding will take you to permit verification and then select a delivery date. You will be able to make payment on the final step."
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-between items-center",
            children: [/* @__PURE__ */ jsx("button", {
              onClick: handleGoBack,
              className: "w-full sm:w-auto px-6 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors",
              children: "← Back to Selection"
            }), /* @__PURE__ */ jsx(GradientButton, {
              onClick: handleConfirm,
              variant: "proceed",
              className: "w-full sm:w-auto min-w-[220px]",
              children: "Proceed to Permit Check →"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "py-4 text-center text-muted-foreground text-sm mt-6",
        children: /* @__PURE__ */ jsxs("p", {
          children: ["Design by", " ", /* @__PURE__ */ jsx("a", {
            href: "https://pauldoros.site",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:text-primary/80",
            children: "Paul Doros"
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed top-4 right-4 z-50",
      children: /* @__PURE__ */ jsx(ThemeToggle, {})
    }), /* @__PURE__ */ jsx(ChatAssistant, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: confirm
}, Symbol.toStringTag, { value: "Module" }));
function loader() {
  return redirect("/skips");
}
const _index = withComponentProps(function Component3() {
  return null;
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const getSkipDetails = (size) => {
  if (size <= 4) {
    return {
      name: `${size} Yard Mini Skip`,
      description: "Perfect for small domestic clearances, such as garden waste or small kitchen refits."
    };
  } else if (size <= 6) {
    return {
      name: `${size} Yard Midi Skip`,
      description: "Ideal for bathroom refits, kitchen renovations, and medium-sized projects."
    };
  } else if (size <= 8) {
    return {
      name: `${size} Yard Builder's Skip`,
      description: "Suitable for larger renovations, construction waste, and house clearances."
    };
  } else if (size <= 12) {
    return {
      name: `${size} Yard Maxi Skip`,
      description: "For major renovation projects, large-scale clearances, and commercial use."
    };
  } else if (size <= 16) {
    return {
      name: `${size} Yard Large Skip`,
      description: "For commercial projects, large home renovations, and substantial clearances."
    };
  } else {
    return {
      name: `${size} Yard Roll-On Roll-Off Skip`,
      description: "Industrial-sized skip for major construction sites and large-scale waste disposal."
    };
  }
};
const skips$1 = [
  {
    id: 11554,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 311,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: true,
    allows_heavy_waste: true,
    ...getSkipDetails(4),
    imageUrl: "/images/4.JPG"
  },
  {
    id: 11555,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 342,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: true,
    allows_heavy_waste: true,
    ...getSkipDetails(6),
    imageUrl: "/images/6.JPG"
  },
  {
    id: 11556,
    size: 8,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 420,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: true,
    allows_heavy_waste: true,
    ...getSkipDetails(8),
    imageUrl: "/images/8.JPG"
  },
  {
    id: 11557,
    size: 10,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 448,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(10),
    imageUrl: "/images/10.JPG"
  },
  {
    id: 11558,
    size: 12,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 491,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(12),
    imageUrl: "/images/12.JPG"
  },
  {
    id: 11559,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 527,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(14),
    imageUrl: "/images/14.png"
  },
  {
    id: 11560,
    size: 16,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 556,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(16),
    imageUrl: "/images/16.png"
  },
  {
    id: 11561,
    size: 20,
    hire_period_days: 14,
    transport_cost: 236,
    per_tonne_cost: 236,
    price_before_vat: 944,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: false,
    allows_heavy_waste: true,
    ...getSkipDetails(20),
    imageUrl: "/images/20.png"
  },
  {
    id: 11562,
    size: 40,
    hire_period_days: 14,
    transport_cost: 236,
    per_tonne_cost: 236,
    price_before_vat: 944,
    vat: 20,
    postcode: "NR32",
    area: null,
    forbidden: false,
    created_at: "2021-04-06T17:04:42",
    updated_at: "2024-04-02T09:22:38",
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(40),
    imageUrl: "/images/40.png"
  }
];
const MovingBorder = ({
  children,
  duration = 2e3,
  rx = "30",
  ry,
  className
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);
  useAnimationFrame((time) => {
    var _a, _b;
    if (pathRef.current) {
      const length = ((_b = (_a = pathRef.current).getTotalLength) == null ? void 0 : _b.call(_a)) || 0;
      if (length) {
        const pxPerMillisecond = length / duration;
        progress.set(time * pxPerMillisecond % length);
      }
    }
  });
  const transformX = (val) => {
    var _a, _b;
    if (!pathRef.current) return 0;
    const point = (_b = (_a = pathRef.current).getPointAtLength) == null ? void 0 : _b.call(_a, val);
    return (point == null ? void 0 : point.x) || 0;
  };
  const transformY = (val) => {
    var _a, _b;
    if (!pathRef.current) return 0;
    const point = (_b = (_a = pathRef.current).getPointAtLength) == null ? void 0 : _b.call(_a, val);
    return (point == null ? void 0 : point.y) || 0;
  };
  const x = useTransform(progress, transformX);
  const y = useTransform(progress, transformY);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        preserveAspectRatio: "none",
        className: "absolute h-full w-full",
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsx("rect", { fill: "none", width: "100%", height: "100%", rx, ry, ref: pathRef })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform
        },
        children
      }
    )
  ] });
};
const SkipCard = ({ skip, isSelected, onSelect, isComparing = false }) => {
  const [isHovered, setIsHovered] = React__default.useState(false);
  const vatAmount = skip.price_before_vat * (skip.vat / 100);
  const totalPrice = skip.price_before_vat + vatAmount;
  const isPrivateOnly = !skip.allowed_on_road;
  const handleCardClick = () => {
    onSelect();
  };
  const handleButtonClick = (e) => {
    e.stopPropagation();
    onSelect();
  };
  const hoverVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)"
    },
    hover: {
      scale: 0.98,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      transition: {
        scale: {
          duration: 0.2,
          ease: "easeOut"
        },
        boxShadow: {
          duration: 0.2
        }
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn(
        "cursor-pointer border-background relative p-[2px] rounded-lg overflow-visible bg-card",
        isSelected ? "bg-card" : "",
        isComparing ? "bg-card" : "",
        isHovered ? "z-20 bg-card" : ""
      ),
      onClick: handleCardClick,
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      initial: "initial",
      whileHover: "hover",
      variants: hoverVariants,
      children: [
        isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 pointer-events-none selected-moving-border", children: /* @__PURE__ */ jsx(MovingBorder, { duration: 2800, rx: "12px", ry: "12px", children: /* @__PURE__ */ jsx("div", { className: "moving-border-gradient h-40 w-40 opacity-[0.9] bg-[radial-gradient(var(--primary)_10%,var(--indigo-500)_25%,var(--blue-500)_50%,transparent_70%)]" }) }) }),
        isComparing && !isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 pointer-events-none border-2 border-primary/70 rounded-lg comparison-pulse-border" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "relative z-10 bg-card p-4 rounded-lg border transition-all duration-300",
              isSelected ? "shadow-lg" : isComparing ? "shadow-md border-primary/70 comparison-pulse" : isHovered ? "shadow-md hover-border-pulse" : "border-border"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full font-semibold z-10 shadow-sm", children: [
                skip.size,
                " Yards"
              ] }),
              isComparing && !isSelected && /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-sm z-10", children: [
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ jsx("path", { d: "M16 3h5v5" }),
                      /* @__PURE__ */ jsx("path", { d: "M8 3H3v5" }),
                      /* @__PURE__ */ jsx("path", { d: "M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" }),
                      /* @__PURE__ */ jsx("path", { d: "m21 8-5-5-5 5" }),
                      /* @__PURE__ */ jsx("path", { d: "M3 16l5 5 5-5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: "Comparing" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] mb-4 overflow-hidden rounded-md", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: skip.imageUrl || "/images/skip-default.jpg",
                    alt: `${skip.size} Yard Skip`,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      const target = e.target;
                      target.src = "/images/skip-default.jpg";
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" }),
                isPrivateOnly && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-sm backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "h-3 w-3 mr-1",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: "Private Property Only" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 flex flex-col gap-1", children: [
                  skip.allows_heavy_waste && /* @__PURE__ */ jsx("span", { className: "bg-blue-800/40 text-success font-medium text-xs px-2 py-1 rounded-full backdrop-blur-sm shadow-sm", children: "Heavy Waste" }),
                  !skip.allowed_on_road && /* @__PURE__ */ jsx("span", { className: "bg-amber-800/40 text-warning font-medium text-xs px-2 py-1 rounded-full backdrop-blur-sm shadow-sm", children: "Not for Road" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: skip.name || `${skip.size} Yard Skip` }),
                  /* @__PURE__ */ jsxs("div", { className: "text-lg font-bold", children: [
                    "£",
                    Math.round(totalPrice)
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: skip.description || `${skip.size} cubic yard capacity skip.` }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Hire period: ",
                    skip.hire_period_days,
                    " days"
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: skip.postcode || "All Areas" })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleButtonClick,
                    className: cn(
                      "w-full mt-2 py-2 text-sm font-medium rounded-md transition-all duration-300",
                      isSelected ? "bg-primary text-primary-foreground ring-2 ring-primary/50 ring-offset-2 ring-offset-background" : isComparing ? "bg-primary/70 text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20"
                    ),
                    children: isSelected ? "Selected" : isComparing ? "Comparing" : "Select"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
};
const Drawer = Drawer$1.Root;
const DrawerTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(Drawer$1.Trigger, { ref, className: cn(className), ...props, children }));
DrawerTrigger.displayName = "DrawerTrigger";
const DrawerPortal = Drawer$1.Portal;
const DrawerClose = Drawer$1.Close;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer$1.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  }
));
DrawerOverlay.displayName = "DrawerOverlay";
const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DrawerPortal, { children: [
  /* @__PURE__ */ jsx(DrawerOverlay, {}),
  /* @__PURE__ */ jsxs(
    Drawer$1.Content,
    {
      ref,
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      ),
      onOpenAutoFocus: (e) => {
        e.preventDefault();
      },
      onPointerDownOutside: (e) => {
        e.preventDefault();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("grid gap-1.5 p-4 text-center sm:text-left", className), ...props });
DrawerHeader.displayName = "DrawerHeader";
const DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("mt-auto flex flex-col gap-2 p-4", className), ...props });
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer$1.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DrawerTitle.displayName = "DrawerTitle";
const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer$1.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = "DrawerDescription";
const VALIDATION_KEY = "pd_" + btoa("RemWasteSkips").substring(0, 8);
const projectValidationSignature = "Paul_Doros_Demo_Protected_c" + (/* @__PURE__ */ new Date()).getFullYear();
const expirationCheck = () => /* @__PURE__ */ new Date() < /* @__PURE__ */ new Date("2025-04-17");
const STEPS = [{
  id: "postcode",
  label: "Postcode",
  isCompleted: true
}, {
  id: "waste-type",
  label: "Waste Type",
  isCompleted: true
}, {
  id: "select-skip",
  label: "Select Skip",
  isActive: true
}, {
  id: "permit-check",
  label: "Permit Check"
}, {
  id: "choose-date",
  label: "Choose Date"
}, {
  id: "payment",
  label: "Payment"
}];
const SORT_OPTIONS = [{
  id: "size",
  label: "Size (small to large)"
}, {
  id: "size-desc",
  label: "Size (large to small)"
}, {
  id: "price",
  label: "Price (low to high)"
}, {
  id: "price-desc",
  label: "Price (high to low)"
}];
const FilterIcon = ({
  className
}) => /* @__PURE__ */ jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
  children: /* @__PURE__ */ jsx("polygon", {
    points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
  })
});
const skips = withComponentProps(function Component4({
  params
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    selectedSkip,
    setSelectedSkip
  } = useSkipContext();
  useEffect(() => {
    if (!expirationCheck() || !window[btoa("isValid")]) {
      const checkLicense = () => {
        try {
          const validationElement = document.createElement("div");
          validationElement.className = "pd__validation";
          validationElement.dataset.key = VALIDATION_KEY;
          validationElement.dataset.signature = projectValidationSignature;
          document.body.appendChild(validationElement);
          window[btoa("isValid")] = true;
          console.log("%c• Protected by Paul Doros •", "color:transparent");
        } catch (e) {
        }
      };
      setTimeout(checkLicense, Math.random() * 5e3 + 3e3);
    }
  }, []);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "size");
  const [filterHeavyWaste, setFilterHeavyWaste] = useState(searchParams.get("heavyWaste") === "true");
  const [filterOnRoad, setFilterOnRoad] = useState(searchParams.get("onRoad") === "true");
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(true);
  const [isCompareOpen, setIsCompareOpen] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [skipsToCompare, setSkipsToCompare] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const toggleSkipComparison = (skipId) => {
    if (skipsToCompare.includes(skipId)) {
      removeSkipFromComparison(skipId);
    } else {
      if (skipsToCompare.length < 3) {
        setSkipsToCompare([...skipsToCompare, skipId]);
      }
    }
  };
  const removeSkipFromComparison = (skipId) => {
    setSkipsToCompare(skipsToCompare.filter((id) => id !== skipId));
  };
  const closeComparisonModal = () => {
    setIsComparisonModalOpen(false);
  };
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (sortBy) newParams.set("sort", sortBy);
    if (filterHeavyWaste) newParams.set("heavyWaste", "true");
    if (filterOnRoad) newParams.set("onRoad", "true");
    setSearchParams(newParams, {
      replace: true
    });
  }, [sortBy, filterHeavyWaste, filterOnRoad, setSearchParams]);
  const filteredSkips = skips$1.filter((skip) => {
    if (filterHeavyWaste && !skip.allows_heavy_waste) return false;
    if (filterOnRoad && !skip.allowed_on_road) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "size":
        return a.size - b.size;
      case "size-desc":
        return b.size - a.size;
      case "price":
        return a.price_before_vat - b.price_before_vat;
      case "price-desc":
        return b.price_before_vat - a.price_before_vat;
      default:
        return a.size - b.size;
    }
  });
  const handleProceed = () => {
    if (selectedSkip) {
      navigate("/confirm");
    }
  };
  const resetFilters = () => {
    setSortBy("size");
    setFilterHeavyWaste(false);
    setFilterOnRoad(false);
    setIsFilterOpen(false);
    setShowCompare(false);
    setSkipsToCompare([]);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background text-foreground relative",
    "data-author": "Paul Doros",
    children: [/* @__PURE__ */ jsx(SparklesHeader, {
      particleColor: "var(--primary)",
      height: "h-[120px]",
      particleDensity: 20,
      minSize: 0.2,
      maxSize: 0.8,
      speed: 0.5
    }), /* @__PURE__ */ jsx("div", {
      className: "pt-8 md:pt-10 px-2 sm:px-4 relative z-40",
      children: /* @__PURE__ */ jsx(ProgressIndicator$1, {
        steps: STEPS
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto px-3 sm:px-4 pt-0 pb-24 relative z-30",
      children: [/* @__PURE__ */ jsx("div", {
        className: "relative mb-8 sm:mb-12 w-full flex flex-col items-center justify-center overflow-hidden rounded-md",
        children: /* @__PURE__ */ jsxs("div", {
          className: "w-full h-40 relative mx-auto",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-x-0 left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"
          }), /* @__PURE__ */ jsx(motion.h1, {
            className: "absolute left-1/2 -translate-x-1/2 top-0 text-2xl sm:text-3xl font-bold mb-3 text-center mt-4 w-full",
            initial: {
              opacity: 0,
              y: -20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              duration: 0.5
            },
            children: "Choose Your Skip Size"
          }), /* @__PURE__ */ jsx("p", {
            className: "absolute left-1/2 -translate-x-1/2 top-16 sm:top-20 text-muted-foreground text-center mb-5 w-full px-4 text-sm sm:text-base",
            children: "Select the skip size that best suits your needs from our wide selection."
          }), useMemo(() => /* @__PURE__ */ jsx(SparklesCore, {
            background: "transparent",
            minSize: 0.4,
            maxSize: 1,
            particleDensity: 1200,
            className: "w-full h-full pointer-events-none",
            particleColor: "#FFFFFF"
          }), []), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(800px_200px_at_top,transparent_20%,white)]"
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "md:hidden flex items-center justify-between mb-4",
        children: [/* @__PURE__ */ jsxs(motion.button, {
          className: "flex items-center gap-2 bg-card border border-border hover:bg-muted text-foreground px-3 py-2 rounded-md transition-colors text-sm shadow-sm",
          onClick: () => setIsFilterOpen(!isFilterOpen),
          whileTap: {
            scale: 0.97
          },
          children: [/* @__PURE__ */ jsxs("span", {
            className: "flex items-center gap-1.5",
            children: [/* @__PURE__ */ jsx(FilterIcon, {
              className: "text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "Filter & Sort"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-1.5 ml-1",
            children: [(filterHeavyWaste || filterOnRoad || sortBy !== "size") && /* @__PURE__ */ jsx("span", {
              className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-medium",
              children: (() => {
                let count = 0;
                if (filterHeavyWaste) count++;
                if (filterOnRoad) count++;
                if (sortBy !== "size") count++;
                return count;
              })()
            }), showCompare && /* @__PURE__ */ jsxs("span", {
              className: "flex h-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-medium px-1.5 flex-row gap-0.5",
              children: [/* @__PURE__ */ jsxs("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "10",
                height: "10",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [/* @__PURE__ */ jsx("path", {
                  d: "M16 3h5v5"
                }), /* @__PURE__ */ jsx("path", {
                  d: "M8 3H3v5"
                }), /* @__PURE__ */ jsx("path", {
                  d: "M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"
                }), /* @__PURE__ */ jsx("path", {
                  d: "m21 8-5-5-5 5"
                }), /* @__PURE__ */ jsx("path", {
                  d: "M3 16l5 5 5-5"
                })]
              }), skipsToCompare.length]
            })]
          })]
        }), /* @__PURE__ */ jsx("button", {
          onClick: resetFilters,
          className: `px-2 py-1.5 text-xs ${filterHeavyWaste || filterOnRoad || sortBy !== "size" || showCompare ? "text-primary hover:bg-primary/10 rounded-md" : "text-muted-foreground"}`,
          disabled: !(filterHeavyWaste || filterOnRoad || sortBy !== "size" || showCompare),
          children: "Reset"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-4",
        children: [isFilterOpen && /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between md:hidden",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-sm font-medium",
            children: "Filter Options"
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => setIsFilterOpen(false),
            className: "text-muted-foreground hover:text-foreground",
            children: "✕"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-3",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "rounded-md border border-border overflow-hidden",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between bg-muted/30 px-4 py-2.5",
              children: [/* @__PURE__ */ jsxs("button", {
                className: "flex items-center gap-2 text-left",
                onClick: () => setIsFeaturesOpen(!isFeaturesOpen),
                children: [/* @__PURE__ */ jsxs("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "text-primary",
                  children: [/* @__PURE__ */ jsx("path", {
                    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                  }), /* @__PURE__ */ jsx("circle", {
                    cx: "12",
                    cy: "12",
                    r: "3"
                  })]
                }), /* @__PURE__ */ jsx("h4", {
                  className: "text-sm font-medium",
                  children: "Filters & Comparison"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */ jsxs("button", {
                  onClick: resetFilters,
                  className: `px-2 py-1.5 text-xs flex items-center gap-1.5 ${filterHeavyWaste || filterOnRoad || sortBy !== "size" || showCompare ? "text-primary hover:bg-primary/10 rounded-md" : "text-muted-foreground"}`,
                  disabled: !(filterHeavyWaste || filterOnRoad || sortBy !== "size" || showCompare),
                  children: ["Reset", (filterHeavyWaste || filterOnRoad || sortBy !== "size" || showCompare) && /* @__PURE__ */ jsx("span", {
                    className: "flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium",
                    children: (() => {
                      let count = 0;
                      if (filterHeavyWaste) count++;
                      if (filterOnRoad) count++;
                      if (sortBy !== "size") count++;
                      if (showCompare) count++;
                      return count;
                    })()
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md transition-colors cursor-pointer flex items-center gap-1.5",
                  onClick: () => setIsFeaturesOpen(!isFeaturesOpen),
                  children: [isFeaturesOpen ? "Hide" : "Show", /* @__PURE__ */ jsx("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: `transition-transform duration-200 ${isFeaturesOpen ? "rotate-180" : ""}`,
                    children: /* @__PURE__ */ jsx("path", {
                      d: "m6 9 6 6 6-6"
                    })
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsx(AnimatePresence, {
              initial: false,
              mode: "wait",
              children: isFeaturesOpen && /* @__PURE__ */ jsx(motion.div, {
                className: "overflow-hidden will-change-transform",
                initial: {
                  height: 0,
                  opacity: 0.8
                },
                animate: {
                  height: "auto",
                  opacity: 1
                },
                exit: {
                  height: 0,
                  opacity: 0.8
                },
                transition: {
                  height: {
                    duration: 0.1,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 0.1
                  }
                },
                children: /* @__PURE__ */ jsx("div", {
                  className: "p-4",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "md:col-span-1 p-4 bg-card/50 rounded-lg border border-border/50",
                      children: [/* @__PURE__ */ jsx("h5", {
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2",
                        children: "Sort By"
                      }), /* @__PURE__ */ jsx("select", {
                        value: sortBy,
                        onChange: (e) => setSortBy(e.target.value),
                        className: "w-full bg-background text-foreground rounded-md border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all",
                        children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", {
                          value: option.id,
                          children: option.label
                        }, option.id))
                      })]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "md:col-span-1 p-4 bg-card/50 rounded-lg border border-border/50",
                      children: [/* @__PURE__ */ jsx("h5", {
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2",
                        children: "Features"
                      }), /* @__PURE__ */ jsxs("div", {
                        className: "flex flex-col grid-cols-1 md:grid-cols-2 gap-3",
                        children: [/* @__PURE__ */ jsxs("label", {
                          className: "flex items-center gap-2 cursor-pointer group",
                          children: [/* @__PURE__ */ jsx("div", {
                            className: "relative flex items-center",
                            children: /* @__PURE__ */ jsx("input", {
                              type: "checkbox",
                              id: "heavyWaste",
                              checked: filterHeavyWaste,
                              onChange: (e) => setFilterHeavyWaste(e.target.checked),
                              className: "rounded-sm w-4 h-4 bg-background border-border text-primary focus:ring-primary"
                            })
                          }), /* @__PURE__ */ jsxs("div", {
                            className: "flex flex-col",
                            children: [/* @__PURE__ */ jsx("span", {
                              className: `text-sm ${filterHeavyWaste ? "text-primary font-medium" : "text-foreground"}`,
                              children: "Allows Heavy Waste"
                            }), /* @__PURE__ */ jsx("span", {
                              className: "text-xs text-muted-foreground",
                              children: "Concrete, soil and heavy materials"
                            })]
                          })]
                        }), /* @__PURE__ */ jsxs("label", {
                          className: "flex items-center gap-2 cursor-pointer group",
                          children: [/* @__PURE__ */ jsx("div", {
                            className: "relative flex items-center",
                            children: /* @__PURE__ */ jsx("input", {
                              type: "checkbox",
                              id: "onRoad",
                              checked: filterOnRoad,
                              onChange: (e) => setFilterOnRoad(e.target.checked),
                              className: "rounded-sm w-4 h-4 bg-background border-border text-primary focus:ring-primary"
                            })
                          }), /* @__PURE__ */ jsxs("div", {
                            className: "flex flex-col",
                            children: [/* @__PURE__ */ jsx("span", {
                              className: `text-sm ${filterOnRoad ? "text-primary font-medium" : "text-foreground"}`,
                              children: "Road Placement Only"
                            }), /* @__PURE__ */ jsx("span", {
                              className: "text-xs text-muted-foreground",
                              children: "Suitable for public road with permit"
                            })]
                          })]
                        })]
                      })]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "md:col-span-1 p-4 bg-card/50 rounded-lg border border-border/50",
                      children: [/* @__PURE__ */ jsx("h5", {
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2",
                        children: "Comparison"
                      }), /* @__PURE__ */ jsxs("button", {
                        onClick: () => setShowCompare(!showCompare),
                        className: `w-full py-2.5 px-3 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${showCompare ? "bg-primary text-primary-foreground ring-2 ring-primary/30 shadow-sm" : "bg-primary/10 text-primary hover:bg-primary/20"}`,
                        children: [/* @__PURE__ */ jsxs(motion.svg, {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          animate: {
                            rotate: showCompare ? 360 : 0
                          },
                          transition: {
                            duration: 0.4
                          },
                          children: [/* @__PURE__ */ jsx("path", {
                            d: "M16 3h5v5"
                          }), /* @__PURE__ */ jsx("path", {
                            d: "M8 3H3v5"
                          }), /* @__PURE__ */ jsx("path", {
                            d: "M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"
                          }), /* @__PURE__ */ jsx("path", {
                            d: "m21 8-5-5-5 5"
                          }), /* @__PURE__ */ jsx("path", {
                            d: "M3 16l5 5 5-5"
                          })]
                        }), /* @__PURE__ */ jsx("span", {
                          children: showCompare ? "Disable Comparison" : "Enable Comparison"
                        }), skipsToCompare.length > 0 && /* @__PURE__ */ jsx(motion.span, {
                          className: "inline-flex items-center justify-center h-5 w-5 text-xs font-medium bg-primary-foreground/20 text-primary-foreground rounded-full ml-1",
                          initial: {
                            scale: 0.8
                          },
                          animate: {
                            scale: 1
                          },
                          transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 15
                          },
                          children: skipsToCompare.length
                        })]
                      })]
                    })]
                  })
                })
              })
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-col gap-2 relative",
            children: /* @__PURE__ */ jsx(AnimatePresence, {
              children: showCompare && /* @__PURE__ */ jsx(motion.div, {
                className: "fixed inset-x-0 bottom-0 md:bottom-auto md:right-4 md:top-52 md:left-auto md:w-80 z-[100]",
                initial: {
                  y: "100%",
                  x: 0,
                  opacity: 0
                },
                animate: {
                  y: 0,
                  x: 0,
                  opacity: 1
                },
                exit: {
                  y: "100%",
                  x: 0,
                  opacity: 0
                },
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.3
                },
                children: /* @__PURE__ */ jsxs("div", {
                  className: "bg-card shadow-lg border border-border rounded-t-lg md:rounded-lg overflow-hidden max-h-[60vh] flex flex-col",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "sticky top-0 bg-card z-10 border-b border-border p-3 flex justify-between items-center",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/* @__PURE__ */ jsxs(motion.svg, {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "text-primary",
                        animate: {
                          rotate: [0, 10, 0, -10, 0]
                        },
                        transition: {
                          duration: 1,
                          repeat: 0,
                          delay: 0.5
                        },
                        children: [/* @__PURE__ */ jsx("path", {
                          d: "M16 3h5v5"
                        }), /* @__PURE__ */ jsx("path", {
                          d: "M8 3H3v5"
                        }), /* @__PURE__ */ jsx("path", {
                          d: "M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"
                        }), /* @__PURE__ */ jsx("path", {
                          d: "m21 8-5-5-5 5"
                        }), /* @__PURE__ */ jsx("path", {
                          d: "M3 16l5 5 5-5"
                        })]
                      }), /* @__PURE__ */ jsxs("h5", {
                        className: "text-sm font-medium",
                        children: ["Compare Skips", " ", /* @__PURE__ */ jsxs("span", {
                          className: "text-muted-foreground",
                          children: ["(", skipsToCompare.length, "/3)"]
                        })]
                      })]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-1.5",
                      children: [/* @__PURE__ */ jsx("button", {
                        onClick: () => setSkipsToCompare([]),
                        className: "text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 hover:bg-muted rounded",
                        disabled: skipsToCompare.length === 0,
                        children: "Clear"
                      }), /* @__PURE__ */ jsx("button", {
                        onClick: () => setShowCompare(false),
                        className: "text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted",
                        children: /* @__PURE__ */ jsxs("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: [/* @__PURE__ */ jsx("line", {
                            x1: "18",
                            y1: "6",
                            x2: "6",
                            y2: "18"
                          }), /* @__PURE__ */ jsx("line", {
                            x1: "6",
                            y1: "6",
                            x2: "18",
                            y2: "18"
                          })]
                        })
                      })]
                    })]
                  }), /* @__PURE__ */ jsx(motion.div, {
                    className: "p-3 space-y-3 overflow-y-auto flex-1",
                    initial: {
                      height: 0
                    },
                    animate: {
                      height: "auto"
                    },
                    transition: {
                      duration: 0.2,
                      delay: 0.15
                    },
                    children: skipsToCompare.length === 0 ? /* @__PURE__ */ jsxs("div", {
                      className: "py-8 flex flex-col items-center justify-center text-center",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3",
                        children: /* @__PURE__ */ jsxs("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "20",
                          height: "20",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          className: "text-muted-foreground",
                          children: [/* @__PURE__ */ jsx("circle", {
                            cx: "8",
                            cy: "21",
                            r: "1"
                          }), /* @__PURE__ */ jsx("circle", {
                            cx: "19",
                            cy: "21",
                            r: "1"
                          }), /* @__PURE__ */ jsx("path", {
                            d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
                          })]
                        })
                      }), /* @__PURE__ */ jsx("h6", {
                        className: "text-sm font-medium mb-1",
                        children: "No skips selected"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-xs text-muted-foreground mb-3",
                        children: "Click on skips below to compare up to 3 options"
                      })]
                    }) : /* @__PURE__ */ jsxs(Fragment, {
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "space-y-2",
                        children: skipsToCompare.map((skipId) => {
                          const skip = skips$1.find((s) => s.id === skipId);
                          return skip ? /* @__PURE__ */ jsxs(motion.div, {
                            className: "bg-background rounded-md border border-border p-2.5 flex items-center justify-between",
                            initial: {
                              opacity: 0,
                              y: 10
                            },
                            animate: {
                              opacity: 1,
                              y: 0
                            },
                            exit: {
                              opacity: 0,
                              x: -10
                            },
                            transition: {
                              duration: 0.2
                            },
                            layout: true,
                            children: [/* @__PURE__ */ jsxs("div", {
                              className: "flex items-center gap-2.5",
                              children: [/* @__PURE__ */ jsx("div", {
                                className: "w-8 h-8 rounded bg-primary/10 flex items-center justify-center",
                                children: /* @__PURE__ */ jsxs("span", {
                                  className: "text-xs font-medium text-primary",
                                  children: [skip.size, "yd"]
                                })
                              }), /* @__PURE__ */ jsxs("div", {
                                children: [/* @__PURE__ */ jsx("div", {
                                  className: "text-sm font-medium",
                                  children: skip.name || `${skip.size}yd Skip`
                                }), /* @__PURE__ */ jsxs("div", {
                                  className: "text-xs text-muted-foreground",
                                  children: ["£", Math.round(skip.price_before_vat + skip.price_before_vat * skip.vat / 100)]
                                })]
                              })]
                            }), /* @__PURE__ */ jsx("button", {
                              onClick: () => removeSkipFromComparison(skipId),
                              className: "text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted",
                              children: /* @__PURE__ */ jsxs("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [/* @__PURE__ */ jsx("line", {
                                  x1: "18",
                                  y1: "6",
                                  x2: "6",
                                  y2: "18"
                                }), /* @__PURE__ */ jsx("line", {
                                  x1: "6",
                                  y1: "6",
                                  x2: "18",
                                  y2: "18"
                                })]
                              })
                            })]
                          }, skipId) : null;
                        })
                      }), skipsToCompare.length < 3 && /* @__PURE__ */ jsxs("div", {
                        className: "text-xs px-3 py-2.5 rounded-md bg-muted/30 text-muted-foreground border border-dashed border-border flex items-center justify-center gap-1.5",
                        children: [/* @__PURE__ */ jsxs("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: [/* @__PURE__ */ jsx("line", {
                            x1: "12",
                            y1: "5",
                            x2: "12",
                            y2: "19"
                          }), /* @__PURE__ */ jsx("line", {
                            x1: "5",
                            y1: "12",
                            x2: "19",
                            y2: "12"
                          })]
                        }), "Select more skips to compare (", skipsToCompare.length, "/3)"]
                      })]
                    })
                  }), skipsToCompare.length >= 2 && /* @__PURE__ */ jsx("div", {
                    className: "p-3 border-t border-border",
                    children: /* @__PURE__ */ jsxs(Drawer, {
                      children: [/* @__PURE__ */ jsx(DrawerTrigger, {
                        asChild: true,
                        children: /* @__PURE__ */ jsxs(motion.button, {
                          className: "w-full py-2.5 px-3 text-sm font-medium bg-primary text-primary-foreground rounded-md transition-all flex items-center justify-center gap-1.5 hover:bg-primary/90",
                          whileHover: {
                            scale: 1.02
                          },
                          whileTap: {
                            scale: 0.98
                          },
                          "aria-label": "View detailed comparison",
                          children: [/* @__PURE__ */ jsxs("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            "aria-hidden": "true",
                            children: [/* @__PURE__ */ jsx("path", {
                              d: "M18 6H6"
                            }), /* @__PURE__ */ jsx("path", {
                              d: "M18 12H6"
                            }), /* @__PURE__ */ jsx("path", {
                              d: "M18 18H6"
                            })]
                          }), "View Detailed Comparison"]
                        })
                      }), /* @__PURE__ */ jsxs(DrawerContent, {
                        className: "max-h-[85dvh]",
                        children: [/* @__PURE__ */ jsxs(DrawerHeader, {
                          children: [/* @__PURE__ */ jsxs(DrawerTitle, {
                            className: "flex items-center gap-2",
                            children: [/* @__PURE__ */ jsxs("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "20",
                              height: "20",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              className: "text-primary",
                              "aria-hidden": "true",
                              children: [/* @__PURE__ */ jsx("path", {
                                d: "M16 3h5v5"
                              }), /* @__PURE__ */ jsx("path", {
                                d: "M8 3H3v5"
                              }), /* @__PURE__ */ jsx("path", {
                                d: "M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"
                              }), /* @__PURE__ */ jsx("path", {
                                d: "m21 8-5-5-5 5"
                              }), /* @__PURE__ */ jsx("path", {
                                d: "M3 16l5 5 5-5"
                              })]
                            }), "Skip Comparison"]
                          }), /* @__PURE__ */ jsx(DrawerDescription, {
                            children: "Compare selected skips side by side"
                          })]
                        }), /* @__PURE__ */ jsx("div", {
                          className: "p-4 overflow-y-auto",
                          children: /* @__PURE__ */ jsx("div", {
                            className: "overflow-x-auto",
                            children: /* @__PURE__ */ jsxs("table", {
                              className: "w-full border-collapse comparison-table",
                              children: [/* @__PURE__ */ jsx("thead", {
                                children: /* @__PURE__ */ jsxs("tr", {
                                  className: "border-b",
                                  children: [/* @__PURE__ */ jsx("th", {
                                    className: "py-2 px-3 text-left font-medium text-sm",
                                    children: "Feature"
                                  }), skipsToCompare.map((skipId) => {
                                    const skip = skips$1.find((s) => s.id === skipId);
                                    return skip ? /* @__PURE__ */ jsx("th", {
                                      className: "py-2 px-3 text-center font-medium text-sm",
                                      children: skip.name || `${skip.size}yd Skip`
                                    }, skipId) : null;
                                  })]
                                })
                              }), /* @__PURE__ */ jsxs("tbody", {
                                children: [/* @__PURE__ */ jsxs("tr", {
                                  className: "border-b",
                                  children: [/* @__PURE__ */ jsx("td", {
                                    className: "py-2 px-3 text-sm font-medium",
                                    children: "Size"
                                  }), skipsToCompare.map((skipId) => {
                                    const skip = skips$1.find((s) => s.id === skipId);
                                    return skip ? /* @__PURE__ */ jsxs("td", {
                                      className: "py-2 px-3 text-center text-sm",
                                      children: [skip.size, " cubic yards"]
                                    }, skipId) : null;
                                  })]
                                }), /* @__PURE__ */ jsxs("tr", {
                                  className: "border-b",
                                  children: [/* @__PURE__ */ jsx("td", {
                                    className: "py-2 px-3 text-sm font-medium",
                                    children: "Price"
                                  }), skipsToCompare.map((skipId) => {
                                    const skip = skips$1.find((s) => s.id === skipId);
                                    return skip ? /* @__PURE__ */ jsxs("td", {
                                      className: "py-2 px-3 text-center text-sm",
                                      children: ["£", Math.round(skip.price_before_vat + skip.price_before_vat * skip.vat / 100)]
                                    }, skipId) : null;
                                  })]
                                }), /* @__PURE__ */ jsxs("tr", {
                                  className: "border-b",
                                  children: [/* @__PURE__ */ jsx("td", {
                                    className: "py-2 px-3 text-sm font-medium",
                                    children: "Heavy Waste"
                                  }), skipsToCompare.map((skipId) => {
                                    const skip = skips$1.find((s) => s.id === skipId);
                                    return skip ? /* @__PURE__ */ jsx("td", {
                                      className: "py-2 px-3 text-center text-sm",
                                      children: skip.allows_heavy_waste ? /* @__PURE__ */ jsx("span", {
                                        className: "text-green-500",
                                        children: "Yes"
                                      }) : /* @__PURE__ */ jsx("span", {
                                        className: "text-red-500",
                                        children: "No"
                                      })
                                    }, skipId) : null;
                                  })]
                                }), /* @__PURE__ */ jsxs("tr", {
                                  className: "border-b",
                                  children: [/* @__PURE__ */ jsx("td", {
                                    className: "py-2 px-3 text-sm font-medium",
                                    children: "Road Placement"
                                  }), skipsToCompare.map((skipId) => {
                                    const skip = skips$1.find((s) => s.id === skipId);
                                    return skip ? /* @__PURE__ */ jsx("td", {
                                      className: "py-2 px-3 text-center text-sm",
                                      children: skip.allowed_on_road ? /* @__PURE__ */ jsx("span", {
                                        className: "text-green-500",
                                        children: "Yes"
                                      }) : /* @__PURE__ */ jsx("span", {
                                        className: "text-red-500",
                                        children: "No"
                                      })
                                    }, skipId) : null;
                                  })]
                                }), /* @__PURE__ */ jsxs("tr", {
                                  className: "border-b",
                                  children: [/* @__PURE__ */ jsx("td", {
                                    className: "py-2 px-3 text-sm font-medium",
                                    children: "Capacity"
                                  }), skipsToCompare.map((skipId) => {
                                    const skip = skips$1.find((s) => s.id === skipId);
                                    return skip ? /* @__PURE__ */ jsxs("td", {
                                      className: "py-2 px-3 text-center text-sm",
                                      children: ["Approx. ", skip.size * 200, "kg"]
                                    }, skipId) : null;
                                  })]
                                })]
                              })]
                            })
                          })
                        }), /* @__PURE__ */ jsxs(DrawerFooter, {
                          children: [/* @__PURE__ */ jsx("div", {
                            className: "flex flex-wrap gap-2 justify-center sm:justify-end",
                            children: skipsToCompare.map((skipId) => {
                              const skip = skips$1.find((s) => s.id === skipId);
                              return skip ? /* @__PURE__ */ jsx(motion.button, {
                                onClick: () => {
                                  setSelectedSkip(skip);
                                  closeComparisonModal();
                                },
                                className: `px-4 py-2 text-sm rounded-md transition-colors comparison-select-button ${(selectedSkip == null ? void 0 : selectedSkip.id) === skipId ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20"}`,
                                whileHover: {
                                  scale: 1.03
                                },
                                whileTap: {
                                  scale: 0.98
                                },
                                children: (selectedSkip == null ? void 0 : selectedSkip.id) === skipId ? /* @__PURE__ */ jsxs("span", {
                                  className: "flex items-center gap-1.5",
                                  children: [/* @__PURE__ */ jsx("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /* @__PURE__ */ jsx("path", {
                                      d: "M20 6 9 17l-5-5"
                                    })
                                  }), "Selected"]
                                }) : /* @__PURE__ */ jsxs("span", {
                                  children: ["Select ", skip.size, "yd Skip"]
                                })
                              }, skipId) : null;
                            })
                          }), /* @__PURE__ */ jsx(DrawerClose, {
                            asChild: true,
                            children: /* @__PURE__ */ jsxs("button", {
                              className: "px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-2",
                              children: [/* @__PURE__ */ jsxs("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [/* @__PURE__ */ jsx("path", {
                                  d: "M19 12H5"
                                }), /* @__PURE__ */ jsx("path", {
                                  d: "M12 19l-7-7 7-7"
                                })]
                              }), "Back to Skips"]
                            })
                          })]
                        })]
                      })]
                    })
                  }), /* @__PURE__ */ jsx("div", {
                    className: "absolute -top-3 left-1/2 transform -translate-x-1/2 md:hidden",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "w-10 h-1 bg-border rounded-full"
                    })
                  })]
                })
              })
            })
          })]
        })]
      }), filteredSkips.length === 0 && /* @__PURE__ */ jsxs(motion.div, {
        className: "bg-card border border-border rounded-lg p-6 text-center my-8",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        children: [/* @__PURE__ */ jsx("svg", {
          className: "w-12 h-12 mx-auto text-muted-foreground mb-4",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 1.5,
            d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          })
        }), /* @__PURE__ */ jsx("h3", {
          className: "text-lg font-semibold mb-2",
          children: "No Matching Skips"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground mb-4",
          children: "Try adjusting your filters to see more options."
        }), /* @__PURE__ */ jsx("button", {
          onClick: resetFilters,
          className: "px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors",
          children: "Reset Filters"
        })]
      }), /* @__PURE__ */ jsx(motion.div, {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8",
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        transition: {
          duration: 0.5,
          delay: 0.2
        },
        children: filteredSkips.map((skip) => /* @__PURE__ */ jsx("div", {
          className: `rounded-lg shadow-sm border border-background overflow-hidden `,
          children: /* @__PURE__ */ jsx(SkipCard, {
            skip,
            isSelected: (selectedSkip == null ? void 0 : selectedSkip.id) === skip.id,
            onSelect: () => showCompare ? toggleSkipComparison(skip.id) : setSelectedSkip(skip),
            isComparing: skipsToCompare.includes(skip.id)
          })
        }, skip.id))
      }), !selectedSkip && /* @__PURE__ */ jsx("div", {
        className: "py-4 text-center text-muted-foreground text-sm",
        children: /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("a", {
            href: "https://pauldoros.site",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:text-primary/80",
            children: "Design by Paul Doros"
          })
        })
      })]
    }), selectedSkip && /* @__PURE__ */ jsx(motion.div, {
      className: "fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border py-3 md:py-4 z-50",
      initial: {
        y: 100
      },
      animate: {
        y: 0
      },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      },
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col items-center sm:items-start",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-xs sm:text-sm text-muted-foreground",
            children: "Selected:"
          }), /* @__PURE__ */ jsxs("span", {
            className: "font-semibold text-foreground text-center sm:text-left",
            children: [selectedSkip.size, " Yard Skip - £", Math.round(selectedSkip.price_before_vat + selectedSkip.price_before_vat * selectedSkip.vat / 100)]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full sm:w-auto",
          children: /* @__PURE__ */ jsx(GradientButton, {
            variant: "proceed",
            size: "sm",
            className: "w-full sm:w-auto",
            onClick: handleProceed,
            children: "Proceed to Checkout →"
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed top-8 lg:top-4 right-4 z-50",
      children: /* @__PURE__ */ jsx(ThemeToggle, {})
    }), /* @__PURE__ */ jsx(ChatAssistant, {})]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: skips
}, Symbol.toStringTag, { value: "Module" }));
const _404 = withComponentProps(function NotFoundPage() {
  return /* @__PURE__ */ jsx("div", {
    className: "relative flex flex-col w-full justify-center min-h-screen bg-background p-6 md:p-10",
    children: /* @__PURE__ */ jsxs("div", {
      className: "relative max-w-5xl mx-auto w-full",
      children: [/* @__PURE__ */ jsx(Illustration, {
        className: "absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground"
      }), /* @__PURE__ */ jsx(NotFound, {
        title: "Page not found",
        description: "The page you are looking for doesn't exist or has been moved."
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _404
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B6IGZpEH.js", "imports": ["/assets/chunk-GNGMS2XR-DFhD6QXP.js", "/assets/index-POQjFgHY.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DPMqlot9.js", "imports": ["/assets/chunk-GNGMS2XR-DFhD6QXP.js", "/assets/index-POQjFgHY.js", "/assets/with-props-FxcqGdth.js", "/assets/ThemeContext-CB_hqxvZ.js", "/assets/not-found-Dxlj_P1q.js", "/assets/utils-jAU0Cazi.js"], "css": ["/assets/root-BNb_3pNj.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/confirm": { "id": "routes/confirm", "parentId": "root", "path": "confirm", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/confirm-LYgHDI7k.js", "imports": ["/assets/with-props-FxcqGdth.js", "/assets/chunk-GNGMS2XR-DFhD6QXP.js", "/assets/ThemeContext-CB_hqxvZ.js", "/assets/SparklesHeader-Cjklr243.js", "/assets/utils-jAU0Cazi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DF5cQi8v.js", "imports": ["/assets/with-props-FxcqGdth.js", "/assets/chunk-GNGMS2XR-DFhD6QXP.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/skips": { "id": "routes/skips", "parentId": "root", "path": "skips", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/skips-DydnVZq3.js", "imports": ["/assets/with-props-FxcqGdth.js", "/assets/chunk-GNGMS2XR-DFhD6QXP.js", "/assets/ThemeContext-CB_hqxvZ.js", "/assets/SparklesHeader-Cjklr243.js", "/assets/utils-jAU0Cazi.js", "/assets/index-POQjFgHY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/404": { "id": "routes/404", "parentId": "root", "path": "404", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/404-BM-NEme3.js", "imports": ["/assets/with-props-FxcqGdth.js", "/assets/chunk-GNGMS2XR-DFhD6QXP.js", "/assets/not-found-Dxlj_P1q.js", "/assets/utils-jAU0Cazi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-60d9b775.js", "version": "60d9b775" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/confirm": {
    id: "routes/confirm",
    parentId: "root",
    path: "confirm",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/skips": {
    id: "routes/skips",
    parentId: "root",
    path: "skips",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
