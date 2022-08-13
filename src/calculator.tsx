import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input';
import { Container, HStack, VStack } from '@chakra-ui/layout';
import { FC, useState } from 'react';
import './calculator.css';

export interface CalcButton {
  check?: (v: string) => boolean;
  input: string;
  setInput: (v: string) => void;
  value: string;
}

export const CalcButton = ({
  check,
  input,
  setInput,
  value
}: CalcButton) => {
  return <Button
    onClick={() => {
      if (!check || check(input)) {
        setInput(input + value);
      }
    }}
  >
    {value}
  </Button>;
}

export const Calculator: FC = () => {
  const [input, setInput] = useState('100');

  return <Container className='calculator'>
    <Input
      className='calculator-input'
      onChange={(e) => setInput(e.currentTarget.value)}
      value={input}
    />
    <Container>
      <VStack>
        <HStack>
          <CalcButton input={input} setInput={setInput} value='7' />
          <CalcButton input={input} setInput={setInput} value='8' />
          <CalcButton input={input} setInput={setInput} value='9' />
        </HStack>
        <HStack>
          <CalcButton input={input} setInput={setInput} value='4' />
          <CalcButton input={input} setInput={setInput} value='5' />
          <CalcButton input={input} setInput={setInput} value='6' />
        </HStack>
        <HStack>
          <CalcButton input={input} setInput={setInput} value='1' />
          <CalcButton input={input} setInput={setInput} value='2' />
          <CalcButton input={input} setInput={setInput} value='3' />
        </HStack>
        <HStack>
          <CalcButton input={input} setInput={setInput} value='0' />
          <CalcButton check={(v) => !v.includes('.')} input={input} setInput={setInput} value='.' />
          <Button colorScheme='blue' onClick={() => {}}>
            =
          </Button>
        </HStack>
      </VStack>
    </Container>
  </Container>;
}
