import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, CloudRain, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

type SoundType = "none" | "rain" | "forest";

export const AmbientSounds = () => {
  const [selectedSound, setSelectedSound] = useState<SoundType>("none");
  const [volume, setVolume] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulated sound URLs (in production, you'd have actual audio files)
  const soundUrls = {
    rain: "https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce97.mp3",
    forest: "https://cdn.pixabay.com/audio/2022/03/10/audio_4dedf26301.mp3",
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const toggleSound = (sound: SoundType) => {
    if (sound === "none") {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      setSelectedSound("none");
      return;
    }

    if (selectedSound === sound && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = soundUrls[sound];
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Audio playback failed");
        });
        setIsPlaying(true);
        setSelectedSound(sound);
      }
    }
  };

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <Card className="p-6 bg-card shadow-card hover:shadow-soft transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Sons Ambientes</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => toggleSound("none")}
            variant={selectedSound === "none" ? "default" : "outline"}
            className={
              selectedSound === "none"
                ? "bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
            }
          >
            <VolumeX className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => toggleSound("rain")}
            variant={selectedSound === "rain" && isPlaying ? "default" : "outline"}
            className={
              selectedSound === "rain" && isPlaying
                ? "bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
            }
          >
            <CloudRain className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => toggleSound("forest")}
            variant={selectedSound === "forest" && isPlaying ? "default" : "outline"}
            className={
              selectedSound === "forest" && isPlaying
                ? "bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
            }
          >
            <Trees className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Volume</span>
            <span className="text-sm font-medium text-foreground">{volume[0]}%</span>
          </div>
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
              disabled={selectedSound === "none"}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {selectedSound === "none" && "Selecione um som ambiente"}
            {selectedSound === "rain" && isPlaying && "🌧️ Som de chuva"}
            {selectedSound === "forest" && isPlaying && "🌲 Sons da floresta"}
            {selectedSound !== "none" && !isPlaying && "Pausado"}
          </p>
        </div>
      </div>
    </Card>
  );
};
