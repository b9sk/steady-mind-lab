import { Card, CardContent } from "@/components/ui/card";
import { getTodaySessions, getTotalSessions } from "@/lib/storage";
import { CheckCircle2, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatisticsChart } from "./StatisticsChart";

export const ProgressStats = () => {
  const { t } = useTranslation();
  const todaySessions = getTodaySessions().length;
  const totalSessions = getTotalSessions();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todaySessions}</p>
                <p className="text-sm text-muted-foreground">{t('stats.today')}</p>
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
                <p className="text-sm text-muted-foreground">{t('stats.total')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <StatisticsChart />
    </div>
  );
};
