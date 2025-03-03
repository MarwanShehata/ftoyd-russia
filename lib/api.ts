import { Progress } from "@/components/ui/progress";
import { APIResponse, MatchesResponse } from "@/types";

const API_BASE_URL = "https://app.ftoyd.com/fronttemp-service";

export async function fetchMatches(): Promise<MatchesResponse> {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`${API_BASE_URL}/fronttemp?_t=${timestamp}`, {
      // Include cache control headers
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        // 'Pragma': 'no-cache',
        // 'Expires': '0',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',  
      },
    });
    


    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data: APIResponse = await response.json();

    if (!data.ok) {
      throw new Error("API response not successful");
    }

    return data.data.matches;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw new Error("Failed to load information.");
  }
}