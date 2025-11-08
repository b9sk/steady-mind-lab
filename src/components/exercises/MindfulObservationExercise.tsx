import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useWakeLock } from "@/hooks/use-wake-lock";

interface MindfulObservationExerciseProps {
  onComplete: () => void;
  duration?: number;
}

export const MindfulObservationExercise = ({ onComplete, duration = 600 }: MindfulObservationExerciseProps) => {
  useWakeLock();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const prompts = [
    "Просто наблюдайте за своим дыханием",
    "Заметьте любые мысли без осуждения",
    "Отметьте физические ощущения в теле",
    "Наблюдайте эмоции как облака на небе",
    "Просто будьте здесь и сейчас",
    "Заметьте звуки вокруг вас",
    "Почувствуйте точки контакта тела с поверхностью",
    "Отпустите желание что-то изменить",
    "Вернитесь к дыханию, если отвлеклись",
    "Заметьте температуру воздуха на коже",
    "Наблюдайте паузу между вдохом и выдохом",
    "Примите этот момент таким, какой он есть"
  ];

  useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      if (timeLeft <= 0) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const promptTimer = setInterval(() => {
      setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    }, 50000); // 50 секунд на каждую подсказку

    return () => {
      clearInterval(timer);
      clearInterval(promptTimer);
    };
  }, [isPaused, timeLeft, onComplete, duration, prompts.length]);

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
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
              <Brain className="h-16 w-16 text-secondary animate-breathe" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-5xl font-bold">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </p>
            <p 
              key={currentPrompt}
              className="text-lg text-muted-foreground max-w-md mx-auto min-h-[3rem] flex items-center justify-center animate-fade-in"
            >
              {prompts[currentPrompt]}
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
