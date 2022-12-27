const Orders = () => {
  return (
    <div className="text-white">
      <p>I am orders page</p>
      <select
        className="w-1/4 bg-transparent"
        // onChange={(e) => handleDiscount(e.target.value)}
        defaultValue="sellingPrice"
      >
        <option disabled>Discount</option>
        <option value="sellingPrice">減價</option>
        <option value="percentage">折扣 %</option>
      </select>
    </div>
  );
};

export default Orders;
