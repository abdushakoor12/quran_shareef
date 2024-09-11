import Dexie, { type EntityTable } from "dexie";
import { Surah } from "./surah";

const db = new Dexie("00_db") as Dexie & {
  surahs: EntityTable<
    Surah,
    "number"
  >;
};

db.version(1).stores({
  surahs:
    "number, name, englishName, englishNameTranslation, numberOfAyahs, revelationType",
});

export { db };
