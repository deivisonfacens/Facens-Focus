import { Card } from "@/components/ui/card";
import { useFocus } from "@/contexts/FocusContext";
import { TrendingUp, Clock, CheckCircle2, Target } from "lucide-react";

export const PerformanceReport = () => {
  const { getWeeklyStats } = useFocus();
  const stats = getWeeklyStats();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  return (
    <Card className="p-6 bg-card shadow-card hover:shadow-soft transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Relatório Semanal
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Tempo focado</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatTime(stats.totalFocusMinutes)}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-secondary/30 border border-secondary/40">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-secondary-foreground" />
            <span className="text-xs text-muted-foreground">Tarefas</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.totalTasksCompleted}
          </p>
        </div>
      </div>

      {/* Daily Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Últimos 7 dias</span>
        </div>

        {stats.dailyStats.map((day, index) => {
          const maxMinutes = Math.max(...stats.dailyStats.map((d) => d.focusMinutes), 1);
          const barWidth = (day.focusMinutes / maxMinutes) * 100;

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground capitalize w-12">{day.day}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-foreground font-medium">
                    {day.focusMinutes > 0 ? formatTime(day.focusMinutes) : "-"}
                  </span>
                  {day.tasksCompleted > 0 && (
                    <span className="text-muted-foreground">
                      {day.tasksCompleted} tarefa{day.tasksCompleted !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 rounded-full"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {stats.totalFocusMinutes === 0 && stats.totalTasksCompleted === 0 && (
        <div className="mt-6 p-4 rounded-lg bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">
            Complete sessões de foco e tarefas para ver suas estatísticas!
          </p>
        </div>
      )}
    </Card>
  );
};
