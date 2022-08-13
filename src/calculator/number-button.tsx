import { Button } from '@chakra-ui/react';

export interface NumberButtonProps {
  input: string;
  number: string;
  setInput: (v: string) => void;
}

export const NumberButton = ({
  input,
  setInput,
  number
}: NumberButtonProps) => {
  return <Button
    onClick={() => {
      setInput(input + number);
    }}
  >
    {number}
  </Button>;
}
