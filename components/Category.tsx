"use client";
import { useRouter } from "next/navigation";
// import { useState } from "react";

const cateType = [
  {
    type: "New York Cheese",
    name: "New York Cheese",
  },
  {
    type: "Tulip Rose",
    name: "Tulip Rose",
  },
  {
    type: "Audrey",
    name: "Audrey",
  },
  {
    type: "Butter State",
    name: "Butter State",
  },
  {
    type: "Tokyo Banana",
    name: "Tokyo Banana",
  },
];

type CategoryProps = {
  category: Category[];
};

const Category = ({ category }: CategoryProps) => {
  //   const [cate, setCate] = useState<string>("");
  const router = useRouter();

  const handleCategory = (e: string) => {
    router.push(`/products/${e}`);
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-3 overflow-y-auto scrollbar-none">
      {category.map((cate, i) => (
        <button
          onClick={() => handleCategory(cate.category)}
          key={cate.category}
          className={`p-2 rounded-lg whitespace-nowrap ${
            i % 2 === 0 ? "bg-[#99b898]" : "bg-[#ff847c]"
          }`}
        >
          {cate.category}
        </button>
      ))}
    </div>
  );
};

export default Category;
