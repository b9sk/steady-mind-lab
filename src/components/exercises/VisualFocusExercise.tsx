import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useWakeLock } from "@/hooks/use-wake-lock";
import { useTranslation } from "react-i18next";

interface VisualFocusExerciseProps {
  onComplete: () => void;
  duration?: number;
}

export const VisualFocusExercise = ({ onComplete, duration = 180 }: VisualFocusExerciseProps) => {
  useWakeLock();
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      if (timeLeft <= 0) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, onComplete]);

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
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Eye className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-5xl font-bold">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {t('visualFocus.instruction')}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? t('visualFocus.continue') : t('visualFocus.pause')}
            </Button>
            <Button variant="outline" onClick={onComplete}>
              {t('visualFocus.complete')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
