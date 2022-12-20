import "../../styles/globals.css";
import Menu from "../../components/Menu";
import { groq } from "next-sanity";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="flex flex-row w-screen bg-[#111315] h-screen">
        <Menu />
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
