import { db } from "./db";
import { Surah } from "./surah";

interface MetadataResponse {
  code: number;
  status: string;
  data?: {
    surahs: {
      count: number;
      references: Surah[];
    }
  }
}

export const getSurahs = async (): Promise<Surah[]> => {
  const storedSurahs = await db.surahs.toArray();
  if(storedSurahs.length === 114) {
    return storedSurahs;
  }

  const metadataResponse = await fetch("https://api.alquran.cloud/v1/meta").then(res => res.json()) as MetadataResponse;

  const surahs = metadataResponse.data?.surahs.references ?? [];

  await db.surahs.bulkPut(surahs);

  return surahs;
};

export const getSurah = async (surahNumber: number): Promise<Surah | undefined> => {
  const surahs = await getSurahs();
  const surah = surahs.find(surah => surah.number === surahNumber);
  return surah;
};