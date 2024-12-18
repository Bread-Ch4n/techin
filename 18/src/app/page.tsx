"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { ReactElement, useEffect, useState } from "react";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const Snowflake = () => {
  const randomRotationDirection = Math.random() < 0.5 ? 1 : -1;

  const initialX = `${Math.floor(Math.random() * 100)}vw`;

  return (
    <motion.p
      initial={{
        y: "0",
        x: initialX,
        scale: clamp(Math.random(), 0.8, 1),
      }}
      animate={{
        y: "100vh",
        rotate: randomRotationDirection * 360,
      }}
      transition={{
        repeat: Infinity,
        duration: clamp(Math.random() * 5, 3, 5),
        ease: "linear",
        repeatDelay: Math.floor(Math.random() * 10),
      }}
      className="absolute z-[-1]"
    >
      ❄️
    </motion.p>
  );
};

const FlickeringLight: React.FC<{ color: string }> = ({ color }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const flickerInterval = setInterval(
      () => {
        const randomOpacity = Math.random() * (1 - 0.3) + 0.3;
        setOpacity(randomOpacity);
        setTimeout(() => setOpacity(1), Math.random() * 500);
      },
      Math.random() * 500 + 1000,
    );

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div
      style={{
        opacity: opacity,
        transition: "opacity 0.2s ease-in-out",
        backgroundColor: color,
      }}
      className={"rounded-full size-[100px] blur-3xl"}
    />
  );
};

const FlickeringLightsGroup: React.FC = () => {
  const [randomizedLights, setRandomizedLights] = useState<ReactElement[]>([]);

  const lights = [
    "yellow",
    "red",
    "yellow",
    "blue",
    "purple",
    "orange",
    "green",
  ];

  useEffect(() => {
    setRandomizedLights(
      lights.map((color, i) => (
        <div
          key={`light-${i}-${color}`}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: "-1",
          }}
        >
          <FlickeringLight color={color} />
        </div>
      )),
    );
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "-1",
      }}
    >
      {randomizedLights}
    </div>
  );
};

export default function Home() {
  const [snowflakes, setSnowflakes] = useState<ReactElement[]>([]);

  useEffect(() => {
    const newSnowflakes: ReactElement[] = [];
    for (let i = 0; i < 10; i++) {
      newSnowflakes.push(
        <div key={`snowflake-${i}`}>
          <Snowflake />
        </div>,
      );
    }
    setSnowflakes(newSnowflakes);
  }, []);

  const [list, setList] = useState<{ [key: string]: number }[]>([]);

  function updateList(str: string) {
    if (str.trim().replace(/,+/g, "") === "") {
      setList([]);
      return;
    }
    const capitalize = (word: string): string => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    const wordCount: Record<string, number> = {};
    str.split(",").forEach((word) => {
      const lowerCaseWord = word
        .trim()
        .replace(/\s*,\s*/g, ",")
        .toLowerCase();
      if (lowerCaseWord !== "") {
        wordCount[lowerCaseWord] = (wordCount[lowerCaseWord] || 0) + 1;
      }
    });

    const result = [];
    for (const [word, count] of Object.entries(wordCount)) {
      result.push({ [capitalize(word)]: count });
    }

    setList(result.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]));
  }

  return (
    <main suppressHydrationWarning>
      <div
        className={
          "absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-center flex flex-col gap-1"
        }
      >
        <h1 className={"font-bold leading-tight text-xl"}>
          Season’s greetings! What flavors of froyo would you like to enjoy
          today?
        </h1>
        <p>
          Simply type them in, separated by commas, and let us whip up a winter
          wonderland of flavors just for you!
        </p>
        <input
          className={
            "bg-background border border-foreground rounded-2xl outline-none p-2 m-2 text-center"
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") updateList(e.currentTarget.value);
          }}
        />
        {list.length >= 1 && (
          <h1 className={"font-bold leading-tight text-xl"}>
            🎅 Froyo Flavor Totals: 🎅
          </h1>
        )}
        <AnimatePresence>
          <div className={"overflow-y-auto h-[20vh]"}>
            {list.map((item) => {
              const word = Object.keys(item)[0];
              const count = item[word];

              return (
                <motion.div
                  key={word}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 1 }}
                >
                  {word}:{" "}
                  <motion.span
                    key={`count-${count}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.5 }}
                  >
                    {count}
                  </motion.span>{" "}
                  serving{count > 1 && "s"}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
      <div className={"overflow-hidden"}>{snowflakes}</div>
      <FlickeringLightsGroup />
    </main>
  );
}
