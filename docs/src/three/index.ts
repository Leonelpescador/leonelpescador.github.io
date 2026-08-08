import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";
import { raycast } from "./utils/raycast";

let canvas: HTMLCanvasElement | null = null;

const init = (_canvas: HTMLCanvasElement) => {
  canvas = _canvas;

  return new Promise<boolean>((resolve) => {
    const setup = () => {
      if (resources.hasErrors) {
        resolve(false);
        return;
      }

      try {
        threeSizes.init(_canvas);
        camera.init();
        renderTarget.init();
        renderer.init(canvas);
        objects.init();
        raycast.init();
        resolve(true);
      } catch (error) {
        console.error("[Three] Scene initialization failed", error);
        destroy();
        resolve(false);
      }
    };

    if (resources.isReady) setup();
    else resources.once("ready", setup);

    resources.startLoading();
  });
};

const destroy = () => {
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
  canvas = null;
};

export const three = { init, destroy };
