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
    <div className="text-white">
      <div>
        <h1>All:</h1>
        <h1>{total}</h1>
        <div>{cash}</div>
        {/* <DoughnutChart
        // total={123}
        // cash={2}
        // payme={2}
        // fps={2}
        // octopus={2}
        // tapngo={2}
        /> */}

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
