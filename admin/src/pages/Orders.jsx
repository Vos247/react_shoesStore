import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const fetchAllOrder = async () => {
        if (!token) return;

        try {
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.orders);
                calculateTotalRevenue(response.data.orders); // Cập nhật tổng doanh thu sau khi lấy đơn hàng
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const calculateTotalRevenue = (orders) => {
        const total = orders
            .filter(order => order.status === "Đã giao") // Lọc các đơn hàng đã giao
            .reduce((sum, order) => sum + order.amount, 0); // Cộng dồn số tiền

        setTotalRevenue(total);
    };

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', 
                { orderId, status: event.target.value }, 
                { headers: { token } }
            );

            if (response.data.success) {
                fetchAllOrder(); // Refresh lại danh sách đơn hàng
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAllOrder();
    }, [token]);

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Order Page</h3>

            {/* Hiển thị tổng doanh thu */}
            <div className="p-4 bg-green-100 text-green-700 font-bold rounded-md mb-4">
                Tổng doanh thu từ đơn hàng đã giao: {totalRevenue.toLocaleString()} {currency}
            </div>

            <div>
                {orders.map((order, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-500">
                        <img className="w-80" src={assets.delivery} alt="delivery" />
                        <div>
                            {order.items.map((item, idx) => (
                                <p key={idx} className="py-0.5">{item.name} x {item.quantity} <span>{item.size}</span></p>
                            ))}
                            <p className="mt-3 mb-2 font-medium">{order.address.firstName} {order.address.className}</p>
                            <div>
                                <p>{order.address.street},</p>
                                <p>{order.address.state}, {order.address.city}, {order.address.country}, {order.address.zipcode}</p>
                            </div>
                            <p>{order.address.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                            <p className="mt-3">Method: {order.paymentMethod}</p>
                            <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm sm:text-[15px]">{order.amount} {currency}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold">
                            <option value="Đơn hàng đã được xác nhận">Đơn hàng đã được xác nhận</option>
                            <option value="Đang đóng gói">Đang đóng gói</option>
                            <option value="Shipper đang đến lấy hàng">Shipper đang đến lấy hàng</option>
                            <option value="Đang trên đường giao đến bạn">Đang trên đường giao đến bạn</option>
                            <option value="Đã giao">Đã giao</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
