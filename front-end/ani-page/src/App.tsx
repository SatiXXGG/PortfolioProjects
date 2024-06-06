import { AnimeGenres } from "./types/enums";

import { useInfiniteQuery } from "@tanstack/react-query";
import { anime } from "./types/animeData";
import AnimeCard from "./components/animeCard";
import LoadMoreButton from "./components/loadMore";
import { ChangeEventHandler, useEffect, useState } from "react";
import { refetchValueTimeMs } from "./types/globals";

const fetchAnimes = async ({
  pageParam = 1,
  queryKey = [],
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const searchValue: string | undefined = queryKey[1];

  return await fetch(
    `https://api.jikan.moe/v4/anime?q=${
      searchValue ?? ""
    }&sfw&page=${pageParam}&limit=12`
  )
    .then(async (res) => {
      return await res.json();
    })
    .then((res) => ({
      data: res.data,
      nextPage: res.pagination.current_page + 1,
    }));
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isDebounce, setDebounce] = useState(false);
  const [queryKey, setQueryKey] = useState<string[]>(["animeData", ""]);
  const [type, setType] = useState("all");

  const { data, isError, isLoading, fetchNextPage, refetch, hasNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: fetchAnimes,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      refetchInterval: refetchValueTimeMs,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });

  let flatPages = data?.pages.flatMap((page) => page.data) ?? [];

  if (type !== "all") {
    flatPages = flatPages.filter((anime: anime) => {
      const finded = anime.genres.find((genre) => {
        return genre.name.toLowerCase() === type.toLowerCase();
      });
      console.log(finded);
      if (finded) {
        return true;
      }
      return false;
    });
  }

  const handleSearch = () => {
    setQueryKey(["animeData", searchValue]);
    refetch();
  };

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value as keyof typeof AnimeGenres;

    setType(AnimeGenres[value] ?? AnimeGenres.all);
  };

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isDebounce) {
      const input = event.target as HTMLInputElement | null;
      const value = input?.value;
      setSearchValue(value ?? "");
      setDebounce(true);

      if (value == "" && queryKey[1] !== "") {
        setQueryKey(["animeData", ""]);
      }
    }
    setTimeout(() => setDebounce(false), 400);
  };

  useEffect(() => {
    refetch();
  }, [queryKey, refetch]);

  return (
    <>
      <h1 className="text-3xl font-bold justify-center text-center py-12">
        ANIME LIST
      </h1>
      <section className="justify-center flex px-2 rounded-2xl mx-auto">
        <div className="relative mx-2">
          <input
            id="searchInput"
            className="shadow-md  active:outline outline-blue-700 outline-2 w-56 md:w-96 py-1 pl-2 bg-neutral-200 rounded-2xl"
            maxLength={40}
            onChange={handleSearchInputChange}
            placeholder="Dragon Ball, Naruto, Kono suba..."
          ></input>
          <button className="absolute right-0 top-0" onClick={handleSearch}>
            <svg
              className="p-2 bg-blue-600 rounded-r-2xl hover:p-[5px] transition-all duration-200"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
        </div>

        <select
          className="bg-neutral-200 px-2 py-1 rounded-xl shadow-md"
          title="Genre"
          id="select-genre"
          defaultValue={AnimeGenres.all}
          onChange={handleCategoryChange}
        >
          <option value={AnimeGenres.comedy}>Comedy</option>
          <option value={AnimeGenres.fantasy}>Fantasy</option>
          <option value={AnimeGenres.horror}>Horror</option>
          <option value={AnimeGenres.adventure}>Adventure</option>
          <option value={AnimeGenres.sciFi}>Sci-Fi</option>
          <option value={AnimeGenres.action}>Action</option>
          <option value={AnimeGenres.all}>All</option>
        </select>
      </section>

      <section
        id="anime-list"
        className="mb-3  md:px-0 mx-auto mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:w-[50vw] w-[100vw]  "
      >
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>Error, please try again later</h1>}

        {!isError && !isLoading
          ? flatPages?.map((page: anime) => {
              return <AnimeCard animeData={page} key={page.title} />;
            })
          : null}
      </section>

      {hasNextPage && <LoadMoreButton fetchPages={fetchNextPage} />}
    </>
  );
}

export default App;
