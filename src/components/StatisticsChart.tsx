import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getDailyStats, getTotalSessions } from "@/lib/storage";
import { exercises } from "@/data/exercises";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export const StatisticsChart = () => {
  const { t } = useTranslation();
  const dailyStats = getDailyStats(7);
  const totalSessions = getTotalSessions();
  const hasData = totalSessions > 0;

  const chartConfig = {
    total: {
      label: t('stats.chart.total'),
      color: "hsl(var(--primary))",
    },
    ...exercises.reduce((acc, exercise) => {
      acc[exercise.id] = {
        label: t(`exercises.${exercise.id}.title`),
        color: `hsl(var(--chart-${exercises.indexOf(exercise) + 1}))`,
      };
      return acc;
    }, {} as any),
  };

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('stats.chart.title')}</CardTitle>
          <CardDescription>{t('stats.chart.description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="rounded-full bg-muted p-6">
            <TrendingUp className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">{t('stats.chart.emptyTitle')}</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t('stats.chart.emptyDescription')}
            </p>
          </div>
          <Button className="mt-4" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            {t('stats.chart.emptyCta')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('stats.chart.title')}</CardTitle>
        <CardDescription>{t('stats.chart.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={dailyStats} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
              }}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            {exercises.map((exercise, index) => (
              <Area
                key={exercise.id}
                type="monotone"
                dataKey={exercise.id}
                stackId="1"
                stroke={`hsl(var(--chart-${index + 1}))`}
                fill={`hsl(var(--chart-${index + 1}))`}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
