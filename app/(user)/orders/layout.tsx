import { groq } from "next-sanity";
import Status from "../../../components/Status";
import { client } from "../../../lib/sanity.client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full p-4">
      <Status />

      {children}
    </div>
  );
}
