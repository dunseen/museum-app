import { useState } from 'react';
import { useDebounce } from 'react-use';

export function useDebouncedInputText(time = 500) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');

  const onInputChange = (value: string) => setInputValue(value);

  useDebounce(() => setDebouncedInput(inputValue), time, [inputValue]);

  return {
    inputValue,
    onInputChange,
    debouncedInput,
  };
}
