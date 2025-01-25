import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queryClient = new QueryClient();

const getCachedQueryClient = cache(() => new QueryClient());
export default getCachedQueryClient;
