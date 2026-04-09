import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Background } from "./components/Background";
import { Scene1_Opening } from "./scenes/Scene1_Opening";
import { Scene2_Problem } from "./scenes/Scene2_Problem";
import { Scene3_Contrast } from "./scenes/Scene3_Contrast";
import { Scene4_Solution } from "./scenes/Scene4_Solution";
import { Scene5_DemoCall1 } from "./scenes/Scene5_DemoCall1";
import { Scene6_DemoCall2 } from "./scenes/Scene6_DemoCall2";
import { Scene7_Transfer } from "./scenes/Scene7_Transfer";
import { Scene8_Results } from "./scenes/Scene8_Results";
import { Scene9_Closing } from "./scenes/Scene9_Closing";

// 90s at 30fps = 2700 frames
// Scene durations (frames) - transitions overlap by 20 frames each
// 1: Opening (300) + 2: Problem (300) + 3: Contrast (240) + 4: Solution (360)
// + 5: Demo1 (330) + 6: Demo2 (270) + 7: Transfer (300) + 8: Results (270) + 9: Closing (270)
// Total raw: 2640, minus 8 transitions × 20 = 160, net = 2480 → pad scene durations up
// Adjusted: 330 + 320 + 260 + 380 + 350 + 290 + 320 + 280 + 330 = 2860, minus 160 = 2700 ✓

const T = 20; // transition duration in frames

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={330}>
          <Scene1_Opening />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={320}>
          <Scene2_Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <Scene3_Contrast />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={380}>
          <Scene4_Solution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={350}>
          <Scene5_DemoCall1 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={290}>
          <Scene6_DemoCall2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={320}>
          <Scene7_Transfer />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={280}>
          <Scene8_Results />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={330}>
          <Scene9_Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
