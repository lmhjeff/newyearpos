import DateRangePicker from "../../../components/DateRangePicker";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full p-4">
      <DateRangePicker />
      <div className="flex flex-col w-full py-2 space-y-6">
        <div className="flex flex-row font-extrabold text-lg justify-between items-center p-4 bg-[#2d2d2d] text-gray-300 rounded-lg">
          <div className="w-48">貨物名稱</div>
          <div className="w-24">單價</div>
          <div className="w-20">賣出數量</div>
          <div className="w-24">賣出總金額</div>
        </div>
        {children}
      </div>
    </div>
  );
}
