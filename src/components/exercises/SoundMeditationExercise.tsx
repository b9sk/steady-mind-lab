import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface SoundMeditationExerciseProps {
  onComplete: () => void;
  duration?: number;
}

export const SoundMeditationExercise = ({ onComplete, duration = 300 }: SoundMeditationExerciseProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSound, setCurrentSound] = useState(0);

  const sounds = [
    "Прислушайтесь к звукам вокруг вас",
    "Заметьте самый громкий звук",
    "Найдите самый тихий звук",
    "Услышьте звук своего дыхания",
    "Различите отдельные звуки в общем шуме"
  ];

  useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      if (timeLeft <= 0) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const soundTimer = setInterval(() => {
      setCurrentSound((prev) => (prev + 1) % sounds.length);
    }, duration / sounds.length * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(soundTimer);
    };
  }, [isPaused, timeLeft, onComplete, duration, sounds.length]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-12 pb-12">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
              <Volume2 className="h-16 w-16 text-primary animate-pulse-soft" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-5xl font-bold">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto min-h-[3rem] flex items-center justify-center">
              {sounds[currentSound]}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? "Продолжить" : "Пауза"}
            </Button>
            <Button variant="outline" onClick={onComplete}>
              Завершить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
