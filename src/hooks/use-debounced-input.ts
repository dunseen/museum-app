import { useState } from "react";
import { useDebounce } from "react-use";

export function useDebouncedInput(time = 500) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  useDebounce(() => setDebouncedInput(inputValue), time, [inputValue]);

  return { inputValue, setInputValue, debouncedInput };
}
