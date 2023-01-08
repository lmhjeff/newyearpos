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

      {children}
    </div>
  );
}
