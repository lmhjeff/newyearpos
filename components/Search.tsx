"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import useWindowDimensions from "../hook/useWindowDimension";
import { isMobile } from "react-device-detect";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { height } = useWindowDimensions();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/products/${search}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        placeholder="Search the products"
        className="bg-gray-200 rounded-lg px-4 py-2 text-black"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="bg-pink-500 px-4 py-2 text-white rounded-lg font-bold ml-4"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
