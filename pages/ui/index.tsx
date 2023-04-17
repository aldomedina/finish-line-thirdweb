import { button, useControls } from "leva";
import { useRef } from "react";
import { getAspectRatioFromImageUrl } from "@/utils";
import createPiece from "@/sketch/createPiece";
import s from "@/styles/Home.module.scss";

const UI = () => {
  const ref = useRef<HTMLDivElement>(null);
  const vals = useControls({
    direction: { value: 0, min: -1, max: 1 },
    image: { image: undefined },
    "Create piece": button(async (get) => {
      const canvas = ref.current;
      if (!canvas) {
        alert("Bug. No canvas wrapper found.");
        return;
      }

      const image = get("image");
      if (!image) {
        alert("Upload file first");
        return;
      }

      const direction = get("direction");

      const params = {
        direction,
        url: image,
      };
      canvas.innerHTML = "";
      const aspectRatio = await getAspectRatioFromImageUrl(image);
      canvas.style.aspectRatio = aspectRatio.toString();
      const screenRatio = window.innerWidth / window.innerHeight;
      canvas.style.width = aspectRatio > screenRatio ? "100%" : "auto";
      canvas.style.height = aspectRatio > screenRatio ? "auto" : "100%";

      createPiece(canvas, params);
    }),
  });

  return <div className={s.canvasWrapper} ref={ref} />;
};

export default UI;
