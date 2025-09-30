import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const motivationalQuotes = [
  {
    text: "A concentração é a raiz de todas as habilidades superiores.",
    author: "Bruce Lee",
  },
  {
    text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    author: "Robert Collier",
  },
  {
    text: "Concentre-se em ser produtivo, não em estar ocupado.",
    author: "Tim Ferriss",
  },
  {
    text: "A melhor maneira de começar é parar de falar e começar a fazer.",
    author: "Walt Disney",
  },
  {
    text: "Foco não significa dizer sim, significa dizer não para milhares de outras boas ideias.",
    author: "Steve Jobs",
  },
  {
    text: "Um objetivo bem definido é meio caminho andado.",
    author: "Abraham Lincoln",
  },
  {
    text: "A disciplina é a ponte entre metas e realizações.",
    author: "Jim Rohn",
  },
  {
    text: "Você não precisa ser grande para começar, mas precisa começar para ser grande.",
    author: "Zig Ziglar",
  },
];

export const MotivationalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length);
  };

  const currentQuote = motivationalQuotes[currentIndex];

  return (
    <Card className="p-6 bg-card shadow-card hover:shadow-soft transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Inspiração
      </h2>

      <div className="relative min-h-[200px] flex flex-col justify-between">
        {/* Quote Content */}
        <div className="flex-1 flex flex-col justify-center px-4 py-6">
          <blockquote className="text-center space-y-4 animate-fade-in">
            <p className="text-lg font-medium text-foreground leading-relaxed italic">
              "{currentQuote.text}"
            </p>
            <footer className="text-sm text-muted-foreground">
              — {currentQuote.author}
            </footer>
          </blockquote>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-4">
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {motivationalQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para frase ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-progress" />
          </div>
        )}
      </div>
    </Card>
  );
};
