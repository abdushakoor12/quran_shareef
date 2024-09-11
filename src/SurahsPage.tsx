import { useQuery } from "@tanstack/react-query";
import { getSurahs } from "./data/surah_data";
import { Link } from "@tanstack/react-router";

function SurahsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["surahs"],
    queryFn: getSurahs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 items-center flex-row-reverse justify-center">
        {data?.map((surah) => (
          <Link
          to={`/surah/${surah.number}`}
          preload="intent"
          className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-200 text-right"
          key={surah.number}>
            {surah.number}. {surah.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SurahsPage;
