import { Card, CardContent } from "@/components/ui/card";
import { getTodaySessions, getTotalSessions } from "@/lib/storage";
import { CheckCircle2, Flame } from "lucide-react";

export const ProgressStats = () => {
  const todaySessions = getTodaySessions().length;
  const totalSessions = getTotalSessions();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{todaySessions}</p>
              <p className="text-sm text-muted-foreground">Сегодня</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-secondary/10">
              <Flame className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalSessions}</p>
              <p className="text-sm text-muted-foreground">Всего</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
