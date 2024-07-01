import { Box, Text, Tooltip } from '@mantine/core';
import type { FC } from 'react';

interface ClippedTextProps {
  length?: number;
  text: string;
}

// Function to convert pixel length to character count
function pixelToCharCount(pixelLength: string): number {
  // Assuming an average character width of 10px (adjust this value as needed)
  const averageCharWidthInPx = 10;

  // Extract the numeric part of the pixel length
  const numericValue = parseFloat(pixelLength);

  // Calculate the character count based on the average character width
  const charCount = numericValue / averageCharWidthInPx;

  return charCount;
}

const ClippedText: FC<ClippedTextProps> = ({ text, length = 300 }) => {
  const showToolTip = pixelToCharCount(length.toString()) < text.length;
  return (
    <Box mx="auto" maw={length}>
      <Tooltip
        withArrow
        position="top"
        multiline
        label={text}
        display={showToolTip ? 'inline-block' : 'none'}
      >
        <Text className="text-center" truncate="start">
          {text}
        </Text>
      </Tooltip>
    </Box>
  );
};

export default ClippedText;
