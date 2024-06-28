"use client";
import React, { useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

interface ExampleProps {
  width: number;
  height: number;
  showControls?: boolean;
}

export interface WordData {
  text: string;
  value: number;
}

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

const techWords = [
  { text: 'JavaScript', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'React', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Node.js', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'GraphQL', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'TypeScript', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Webpack', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Babel', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'ESLint', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Prettier', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'NPM', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Yarn', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Docker', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Kubernetes', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Python', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Java', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'C++', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Go', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Rust', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Swift', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Objective-C', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Ruby', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'PHP', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'SQL', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'NoSQL', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'HTML', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'CSS', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Sass', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'LESS', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'AWS', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'Azure', value: Math.floor(Math.random() * 100) + 1 },
  { text: 'GCP', value: Math.floor(Math.random() * 100) + 1 },
];

const fontScale = scaleLog({
  domain: [Math.min(...techWords.map((w) => w.value)), Math.max(...techWords.map((w) => w.value))],
  range: [10, 100],
});
const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

export default function Example({ width, height, showControls }: ExampleProps) {
  const [spiralType, setSpiralType] = useState<SpiralType>('archimedean');
  const [withRotation, setWithRotation] = useState(false);

  return (
    <div className="wordcloud h-[550px] max-h-[550px]">
      <Wordcloud
        words={techWords}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={6}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
}

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}
