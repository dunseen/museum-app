"use client";

import React, {
  createContext,
  useState,
  useMemo,
  type ReactNode,
  useCallback,
} from "react";
import { useDebounce } from "react-use";
import { type PostSearchParams } from "../api";

interface PostContextProps {
  search: PostSearchParams;
  handleSearch: (params: PostSearchParams) => void;
  handleCharacteristicFilter: (characteristics: string[]) => void;
  handleClearAllFilters: () => void;
}

export const PostContext = createContext<PostContextProps | undefined>(
  undefined,
);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [search, setSearch] = useState<PostSearchParams>({
    characteristics: [],
  });
  const [searchDebounced, setSearchDebounced] = useState<PostSearchParams>({});

  const handleSearch = useCallback((search: PostSearchParams) => {
    setSearch((prev) => ({
      ...prev,
      ...search,
    }));
  }, []);

  const handleCharacteristicFilter = useCallback(
    (characteristics: string[]) => {
      setSearchDebounced((prev) => ({
        ...prev,
        characteristics,
      }));
    },
    [],
  );

  const handleClearAllFilters = useCallback(() => {
    setSearchDebounced({});
  }, []);

  useDebounce(
    () => {
      const hasFilters = Object.keys(search).some(
        (key) => search?.[key as keyof PostSearchParams],
      );

      if (!hasFilters) return;

      setSearchDebounced(search);
    },
    500,
    [search],
  );

  const value = useMemo(
    () => ({
      search: searchDebounced,
      handleSearch,
      handleCharacteristicFilter,
      handleClearAllFilters,
    }),
    [
      handleSearch,
      searchDebounced,
      handleCharacteristicFilter,
      handleClearAllFilters,
    ],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export function usePost() {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PlantProvider");
  }
  return context;
}
