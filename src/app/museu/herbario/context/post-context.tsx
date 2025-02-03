"use client";

import React, {
  createContext,
  useState,
  useMemo,
  type ReactNode,
  useCallback,
} from "react";
import { useDebounce } from "react-use";

export type PostSearchParams = {
  name?: string;
};
interface PostContextProps {
  search: PostSearchParams;
  handleSearch: (params: PostSearchParams) => void;
}

export const PostContext = createContext<PostContextProps | undefined>(
  undefined,
);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [search, setSearch] = useState<PostSearchParams>({});
  const [searchDebounced, setSearchDebounced] = useState<PostSearchParams>({});

  const handleSearch = useCallback((search: PostSearchParams) => {
    setSearch((prev) => ({
      ...prev,
      ...search,
    }));
  }, []);

  useDebounce(
    () => {
      setSearchDebounced(search);
    },
    500,
    [search],
  );

  const value = useMemo(
    () => ({ search: searchDebounced, handleSearch }),
    [handleSearch, searchDebounced],
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
