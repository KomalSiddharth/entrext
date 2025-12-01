import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

export default function AnimatedText({ text, className = "", delay = 0, gradient = false }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`word-reveal inline-block mr-2 ${gradient ? 'gradient-text' : ''}`}
          style={{
            animationDelay: `${delay + index * 0.1}s`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
