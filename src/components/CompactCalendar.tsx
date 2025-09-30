import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { ptBR } from "date-fns/locale";

export const CompactCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-6 bg-card shadow-card hover:shadow-soft transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Calendário</h2>
      
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          className="rounded-lg border-0 pointer-events-auto"
        />
      </div>

      {date && (
        <div className="mt-4 p-3 rounded-lg bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">Data selecionada:</p>
          <p className="font-medium text-foreground">
            {date.toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </Card>
  );
};
