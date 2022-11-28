import Cart from "../../components/Cart";
import Search from "../../components/Search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row w-full">
      <div className="flex flex-col w-4/5 p-4">
        <Search />
        {children}
      </div>
      <Cart />
    </main>
  );
}
