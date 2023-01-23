//@ts-nocheck
import { groq } from "next-sanity";
import { previewData } from "next/headers";
import { Doughnut } from "react-chartjs-2";
import DoughnutChart from "../../components/DoughnutChart";
import PreviewSuspense from "../../components/PreviewSuspense";
import { client } from "../../lib/sanity.client";

const totalQuery = groq`
  math::sum(*[_type == "orders"][].total)
`;

const cashQuery = groq`
  math::sum(*[_type == "orders" && paymentMethod == "CASH"][].total)
`;

const paymeQuery = groq`
  math::sum(*[_type == "orders" && paymentMethod == "PAYME"][].total)
`;

const fpsQuery = groq`
  math::sum(*[_type == "orders" && paymentMethod == "FPS"][].total)
`;

const octopusQuery = groq`
  math::sum(*[_type == "orders" && paymentMethod == "OCTOPUS"][].total)
`;

const tapandGoQuery = groq`
  math::sum(*[_type == "orders" && paymentMethod == "TAPNGO"][].total)
`;

const Home = async () => {
  const total = await client.fetch(totalQuery);
  const cash = await client.fetch(cashQuery);
  const payme = await client.fetch(paymeQuery);
  const fps = await client.fetch(fpsQuery);
  const octopus = await client.fetch(octopusQuery);
  const tapngo = await client.fetch(tapandGoQuery);

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
    <div className="text-white w-full flex flex-row">
      <div className="text-2xl">
        <div className="flex flex-row items-center">
          <h1>All:</h1>
          <h1>{total}</h1>
        </div>
        <div className="flex flex-row items-center text-[#65b5ff]">
          <h1>Cash:</h1>
          <h1>{cash}</h1>
        </div>
        <div className="flex flex-row items-center text-[#FF2828]">
          <h1>Payme:</h1>
          <h1>{payme}</h1>
        </div>
        <div className="flex flex-row items-center text-[#97ff87]">
          <h1>FPS:</h1>
          <h1>{fps}</h1>
        </div>
        <div className="flex flex-row items-center text-[#ffa982]">
          <h1>Octopus:</h1>
          <h1>{octopus}</h1>
        </div>
        <div className="flex flex-row items-center text-[#4f7f8a]">
          <h1>TapnGo:</h1>
          <h1>{tapngo}</h1>
        </div>
      </div>
      <div className="">
        <DoughnutChart
          total={total}
          cash={cash}
          payme={payme}
          fps={fps}
          octopus={octopus}
          tapngo={tapngo}
        />
      </div>
    </div>
  );
};

export default Home;
