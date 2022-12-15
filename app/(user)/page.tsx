import { previewData } from "next/headers";

const Home = () => {
  if (previewData()) {
    return <div>Preview mode</div>;
  }
  return (
    <div className="text-white">
      I am Home page NewYearPos!!!! Not in preview mode
    </div>
  );
};

export default Home;
