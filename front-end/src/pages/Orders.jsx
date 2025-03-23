import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tiltle from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(`${backendUrl}/api/order/userorder`, {}, {
        headers: { token }
      });
  
      if (response.data.success) {
        console.log('Raw orders from backend:', response.data.orders);
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          // Tính tổng giá gốc của đơn hàng
          const orderTotal = order.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
          console.log('Order total:', orderTotal, 'Order amount:', order.amount);
          order.items.forEach((item) => {
            // Tính phần trăm giá của item trong tổng đơn hàng
            const itemTotal = Number(item.price) * item.quantity;
            const itemPercentage = itemTotal / orderTotal;
            // Tính amount cho item dựa trên phần trăm của tổng order amount
            const discountedAmount = Math.round(order.amount * itemPercentage);
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['amount'] = discountedAmount;

            console.log('Item details:', {
              name: item.name,
              originalPrice: itemTotal,
              percentage: itemPercentage,
              discountedAmount: discountedAmount
            });
            
            allOrdersItem.push(item);
          });
        });
  
        console.log('Final processed items:', allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Tiltle text1={'Your '} text2={'Orders'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div key={index} className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex item-center gap-3 mt-1 text-base text-gray-400">
                  <p>{currency}{Number(item.amount).toLocaleString()}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">Date: <span>{new Date(item.date).toDateString()}</span></p>
                <p className="mt-1">Payment: <span>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-3.5 h-3.5 border rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium">Theo dõi đơn hàng</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
