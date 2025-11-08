import { exercises } from "@/data/exercises";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ProgressStats } from "@/components/ProgressStats";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('app.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('app.subtitle')}
          </p>
        </header>

        {/* Stats */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <ProgressStats />
        </div>

        {/* Exercises */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('home.exercises')}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {exercises.map((exercise, index) => (
              <div 
                key={exercise.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <ExerciseCard exercise={exercise} />
              </div>
            ))}
          </div>
        </section>

        {/* Info */}
        <section className="text-center space-y-3 py-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t('home.infoText')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
