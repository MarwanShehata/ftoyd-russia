"use client";

import React, { useEffect, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Match, MatchStatus } from "@/types";
import { fetchMatches } from "@/lib/api";
import { RefreshButton } from "./RefreshButton";
import { toast } from "@/hooks/useToast";
import { Skeleton } from "./ui/skeleton";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 30000,
      retry: 1,
    },
  },
});

// Wrapper component with QueryClientProvider
export default function MatchAccordionWrapper({
  initialMatches = [],
}: {
  initialMatches?: Match[];
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MatchAccordion initialMatches={initialMatches} />
    </QueryClientProvider>
  );
}

// The actual component that uses React Query
function MatchAccordion({ initialMatches = [] }: { initialMatches?: Match[] }) {
  // Add a state to control initial client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Mark as client-side after component mounts
    setIsClient(true);
  }, []);

  const {
    data: matches,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
    initialData: initialMatches,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 60000,
  });

  // This effect runs on component mount and triggers a data fetch
  useEffect(() => {
    // Only show a loading toast on initial load if we don't have initial data
    if (initialMatches.length === 0) {
      toast({
        title: "Loading",
        description: "Fetching the latest match data...",
      });
    }

    // Automatically refetch on component mount
    refetch()
      .then(() => {
        // Only show success toast if we didn't have initial data
        if (initialMatches.length === 0) {
          toast({
            title: "Success",
            description: "Match data successfully loaded!",
            variant: "default",
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch match data.",
        });
      });
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh match data.",
      });
    }
  }, [error]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      toast({
        title: "Refreshing",
        description: "Fetching the latest match data...",
      });

      await refetch();

      toast({
        title: "Success",
        description: "Match data successfully updated!",
        variant: "default",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh match data.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status: MatchStatus) => {
    switch (status) {
      case "Finished":
        return "bg-gray-500";
      case "Ongoing":
        return "bg-green-500";
      case "Scheduled":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Show loading state if loading for the first time
  if (isLoading && initialMatches.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !matches || matches.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 text-center">
        <p className="mb-4 text-red-500">
          {error ? "Error loading matches" : "No matches available"}
        </p>
        <RefreshButton isLoading={isRefreshing} onClick={handleRefresh} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Match Schedule</h2>
        <div className="flex items-center">
          {/* Only render this on the client side to avoid hydration mismatch */}
          {isClient && isRefreshing && (
            <span className="text-sm text-gray-500 mr-3">
              Refreshing data...
            </span>
          )}
          <RefreshButton isLoading={isRefreshing} onClick={handleRefresh} />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {matches.map((match, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-md mb-4"
          >
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="w-full grid grid-cols-3 gap-2 items-center">
                {/* Left Team */}
                <div className="text-left">
                  <div className="font-bold">{match.awayTeam.name}</div>
                  <div className="text-sm text-gray-500">
                    Rank: {match.awayTeam.place}
                  </div>
                </div>

                {/* Middle - Score and Status */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold mb-1">
                    {match.awayScore} : {match.homeScore}
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(match.status)}
                  >
                    {match.status}
                  </Badge>
                  <div className="text-xs mt-1 text-gray-500">
                    {formatDate(match.time)}
                  </div>
                </div>

                {/* Right Team */}
                <div className="text-right">
                  <div className="font-bold">{match.homeTeam.name}</div>
                  <div className="text-sm text-gray-500">
                    Rank: {match.homeTeam.place}
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Away Team Details */}
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {match.awayTeam.name} Details
                  </h3>
                  <Separator className="mb-2" />
                  <div className="space-y-2">
                    <p>Rank: {match.awayTeam.place}</p>
                    <p>Total Kills: {match.awayTeam.total_kills}</p>
                    <h4 className="font-semibold mt-2">Players:</h4>
                    <ul className="pl-4 list-disc">
                      {match.awayTeam.players.map((player, idx) => (
                        <li key={idx}>
                          {player.username} - Kills: {player.kills}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Home Team Details */}
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {match.homeTeam.name} Details
                  </h3>
                  <Separator className="mb-2" />
                  <div className="space-y-2">
                    <p>Rank: {match.homeTeam.place}</p>
                    <p>Total Kills: {match.homeTeam.total_kills}</p>
                    <h4 className="font-semibold mt-2">Players:</h4>
                    <ul className="pl-4 list-disc">
                      {match.homeTeam.players.map((player, idx) => (
                        <li key={idx}>
                          {player.username} - Kills: {player.kills}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Match Title: {match.title}
                  <br />
                  Date: {formatDate(match.time)}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
