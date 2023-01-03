import { groq } from "next-sanity";
import Status from "../../../components/Status";
import { client } from "../../../lib/sanity.client";

const query = groq`
  *[_type == 'status'] | order(statusField asc)
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await client.fetch(query);

  return (
    <div className="flex flex-col w-full p-4">
      <Status status={status} />
      <div className="flex flex-row justify-between items-center w-full pl-10 pr-4 py-4 my-4 bg-[#2d2d2d] text-gray-300 rounded-lg">
        <div className="w-32">下單日期</div>
        <div className="flex-1">訂單編號</div>
        <div className="flex-1">訂單狀態</div>
        <div className="flex-1">總金額</div>
        <div className="flex-1">付款方式</div>
      </div>
      {children}
    </div>
  );
}
