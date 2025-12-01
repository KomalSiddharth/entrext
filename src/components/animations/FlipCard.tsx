import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FlipCardProps {
  stepNumber: number;
  title: string;
  description: string;
  exampleText: string;
  imageSrc: string;
  imageAlt: string;
  autoFlipDelay?: number;
}

export default function FlipCard({
  stepNumber,
  title,
  description,
  exampleText,
  imageSrc,
  imageAlt,
  autoFlipDelay = 3000,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, autoFlipDelay);

    return () => clearInterval(interval);
  }, [autoFlipDelay]);

  return (
    <div className="relative h-[400px] xl:h-[450px] perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <Card className="absolute inset-0 bg-card border-border hover-lift backface-hidden">
          <CardContent className="p-8 xl:p-10 h-full flex flex-col">
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-2xl xl:text-3xl font-bold text-primary-foreground">
                  {stepNumber}
                </span>
              </div>
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <h3 className="text-2xl xl:text-3xl font-semibold mb-4 text-card-foreground">
                {title}
              </h3>
              <p className="text-base xl:text-lg text-card-foreground/70 leading-relaxed flex-1">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 flex items-center justify-center p-8">
              <div className="text-center animate-fade-in">
                <p className="text-xl xl:text-3xl font-bold text-foreground mb-2 text-glow">
                  {exampleText}
                </p>
                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm xl:text-base font-semibold text-primary">
                      Step {stepNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
