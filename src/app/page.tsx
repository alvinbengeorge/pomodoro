"use client";
import React, { useState, useEffect } from "react";
import DraggableWindow from "@/components/window";

const Home = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isCooldown) {
              clearInterval(interval!);
              setIsActive(false);
              setIsCooldown(false);
              setMinutes(25);
              setSeconds(0);
            } else {
              setMinutes(5);
              setSeconds(0);
              setIsCooldown(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds, minutes, isCooldown]);

  const toggle = () => {
    (
      document.getElementById("draggableWindow") as HTMLDialogElement
    ).showModal();
    setIsActive(!isActive);
  };

  const reset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsCooldown(false);
  };

  return (
    <div
      className={`grid place-items-center duration-500 h-screen ${isCooldown ? "bg-red-200" : "bg-green-200"}`}
    >
      <DraggableWindow />
      <div className="text-center">
        <div className="progress-bar w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className={`h-4 rounded-full animate-pulse ${isCooldown ? "bg-red-700" : "bg-green-700"}`}
            style={{ width: `${((25 - minutes) * 60 + (60 - seconds)) / 15}%` }}
          ></div>
        </div>
        <div className="grid gap-2">
          <div className="bg-black rounded-2xl p-4">
            <span className="countdown font-mono text-6xl">
              <span
                style={{ "--value": minutes } as React.CSSProperties}
              ></span>
              :
              <span
                style={{ "--value": seconds } as React.CSSProperties}
              ></span>
            </span>
          </div>
          <div className="buttons grid gap-2 grid-cols-2">
            <button
              onClick={toggle}
              className={`btn ${isCooldown ? "btn-error" : "btn-success"}`}
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={reset}
              className={`btn ${isCooldown ? "btn-error" : "btn-success"}`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
