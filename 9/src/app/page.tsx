"use client";

import { motion } from "motion/react";
import { ReactElement, useEffect, useState } from "react";

/*
Cursor Sources:
https://custom-cursor.com/en/collection/christmas/x-mas-tree-polar-bear
https://custom-cursor.com/en/collection/christmas/christmas-snowman-snowflake-cookie
https://custom-cursor.com/en/collection/christmas/xmas-elves
 */

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const cursorImages = [
  "cursors/1.png",
  "cursors/2.png",
  "cursors/3.png",
  "cursors/4.png",
  "cursors/5.png",
  "cursors/6.png",
];

const maxLightSize = 120;

const Snowflake = () => {
  const randomRotationDirection = Math.random() < 0.5 ? 1 : -1;

  const initialX = `${Math.floor(Math.random() * 100)}vw`;

  return (
    <motion.p
      initial={{ y: "0", x: initialX }}
      animate={{
        y: "100vh",
        rotate: randomRotationDirection * 360,
      }}
      transition={{
        repeat: Infinity,
        duration: clamp(Math.random() * 10, 3, 10),
        ease: "linear",
        repeatDelay: Math.floor(Math.random() * 5),
      }}
      className="absolute z-[-1]"
    >
      ❄️
    </motion.p>
  );
};

export default function Home() {
  const [cursorIndex, setCursorIndex] = useState(0);

  const [lights, setLights] = useState<ReactElement[]>([]);
  useEffect(() => {
    const createLights = () => {
      const newLights: React.ReactElement[] = [];
      for (let i = 0; i < window.innerWidth / maxLightSize; i++) {
        const size = clamp(Math.random() * 100, 50, maxLightSize);
        newLights.push(
          <div
            key={`light-${i}`}
            id={`light-${i}`}
            className={"rounded-full transition-opacity duration-1000 blur"}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: `hsl(${Math.random() * 100}, 100%, 50%)`,
              marginTop: `${clamp(Math.random() * 10, 0, 10)}%`,
              opacity: 1,
            }}
          />,
        );
      }
      setLights(newLights);
    };

    createLights();
  }, []);

  useEffect(() => {
    const randomDimEffect = () => {
      const intervalId = setInterval(() => {
        const lightElement = document.getElementById(
          `light-${Math.floor(Math.random() * lights.length)}`,
        );
        if (lightElement) {
          lightElement.style.opacity = `${Math.random() * 0.5 + 0.2}`;
          setTimeout(() => {
            lightElement.style.opacity = `1`;
          }, Math.random() * 1000);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    };

    const cleanup = randomDimEffect();

    return () => {
      cleanup();
    };
  }, [lights]);

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

  return (
    <main
      style={{
        cursor: `url(${cursorImages[cursorIndex]}), auto`,
      }}
      suppressHydrationWarning
    >
      <div
        className={
          "absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 text-center select-none w-[100vw] h-[100vh]"
        }
      >
        <div
          className={
            "absolute top-1/4 w-[100vw] h-[20vh] inline-flex left-0 justify-evenly"
          }
        >
          {lights}
        </div>
        <div
          className={
            "bg-gray-700 p-2 rounded-3xl w-[200px] bottom-1 right-1 absolute"
          }
        >
          <p className={"text-3xl"}>Cursors</p>
          <div
            className={
              "grid grid-cols-3 grid-rows-2 justify-center items-center place-items-center gap-1"
            }
          >
            {cursorImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCursorIndex(index)}
                className={
                  "bg-gray-800 p-2 rounded-full size-[48px] hover:bg-gray-500 hover:border-gray-800 hover:border"
                }
                style={{
                  cursor: `url(${image}), pointer`,
                }}
              >
                <img src={image} className={"pointer-events-none"} />
              </button>
            ))}
          </div>
          <p className={"text-gray-300 mt-1"}>
            Press on the cursors to change the cursor
          </p>
        </div>
      </div>
      <div className={"overflow-hidden"}>{snowflakes}</div>
    </main>
  );
}
