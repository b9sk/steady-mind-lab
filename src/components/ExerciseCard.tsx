import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types/exercise";
import { Wind, Eye, Music, Brain, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExerciseCardProps {
  exercise: Exercise;
}

const iconMap = {
  Wind,
  Eye,
  Music,
  Brain
};

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const navigate = useNavigate();
  const Icon = iconMap[exercise.icon as keyof typeof iconMap];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {exercise.duration && (
            <span className="text-sm text-muted-foreground">
              {Math.floor(exercise.duration / 60)} мин
            </span>
          )}
        </div>
        <CardTitle className="mt-4">{exercise.title}</CardTitle>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => navigate(`/exercise/${exercise.id}`)}
          className="w-full group"
        >
          Начать
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
