import { PomodoroTimer } from "@/components/PomodoroTimer";
import { TodoList } from "@/components/TodoList";
import { CompactCalendar } from "@/components/CompactCalendar";
import { AmbientSounds } from "@/components/AmbientSounds";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-spa">
      {/* Header */}
      <header className="py-8 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              FocusSpa
            </h1>
          </div>
          <p className="text-muted-foreground">
            Seu espaço de tranquilidade e produtividade
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-scale-in">
          {/* Pomodoro Timer */}
          <div className="md:col-span-1">
            <PomodoroTimer />
          </div>

          {/* Todo List */}
          <div className="md:col-span-1">
            <TodoList />
          </div>

          {/* Calendar */}
          <div className="md:col-span-1">
            <CompactCalendar />
          </div>

          {/* Ambient Sounds */}
          <div className="md:col-span-1">
            <AmbientSounds />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Respire fundo, concentre-se e seja produtivo ✨</p>
      </footer>
    </div>
  );
};

export default Index;
