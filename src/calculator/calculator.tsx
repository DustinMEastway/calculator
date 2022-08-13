import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import { Container, HStack, VStack } from '@chakra-ui/layout';
import { FC, useState } from 'react';
import { NumberButton } from './number-button';
import { Operation, OperationButton, OperationCallback } from './operation-button';
import './calculator.css';

/** Invalid values to remove from the input. */
const invalidInputRegex = /[^0-9.]+/g;

/** Significant digits to round to. This helps with JavaScript's math issues when doing stuff like '1.2/.1'. */
const significantDigits = 13;
const roundValue = (x: number) => {
  const significantValue = Math.pow(10, significantDigits);
  return Math.round(x * significantValue) / significantValue;
}

/** Performs the provided operation on the two values (e.g. x - y). */
export function performOperation(operation: Operation, x: number, y: number): number {
  switch (operation) {
    case Operation.Add:
      return roundValue(x + y);
    case Operation.Divide:
      return roundValue(x / y);
    case Operation.Multiply:
      return roundValue(x * y);
    case Operation.Subtract:
      return roundValue(x - y);
    default:
      const invalidOperation: never = operation;
      throw new Error(`Invalid operation '${invalidOperation}'.`);
  }
}

/** Calculator with the basic four operations built into it. */
export const Calculator: FC = () => {
  const [input, setInput] = useState<string>('');
  const [storedInput, setStoredInput] = useState<number | null>(null);
  const [storedOperation, setStoredOperation] = useState<Operation | null>(null);

  const onOperationClick: OperationCallback = (operation): void => {
    const inputValue = parseFloat(input);
    if (isNaN(inputValue)) {
      return;
    } else if (storedInput == null) {
      setInput('');
      setStoredInput(inputValue);
      setStoredOperation(operation);
      return;
    }

    const result = performOperation(operation, storedInput, inputValue);
    setInput(result.toString());
    setStoredInput(null);
    setStoredOperation(null);
  };

  return <Container className='calculator'>
    <Input
      className='calculator-input'
      onChange={(e) => setInput(e.currentTarget.value.replace(invalidInputRegex, ''))}
      value={input}
    />
    <Container>
      <VStack>
        <HStack>
          <NumberButton input={input} number='7' setInput={setInput} />
          <NumberButton input={input} number='8' setInput={setInput} />
          <NumberButton input={input} number='9' setInput={setInput} />
          <OperationButton onClick={onOperationClick} operation={Operation.Divide} />
        </HStack>
        <HStack>
          <NumberButton input={input} number='4' setInput={setInput} />
          <NumberButton input={input} number='5' setInput={setInput} />
          <NumberButton input={input} number='6' setInput={setInput} />
          <OperationButton onClick={onOperationClick} operation={Operation.Multiply} />
        </HStack>
        <HStack>
          <NumberButton input={input} number='1' setInput={setInput} />
          <NumberButton input={input} number='2' setInput={setInput} />
          <NumberButton input={input} number='3' setInput={setInput} />
          <OperationButton onClick={onOperationClick} operation={Operation.Subtract} />
        </HStack>
        <HStack>
          <NumberButton input={input} number='0' setInput={setInput} />
          <Button
            onClick={() => {
              if (!input.includes('.')) {
                setInput(input + '.');
              }
            }}
          >
            .
          </Button>
          <Button colorScheme='blue' onClick={() => {
            const inputValue = parseFloat(input);
            if (
              isNaN(inputValue)
              || storedInput == null
              || storedOperation == null
            ) {
              return;
            }

            const result = performOperation(storedOperation, storedInput, inputValue);
            setInput(result.toString());
            setStoredInput(null);
            setStoredOperation(null);
          }}>
            =
          </Button>
          <OperationButton onClick={onOperationClick} operation={Operation.Add} />
        </HStack>
      </VStack>
    </Container>
  </Container>;
}
