import { useQuery } from "@tanstack/react-query";
import { getSurahs } from "./data/metadata";

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
    <div>
      <center>
      <h1>Quran Shareef</h1>
      <div>
        {data?.map((surah) => (
          <div
          style={{
            margin: "10px",
            padding: "10px",
            border: "1px solid black",
            cursor: "pointer",
          }}
          key={surah.number}>
            {surah.number}. {surah.name}
          </div>
        ))}
      </div>
    </center>
    </div>
  );
}

export default SurahsPage;
