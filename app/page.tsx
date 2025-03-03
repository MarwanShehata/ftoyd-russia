import { fetchMatches } from "@/lib/api";
import { Match } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import MatchAccordionWrapper from "@/components/MatchAccordion";
import { toast } from "@/hooks/useToast";

interface PageProps {
  initialMatches: Match[];
  error?: string;
}

export default async function Home() {
  // const [initialMatches, setInitialMatches] = useState<Match[]>([]);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchMatchesData = async () => {
  //     try {
  //       const matches = await fetchMatches();
  //       setInitialMatches(matches || []);
  //       setError(matches.length === 0 ? "No matches found." : null);
  //     } catch (error) {
  //       console.error("Error fetching matches:", error);
  //       setError("Failed to load information.");
  //     }
  //   };
  //   fetchMatchesData();
  // }, []);
  let initialMatches: Match[] = [];

  try {
    initialMatches = await fetchMatches();
  } catch (err) {
    console.error("Error fetching initial matches:", err);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <MatchAccordionWrapper initialMatches={initialMatches} />
      <Toaster />
    </main>
  );
}
