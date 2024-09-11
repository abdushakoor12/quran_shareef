import { useQuery } from "@tanstack/react-query";
import { getSurahs } from "./data/metadata";
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
      <h1>Quran Shareef</h1>
      <div className="flex flex-col gap-2 items-center">
        {data?.map((surah) => (
          <Link
          to={`/surah/${surah.number}`}
          className="text-2xl underline p-2 cursor-pointer hover:bg-gray-200 text-right"
          key={surah.number}>
            {surah.number}. {surah.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SurahsPage;
