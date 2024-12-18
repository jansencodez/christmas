"use client";
import { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import animationData from "../public/christmas-animation.json"; // Add a Lottie JSON file for animation
import { Snowfall } from "react-snowfall"; // For the optional snowfall effect

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  const [isChristmas, setIsChristmas] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Ensure the audio starts playing as soon as it's loaded
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 25); // Christmas (Month is 0-indexed)
      const diff = christmas.getTime() - now.getTime();

      if (diff <= 0) {
        setIsChristmas(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isChristmas) {
    // Christmas Animation Screen
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="h-screen flex flex-col items-center justify-center bg-red-100 text-center rounded-2xl">
        <div className="fixed inset-0 z-[-1]">
          <Snowfall /> {/* Snowfall effect */}
        </div>
        <Lottie options={defaultOptions} height={300} width={300} />
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-600 mt-4">
          Merry Christmas!
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mt-2">
          Wishing you joy, love, and peace this holiday season! 🎄
        </p>

        <div className="mt-6">
          <audio controls muted={false} ref={audioRef} autoPlay>
            <source
              src="/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars.mp3"
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    );
  }

  // Countdown Timer
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-200 via-white to-green-200 py-6 px-4 sm:px-8">
      <h1 className="text-4xl sm:text-6xl font-bold text-green-700 mb-6">
        🎅 Countdown to Christmas 🎄
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            className="bg-white rounded-lg shadow-lg p-4 w-24 sm:w-32"
          >
            <p className="text-3xl sm:text-4xl font-extrabold text-red-600">
              {timeLeft[unit] !== undefined ? timeLeft[unit] : 0}
            </p>
            <p className="text-sm sm:text-base uppercase tracking-wide text-gray-600">
              {unit}
            </p>
          </div>
        ))}
      </div>
      <p className="text-gray-700 mt-6 text-sm sm:text-base">
        Stay tuned for a surprise on Christmas Day! 🎁
      </p>
    </div>
  );
}
