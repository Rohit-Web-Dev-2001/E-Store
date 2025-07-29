const ProductCard = ({ title, description, price, imageUrl }) => {
  return (
    <div className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-sm mb-4"
      />
      <h3 className="text-lg font-semibold text-[#101828]">{title}</h3>
      <p className="text-sm text-gray-600 my-2">{description}</p>
      <p className="text-[#101828] font-semibold text-base">₹{price}</p>
      <button className="mt-auto bg-[#101828] text-white py-2 px-4 rounded-sm text-sm font-medium hover:opacity-90">
        Add to Cart
      </button>
    </div>
  );
};
