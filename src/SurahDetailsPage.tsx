import { Link, useParams } from "@tanstack/react-router";
import { getSurah } from "./data/surah_data";
import { useQuery } from "@tanstack/react-query";

export default function SurahDetailsPage() {
  const { surahNumber } = useParams({
    strict: false,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["surah", surahNumber],
    queryFn: async () => getSurah(parseInt(surahNumber)),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Surah not found</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {Array.from({ length: data.numberOfAyahs }, (_, i) => (
        <Link
          to={`/surah/${data.number}/${i + 1}`}
          key={i}
          className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-200 text-right"
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
}
