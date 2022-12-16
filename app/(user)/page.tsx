import { previewData } from "next/headers";
import PreviewSuspense from "../../components/PreviewSuspense";

const Home = async () => {
  // if (previewData()) {
  //   return (
  //     <PreviewSuspense
  //       fallback={
  //         <div role="status">
  //           <p className="text-center text-lg animate-pulse text-green-300">
  //             {" "}
  //             Loading Preview Data...
  //           </p>
  //         </div>
  //       }
  //     >
  //       Preview mode
  //     </PreviewSuspense>
  //   );
  // }
  return (
    <div className="text-white">
      I am Home page NewYearPos!!!! Not in preview mode
    </div>
  );
};

export default Home;
