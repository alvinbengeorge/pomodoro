import React, { useState, useEffect } from "react";

const DraggableWindow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState<{ x: number; y: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const pos = { x: e.pageX - position.x, y: e.pageY - position.y };
    setRel(pos);
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.pageX - (rel?.x || 0), y: e.pageY - (rel?.y || 0) });
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    setPosition({
      x: window.innerWidth / 2 - 280,
      y: window.innerHeight / 2 - 200,
    });
  });

  return (
    <dialog
      className="absolute"
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex: 1000 }}
      onMouseDown={onMouseDown}
      id="draggableWindow"
    >
      <div className="bg-base-300 border  rounded-2xl">
        <div className="bg-base-200 p-2 rounded-2xl">
          <div className="grid grid-cols-3">
            <button
              className="bg-red-600 w-3 h-3 rounded-full hover:bg-red-300 duration-500"
              onClick={() => {
                (
                  document.getElementById(
                    "draggableWindow",
                  ) as HTMLDialogElement
                ).close();
              }}
            ></button>
          </div>
        </div>
        <div className="p-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CS0UAH2UhQw?si=FsvlOCeK0z5XZCqj"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </dialog>
  );
};

export default DraggableWindow;
