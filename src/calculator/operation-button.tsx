import { Button } from "@chakra-ui/react";
import { FC } from "react";

export enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-'
}

export type OperationCallback = (operation: Operation) => void;

export interface OperationButtonProps {
  onClick: OperationCallback;
  operation: Operation;
}

export const OperationButton: FC<OperationButtonProps> = ({
  onClick,
  operation
}) => {
  return <Button
    colorScheme=''
    className='calculator-operation-button'
    onClick={() => onClick(operation)}
  >
    {operation}
  </Button>
}
