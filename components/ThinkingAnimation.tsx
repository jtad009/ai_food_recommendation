import { ChefHat, UtensilsCrossed, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ThinkingAnimation() {
  const thinkingMessages = ["Thinking", "Considering", "Analyzing"];
  const [thinkingText, setThinkingText] = useState(thinkingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg =
        thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
      setThinkingText(randomMsg);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 max-w-lg">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Animated Chef Hat */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#213D34] to-[#325647] rounded-xl flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-[#D9EF78]" />
            </div>

            {/* Floating sparkles */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-[#D9EF78] rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#D9EF78]/70 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </motion.div>

          {/* Animated cooking utensils */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <UtensilsCrossed className="w-4 h-4 text-[#213D34]/60" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <Flame className="w-4 h-4 text-[#D9EF78]" />
            </motion.div>
          </div>

          {/* Thinking text with animated dots */}
          <div className="flex items-center gap-1">
            <span className="text-[#213D34]/80 text-sm">{thinkingText}</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-[#213D34]/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
