import { groq } from "next-sanity";
import { previewData } from "next/headers";
import PreviewSuspense from "../../components/PreviewSuspense";
import { client } from "../../lib/sanity.client";

const todayQuery = groq`
  math::sum(*[_type == "orders" && _createdAt >= "2023-01-10T16:00:00.000Z"][].total)
`;

const totalQuery = groq`
  math::sum(*[_type == "orders"][].total)
`;

const Home = async () => {
  const today = await client.fetch(todayQuery);
  const all = await client.fetch(totalQuery);

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
      <div>
          <h1>All:</h1>
        <h1>{all}</h1>
        <h1>Today:</h1>
        <h1>{today}</h1>
      </div>
    </div>
  );
};

export default Home;
