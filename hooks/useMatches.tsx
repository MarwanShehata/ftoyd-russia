"use client";

import { useState } from "react";
import useSWR from "swr";
import { Match } from "@/types";
import { fetchMatches } from "@/lib/api";

interface UseMatchesOptions {
  initialData?: Match[];
}

interface UseMatchesResult {
  matches: Match[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isRefreshing: boolean;
  refresh: () => Promise<void>;
}

export function useMatches({
  initialData,
}: UseMatchesOptions = {}): UseMatchesResult {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const {
    data: matches,
    error,
    isLoading,
    mutate,
  } = useSWR<Match[], Error>("matches", fetchMatches, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 10000, // 10 seconds
  });

  const refresh = async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      await mutate();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    matches,
    error,
    isLoading,
    isRefreshing,
    refresh,
  };
}
