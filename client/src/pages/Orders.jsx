import { getImageUrl } from "../utils/imageHelper";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const clearOrders = () => {
    localStorage.removeItem("orders");
    window.location.reload();
  };

  return (
    <div className="px-6 md:px-20 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order History</h1>

        {orders.length > 0 && (
          <button
            onClick={clearOrders}
            className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              
              {/* Order Header */}
              <div className="flex justify-between mb-6 flex-wrap gap-2">
                <h3 className="font-semibold text-lg">
                  Order #{i + 1}
                </h3>

                <div className="text-right">
                  <p className="font-semibold text-caviro">
                    ₹{order.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {order.status}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-5">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    {/* 🔥 FIXED IMAGE BOX */}
                    <div className="w-24 h-24 flex-shrink-0 border rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Brand: {item.brand}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quality: {item.quality}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="font-semibold text-caviro">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}