import React from "react";

const PaymentPendingList = () => {
  const items = [
    {
      id: 1,
      date: "25.02.20 09:17",
      name: "마샬",
      product: "Marshal WOBURN3 블루투스 스피커",
      price: "855,000원",
      remainingTime: "01일 07시간 10분 남았어요!",
      progress: 60,
    },
    {
      id: 2,
      date: "25.02.20 09:17",
      name: "마샬",
      product: "Marshal WOBURN3 블루투스 스피커",
      price: "855,000원",
      remainingTime: null,
      progress: 0,
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">결제 고민 중인 상품</h2>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-whiterounded-2xl shadow-md p-4 mb-4 border"
        >
          <p className="text-gray-500 text-sm">{item.date}</p>
          <div className="flex items-center gap-4 mt-2">
            <img
              src="https://via.placeholder.com/60"
              alt="product"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.product}</p>
              <p className="text-lg font-bold mt-1">{item.price}</p>
            </div>
          </div>
          {item.remainingTime && (
            <div className="mt-3">
              <div className="relative w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{item.remainingTime}</p>
            </div>
          )}
          <div className="flex justify-between mt-3">
            {item.remainingTime ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                💳 결제로 이동
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                결제로 이동
              </button>
            )}
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
              결제 취소
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentPendingList;
