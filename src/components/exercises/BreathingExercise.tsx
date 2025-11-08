import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWakeLock } from "@/hooks/use-wake-lock";

interface BreathingExerciseProps {
  onComplete: () => void;
  duration?: number;
}

type Phase = "inhale" | "hold1" | "exhale" | "hold2";

export const BreathingExercise = ({ onComplete, duration = 300 }: BreathingExerciseProps) => {
  useWakeLock();
  const [phase, setPhase] = useState<Phase>("inhale");
  const [countdown, setCountdown] = useState(4);
  const [cycle, setCycle] = useState(0);
  const totalCycles = Math.floor(duration / 20); // ~20 секунд на цикл

  const phaseData = {
    inhale: { text: "Вдох", duration: 4, next: "hold1" as Phase },
    hold1: { text: "Задержите", duration: 7, next: "exhale" as Phase },
    exhale: { text: "Выдох", duration: 8, next: "hold2" as Phase },
    hold2: { text: "Пауза", duration: 1, next: "inhale" as Phase },
  };

  useEffect(() => {
    if (cycle >= totalCycles) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const currentPhase = phaseData[phase];
          const nextPhase = currentPhase.next;
          setPhase(nextPhase);
          
          if (nextPhase === "inhale") {
            setCycle((c) => c + 1);
          }
          
          return phaseData[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, cycle, totalCycles, onComplete]);

  const progress = ((cycle * 100) / totalCycles).toFixed(0);
  const currentPhaseData = phaseData[phase];

  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-12 pb-12">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Цикл {cycle + 1} из {totalCycles}
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="relative">
            <div
              className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center transition-all duration-1000 ${
                phase === "inhale" ? "scale-110 bg-primary/20" :
                phase === "hold1" ? "scale-110 bg-accent/20" :
                phase === "exhale" ? "scale-90 bg-secondary/20" :
                "scale-90 bg-muted"
              }`}
              style={{
                boxShadow: phase === "hold1" || phase === "inhale" 
                  ? "0 0 60px rgba(45, 156, 219, 0.4)" 
                  : "none"
              }}
            >
              <div className="text-center">
                <p className="text-5xl font-bold">{countdown}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentPhaseData.text}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium">Техника 4-7-8</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Вдох через нос на 4 счёта, задержка на 7 счётов, выдох через рот на 8 счётов
            </p>
          </div>

          <Button variant="outline" onClick={onComplete}>
            Завершить досрочно
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
