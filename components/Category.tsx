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

const Category = () => {
  //   const [cate, setCate] = useState<string>("");
  const router = useRouter();

  const handleCategory = (e: string) => {
    router.push(`/products/${e}`);
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      {cateType.map((cate, i) => (
        <button
          onClick={() => handleCategory(cate.name)}
          key={cate.type}
          className={`px-4 py-3 rounded-lg ${
            i % 2 === 0 ? "bg-[#99b898]" : "bg-[#ff847c]"
          }`}
        >
          {cate.name}
        </button>
      ))}
    </div>
  );
};

export default Category;
