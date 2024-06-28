import React, { useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import chroma from 'chroma-js';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateQuizDialog } from './create-quiz';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CreateQuiz } from './create-card';

const queryClient = new QueryClient();

interface ExampleProps {
  width: number;
  height: number;
  formattedTopics: WordData[];
}

export interface WordData {
  text: string;
  value: number;
}

export default function Example({ width, height, formattedTopics }: ExampleProps) {
  const router = useRouter();
  const [spiralType, setSpiralType] = useState<'archimedean' | 'rectangular'>('archimedean');
  const [withRotation, setWithRotation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null); // Track selected word

  const theme = useTheme(); // Assuming you have a hook to get the current theme

  // Define colors for light and dark themes
  const lightModeColors = ['#F7951D', '#FF6600', '#FF3300'];
  const darkModeColors = ['#F7951D', '#E53E3E', '#4299E1'];

  // Generate gradient colors based on the current theme
  const colors = chroma.scale(theme.theme === 'dark' ? darkModeColors : lightModeColors).colors(formattedTopics.length);

  const fontScale = scaleLog({
    domain: [Math.min(...formattedTopics.map((w) => w.value)), Math.max(...formattedTopics.map((w) => w.value))],
    range: [10, 100],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;

  type SpiralType = 'archimedean' | 'rectangular';

  const handleWordClick = (word: string) => {
    setSelectedWord(word); // Set selected word to trigger dialog render
  };

  const handleMouseEnter = (word: string) => {
    setHoveredWord(word);
  };

  const handleMouseLeave = () => {
    setHoveredWord(null);
  };

  return (
    <div className="wordcloud h-[550px] max-h-[850px]">
      <QueryClientProvider client={queryClient}>
        <Wordcloud
          words={formattedTopics}
          width={width}
          height={height}
          fontSize={fontSizeSetter}
          font={'Impact'}
          padding={6}
          spiral={spiralType}
          rotate={withRotation ? getRotationDegree() : 0}
          random={fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <AlertDialog key={w.text}>
                <AlertDialogTrigger asChild>
                  <Text
                    fill={hoveredWord === w.text ? theme.theme === 'dark' ? "#fff" : "#333" : colors[i % colors.length]}
                    textAnchor={'middle'}
                    transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                    fontSize={w.size}
                    fontFamily={w.font}
                    className={cn('cursor-pointer hover:border-blue-800 transition')}
                    onMouseEnter={() => handleMouseEnter(w.text!)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleWordClick(w.text!)}
                  >
                    {w.text}
                  </Text>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <CreateQuiz topic={w.text!} />
                </AlertDialogContent>
              </AlertDialog>
            ))
          }
        </Wordcloud>
      </QueryClientProvider>
    </div>
  );
}

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}
