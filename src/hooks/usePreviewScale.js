import { useEffect, useState } from "react";
import { EXPORT_SIZE } from "../lib/defaults";

const MIN_SCALE = 0.2;

function getPreviewPadding(width) {
  if (width <= 620) return 48;
  if (width <= 1100) return 72;
  return 120;
}

export function usePreviewScale(previewRef) {
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const previewNode = previewRef.current;
    if (!previewNode) return undefined;

    function computeScale() {
      const rect = previewNode.getBoundingClientRect();
      const previewPadding = getPreviewPadding(rect.width);
      const availableWidth = rect.width - previewPadding;
      const availableHeight = rect.height - previewPadding;
      const nextScale = Math.min(
        availableWidth / EXPORT_SIZE,
        availableHeight / EXPORT_SIZE,
        1
      );

      setScale(Math.max(nextScale, MIN_SCALE));
    }

    const resizeObserver =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(computeScale)
        : null;

    computeScale();
    resizeObserver?.observe(previewNode);
    window.addEventListener("resize", computeScale);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", computeScale);
    };
  }, [previewRef]);

  return scale;
}
