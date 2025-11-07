export interface Exercise {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration?: number;
  benefits: string[];
}

export interface ExerciseSession {
  exerciseId: string;
  date: string;
  duration: number;
  completed: boolean;
}
