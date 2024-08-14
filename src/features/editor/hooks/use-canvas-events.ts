import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  canvas,
  save,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => save());
      canvas.on("selection:created", (e) => {
        console.log("selection:clereaed");
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        console.log("selection:updated");
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", () => {
        console.log("selection:cleared");
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }
    return () => {
      if (canvas) {
        canvas?.off("object:added");
        canvas?.off("object:removed");
        canvas?.off("object:modified");
        canvas?.off("selection:created");
        canvas?.off("selection:updated");
        canvas?.off("selection:cleared");
      }
    };
  }, [canvas, save, setSelectedObjects, clearSelectionCallback]);
};