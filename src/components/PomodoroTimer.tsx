import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFocus } from "@/contexts/FocusContext";
import { toast } from "@/hooks/use-toast";

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export const PomodoroTimer = () => {
  const { addFocusSession } = useFocus();
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Auto switch between focus and break
      if (!isBreak) {
        // Focus session completed - log it
        addFocusSession(25);
        toast({
          title: "Sessão de foco concluída! 🎉",
          description: "Hora de uma pausa de 5 minutos.",
        });
      }
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? FOCUS_TIME : BREAK_TIME);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? BREAK_TIME : FOCUS_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = isBreak 
    ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100
    : ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100;

  return (
    <Card className="p-6 bg-card shadow-card hover:shadow-soft transition-shadow">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        {isBreak ? "Pausa" : "Foco"}
      </h2>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isBreak ? "relaxe" : "concentre-se"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={toggleTimer}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          onClick={resetTimer}
          size="lg"
          variant="outline"
          className="border-border hover:bg-muted"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};
