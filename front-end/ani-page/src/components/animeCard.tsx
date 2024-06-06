import { anime } from "../types/animeData";
import Card from "react-animated-3d-card";

export default function AnimeCard({ animeData }: { animeData: anime }) {
  return (
    <Card
      style={{
        background: "transparent",
      }}
      shineStrength={0}
      cursorPointer={false}
    >
      <div className="outline outline-1 outline-neutral-200 mx-2 my-2 flex flex-col rounded-2xl bg-neutral-100 shadow-md w-44">
        <img
          className="rounded-t-2xl h-52 w-44"
          src={animeData.images.jpg.image_url}
        ></img>
        <label className="mt-2 truncate px-3 font-bold">{animeData.title}</label>
        <label className="mt-1 font-light px-3 text-sm mb-3 text-neutral-500">
          {`Year: ${animeData.year ?? "N/A"} Episodes: ${
            animeData.episodes ?? "N/A"
          }`}
        </label>
      </div>
    </Card>
  );
}
