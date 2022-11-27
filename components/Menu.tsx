import Navigation from "./Navigation";

const Menu = () => {
  return (
    <div className="flex flex-col w-[150px] h-screen text-white items-center p-4">
      {/* <div className="w-6 h-6">
        <ShoppingCartIcon />
      </div> */}
      <div className="flex flex-row items-center space-x-4">
        <img
          src="/assets/images/logo.png"
          alt={""}
          className="rounded-full w-8 h-8"
        />
        <div className="font-semibold">EXJAPAN</div>
      </div>
      <Navigation />
    </div>
  );
};

export default Menu;
