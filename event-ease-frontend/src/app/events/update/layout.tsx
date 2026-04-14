import { DottedGlowBackground } from "@/components/magicUI/DottedGlow";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mt-17 ">
      <DottedGlowBackground
        gap={25}
        radius={6.4}
        color="rgba(255, 0, 0, 0.75)"
        darkColor="rgba(255, 50, 50, 0.7)"
        glowColor="rgba(255, 60, 60, 1)"
        darkGlowColor="rgba(80, 200, 255, 1)"
        opacity={1}
        backgroundOpacity={1}
        speedMin={0.2}
        speedMax={0.8}
        className="bg-stone-950 h-full"
      />
      {children}
    </div>
  );
}
