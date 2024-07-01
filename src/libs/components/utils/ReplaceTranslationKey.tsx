import { Text } from '@mantine/core';
import type { ReactNode } from 'react';
import React from 'react';

import { cn } from '../../../utils/cn';

interface ReplaceTranslationKeyProps {
  text: string;
  values: Record<string, ReactNode>;
  className?: string;
}

interface ResultItem {
  type: 'text' | 'component';
  component: ReactNode;
}

const ReplaceTranslationKey: React.FC<ReplaceTranslationKeyProps> = ({
  text,
  values,
  className,
}) => {
  const result: ResultItem[] = [];
  let remainingText = text;

  while (remainingText.length > 0) {
    let found = false;
    for (const key of Object.keys(values)) {
      const replaceKey = `{{${key}}}`;
      const index = remainingText.indexOf(replaceKey);

      if (index !== -1) {
        found = true;
        const before = remainingText.substring(0, index);
        const after = remainingText.substring(index + replaceKey.length);

        if (before.length > 0) {
          result.push({ type: 'text', component: before });
        }

        result.push({ type: 'component', component: values[key] });
        remainingText = after;
        break;
      }
    }

    if (!found) {
      result.push({ type: 'text', component: remainingText });
      break;
    }
  }

  return (
    <Text className={cn(className)}>
      {result.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${item.type}-${index}`}>
          {item.type === 'component' ? (
            <span className="mx-1">{item.component}</span>
          ) : (
            item.component
          )}
        </React.Fragment>
      ))}
    </Text>
  );
};

export default ReplaceTranslationKey;
