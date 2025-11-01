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
  handleCharacteristicFilter: (id: string) => void;
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

  const handleCharacteristicFilter = useCallback((id: string) => {
    setSearch((prev) => ({
      ...prev,
      characteristics: prev?.characteristics?.includes(id)
        ? prev.characteristics.filter((c) => c !== id)
        : [...(prev?.characteristics ?? []), id],
    }));
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setSearch({});
  }, []);

  useDebounce(
    () => {
      if (
        Object.keys(search).length === 0 ||
        search.characteristics?.length === 0
      )
        return;

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
