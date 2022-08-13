import { VStack } from '@chakra-ui/layout';
import { FC } from 'react';
import './app.css';
import { Calculator } from './calculator';

export const App: FC = () => {
  return <VStack>
    <h1>Calculator</h1>
    <Calculator />
  </VStack>;
}
