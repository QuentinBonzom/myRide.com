import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  WrenchIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { CarFront } from "lucide-react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const SLIDE_DATA = [
  {
    key: "INTRO",
    title: "WELCOME",
    graphic: "/welcome.png",
    headline: "MyRide Your all-in-one garage & marketplace.",
    desc: "Your vehicle is one of your most important assets. Unlike other assets, it depreciates. Limiting that depreciation is challenging — even professionals struggle with it. At MyRide, we make it easy for everyone.",
  },
  {
    key: "TRACK",
    title: "TRACK",
    graphic: "/track.png",
    headline: "Save all your receipts related to all your vehicles",
    desc: "The AI tracks your spending on repairs, modifications, and regular maintenance — and guides you on exactly what maintenance task to perform next.",
  },
  {
    key: "OPTIMISE",
    title: "OPTIMIZE",
    graphic: "/optimise.png",
    headline: "AI-support car valuation and tracking over time",
    desc: "Our AI gives you an accurate, real-time estimate of your car’s value based on its condition, maintenance, and usage. Track it over time and get tips to boost it — no more lowball offers.",
  },
  {
    key: "SELL",
    title: "SELL",
    graphic: "/sell.png",
    headline: "Add a vehicle in 30sec. List it in 10sec.",
    desc: "We’re building the safest vehicle marketplace ever. With full maintenance records, invite-only access, and crypto-enabled smart transactions, we ensure a trusted community of serious buyers and sellers.",
  },
];

export default function WelcomePage() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileRef = useRef(null);
  const tabletRef = useRef(null);
  const router = useRouter();

  const redirectedRef = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && !redirectedRef.current) {
        redirectedRef.current = true;
        router.replace("/myVehicles_page");
      }
    });

    return () => unsub();
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 4500); // start fade out before hiding
    const timer2 = setTimeout(() => setLoading(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const handleMobileScroll = (e) => {
    const el = e.target;
    setCurrentSlide(Math.round(el.scrollLeft / el.clientWidth));
  };
  const handleTabletScroll = (e) => {
    const el = e.target;
    setCurrentSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen bg-gray-900 transition-opacity duration-500 fixed inset-0 z-50 ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ pointerEvents: fadeOut ? "none" : "auto" }}
      >
        <Image
          src="/logo-MR.png"
          alt="MyRide Logo"
          className="h-auto w-80 animate-pulse"
          style={{ animation: "blink 1s infinite" }}
          width={320}
          height={80}
        />
        <style jsx>{`
          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
          }
          .animate-pulse {
            animation: blink 3s infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE ONLY */}
      <section className="relative h-screen bg-[url(/fond-mobil.png)] bg-cover bg-center md:hidden">
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Barre de progression MOBILE */}
        <div className="absolute left-0 right-0 flex px-6 space-x-2 top-6">
          {SLIDE_DATA.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-2xl transition-colors ${
                i === currentSlide ? "bg-purple-500" : "bg-gray-700/40"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col h-full px-6 pb-8 pt-14">
          {/* Logo */}
          <div className="flex items-center mb-2">
            <Image
              src="/logo-MR.png"
              alt="MyRide"
              width={94}
              height={94}
              className="h-auto w-60" // Tailwind fixes width, height auto
              style={{ height: "auto" }} // ensure aspect ratio
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold white md:text-5xl">
            Track. Optimize.
            <br />
            Sell for more.
          </h1>
          {/* Carousel */}
          <div
            ref={mobileRef}
            onScroll={handleMobileScroll}
            className="flex flex-1 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {SLIDE_DATA.map((slide) => {
              const Icon = {
                INTRO: CarFront,
                TRACK: MagnifyingGlassIcon,
                OPTIMISE: WrenchIcon,
                SELL: ArrowTrendingUpIcon,
              }[slide.key];
              return (
                <div
                  key={slide.key}
                  className="flex flex-col items-center flex-shrink-0 w-full px-4 text-center snap-start"
                >
                  <h2 className="w-full mt-6 mb-4 text-3xl font-semibold text-center text-white uppercase border-b-2 rounded-3xl">
                    {slide.title}
                  </h2>
                  <div className="flex flex-col items-center gap-2 mx-auto mt-2">
                    <div className="p-4 rounded-lg bg-zinc-500 bg-opacity-70">
                      <Icon className="w-8 h-8 mx-auto mb-2 " />
                      <p className="text-white">{slide.headline}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-500 bg-opacity-70">
                      <p className="text-white">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/signup_page"
            className="absolute inset-x-0 z-50 w-3/4 py-3 mx-auto text-2xl font-bold text-center text-white bg-purple-600 rounded-xl bottom-12"
          >
            Get Started
          </Link>
        </div>
      </section>
      {/* FIN HOME MOBILE */}

      {/* TABLET ONLY */}
      <section className="hidden md:flex lg:hidden relative h-screen bg-[url(/fond-mobil.png)] bg-cover bg-center">
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Barre de progression TABLET */}
        <div className="absolute left-0 right-0 flex px-12 space-x-4 top-6">
          {SLIDE_DATA.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-2xl transition-colors ${
                i === currentSlide ? "bg-purple-500" : "bg-gray-700/40"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col h-full max-w-3xl px-12 pt-20 pb-12 mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-MR.png"
              alt="MyRide"
              width={94}
              height={94}
              className="h-auto w-80" // Tailwind fixes width, height auto
              style={{ height: "auto" }} // ensure aspect ratio
            />
          </div>

          <h1 className="mb-8 text-5xl font-bold text-center text-white">
            Track. Optimize.
            <br />
            Sell for more.
          </h1>

          {/* Carousel */}
          <div
            ref={tabletRef}
            onScroll={handleTabletScroll}
            className="flex flex-1 space-x-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {SLIDE_DATA.map((slide) => {
              const Icon = {
                INTRO: CarFront,
                TRACK: MagnifyingGlassIcon,
                OPTIMISE: WrenchIcon,
                SELL: ArrowTrendingUpIcon,
              }[slide.key];
              return (
                <div
                  key={slide.key}
                  className="flex flex-col items-center flex-shrink-0 w-full px-4 text-center snap-start"
                >
                  <h2 className="px-8 mt-10 mb-4 text-3xl font-semibold text-center text-white uppercase border-b-2 rounded-3xl">
                    {slide.title}
                  </h2>
                  <div className="flex flex-col items-center gap-2 mx-auto mt-2">
                    <div className="p-8 px-12 rounded-lg bg-zinc-500 bg-opacity-70">
                      <Icon className="w-8 h-8 mx-auto mb-2 " />
                      <p className="text-white">{slide.headline}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-500 bg-opacity-70">
                      <p className="text-white ">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/signup_page"
            className="w-1/2 py-6 mx-auto mt-8 mb-8 text-4xl font-bold text-center text-white bg-purple-600 rounded-xl"
          >
            Get Started
          </Link>
        </div>
      </section>
      {/* END TABLET */}
    </>
  );
}
