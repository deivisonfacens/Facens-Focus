import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFocus } from "@/contexts/FocusContext";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const { addCompletedTask } = useFocus();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          // If marking as completed, log it
          if (newCompleted) {
            addCompletedTask();
          }
          return { ...todo, completed: newCompleted };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Card className="p-6 bg-card shadow-card hover:shadow-soft transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Tarefas</h2>

      <div className="flex gap-2 mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nova tarefa..."
          className="flex-1 bg-background border-border"
        />
        <Button
          onClick={addTodo}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma tarefa adicionada
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="border-border data-[state=checked]:bg-primary"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {todo.text}
              </span>
              <Button
                onClick={() => deleteTodo(todo.id)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
