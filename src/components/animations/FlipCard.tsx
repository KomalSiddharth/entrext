import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FlipCardProps {
  stepNumber: number;
  title: string;
  description: string;
  exampleText: string;
  imageSrc: string;
  imageAlt: string;
}

export default function FlipCard({
  stepNumber,
  title,
  description,
  exampleText,
  imageSrc,
  imageAlt,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[400px] xl:h-[450px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
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
              <h3 className="text-2xl xl:text-3xl font-semibold mb-4 text-foreground">
                {title}
              </h3>
              <p className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-6 flex-1">
                {description}
              </p>
              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <p className="text-sm text-muted-foreground italic">
                  {exampleText}
                </p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-primary font-medium">Click to see example</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="absolute inset-0 bg-card border-border backface-hidden rotate-y-180">
          <CardContent className="p-0 h-full relative overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent flex items-end justify-center p-8">
              <div className="text-center animate-slide-up">
                <div className="mb-4">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl xl:text-3xl font-bold text-primary">
                      {stepNumber}
                    </span>
                  </div>
                </div>
                <p className="text-lg xl:text-2xl font-semibold text-foreground mb-3 animate-fade-in">
                  {exampleText}
                </p>
                <p className="text-xs text-primary font-medium">Click to flip back</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
