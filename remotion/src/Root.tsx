import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

// 90 seconds at 30fps = 2700 frames
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={2700}
    fps={30}
    width={1920}
    height={1080}
  />
);
