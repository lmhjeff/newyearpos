"use client";
import { useRouter } from "next/navigation";

type CategoryProps = {
  category: Category[];
};

const Category = ({ category }: CategoryProps) => {
  const router = useRouter();

  const handleCategory = (e: string) => {
    router.push(`/products/${e}`);
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-3 overflow-y-auto scrollbar-none h-[160px]">
      {category.map((cate, i) => (
        <button
          onClick={() => handleCategory(cate.category)}
          key={cate.category}
          className={`p-2 rounded-lg ${
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
