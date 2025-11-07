import { useParams, useNavigate } from "react-router-dom";
import { exercises } from "@/data/exercises";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { addSession } from "@/lib/storage";
import { BreathingExercise } from "@/components/exercises/BreathingExercise";
import { VisualFocusExercise } from "@/components/exercises/VisualFocusExercise";
import { SoundMeditationExercise } from "@/components/exercises/SoundMeditationExercise";
import { MindfulObservationExercise } from "@/components/exercises/MindfulObservationExercise";

const exerciseComponents = {
  "breathing-478": BreathingExercise,
  "visual-focus": VisualFocusExercise,
  "sound-meditation": SoundMeditationExercise,
  "mindful-observation": MindfulObservationExercise,
};

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exercise = exercises.find((e) => e.id === id);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!exercise) {
      navigate("/");
    }
  }, [exercise, navigate]);

  if (!exercise) return null;

  const ExerciseComponent = exerciseComponents[exercise.id as keyof typeof exerciseComponents];

  const handleComplete = () => {
    addSession({
      exerciseId: exercise.id,
      date: new Date().toISOString(),
      duration: exercise.duration || 0,
      completed: true,
    });
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        {!started && !completed && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{exercise.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  {exercise.description}
                </p>

                <div>
                  <h3 className="font-semibold mb-3">Польза упражнения:</h3>
                  <ul className="space-y-2">
                    {exercise.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exercise.duration && (
                  <p className="text-sm text-muted-foreground">
                    Длительность: {Math.floor(exercise.duration / 60)} минут
                  </p>
                )}

                <Button
                  onClick={() => setStarted(true)}
                  size="lg"
                  className="w-full"
                >
                  Начать упражнение
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {started && !completed && ExerciseComponent && (
          <ExerciseComponent onComplete={handleComplete} duration={exercise.duration} />
        )}

        {completed && (
          <Card className="animate-scale-in">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Упражнение завершено!</h2>
              <p className="text-muted-foreground">
                Отличная работа! Регулярная практика поможет вам улучшить концентрацию.
              </p>
              <Button onClick={() => navigate("/")} size="lg">
                Вернуться на главную
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Exercise;
