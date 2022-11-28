import Link from "next/link";
import Navigation from "./Navigation";

const Menu = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-w-[150px] h-screen text-white items-center p-4">
      {/* <div className="w-6 h-6">
        <ShoppingCartIcon />
      </div> */}
      <Link href="/">
        <div className="flex flex-row items-center space-x-4">
          <img
            src="/assets/images/logo.png"
            alt={""}
            className="rounded-full w-8 h-8"
          />
          <div className="font-semibold">EXJAPAN</div>
        </div>
      </Link>
      <Navigation />
      <div className="absolute bottom-4 text-center text-sm">{`© ${year} EXJAPAN SHOPPING LIMITED`}</div>
    </div>
  );
};

export default Menu;
