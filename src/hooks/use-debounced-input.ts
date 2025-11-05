import { useState } from "react";
import { useDebounce } from "react-use";

export function useDebouncedInput(time = 500) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [curentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(10);

  const onInputChange = (value: string) => setInputValue(value);

  useDebounce(() => setDebouncedInput(inputValue), time, [inputValue]);

  return {
    inputValue,
    onInputChange,
    debouncedInput,
    setDebouncedInput,
    setCurrentPage,
    curentPage,
    pageLimit,
  };
}
