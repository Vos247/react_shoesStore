import orderModel from "../models/orderModels.js"
import userModel from "../models/userModels.js" // placeOders
const placeOders = async (req, res) => {
    try {
        const { userId, items, address, amount, discount = 0 } = req.body;
  
        console.log("Received order data:", req.body); // 🛠 Kiểm tra dữ liệu nhận được
        // Lưu total do frontend gửi lên, không tính lại
        const orderData = {
            userId,
            items,
            address,
            amount, // Lưu total trực tiếp từ frontend
            discountAmount: discount, 
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };
  
        const newOrder = new orderModel(orderData);
        await newOrder.save();
  
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
        res.json({ success: true, message: "Đơn hàng đã được đặt" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
  };
  
const placeOderStripe=async(req,res)=>{

}

const placeOdersRazorpay=async(req,res)=>{

}
const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
const userOrders = async (req, res) => {
    try {
      const { userId } = req.body;
      const orders = await orderModel.find({ userId });
  
      // Log ra dữ liệu trước khi gửi về frontend
      console.log("User Orders Data:", orders);
  
      res.json({ success: true, orders });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        // Tìm đơn hàng theo orderId
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Đơn hàng không tồn tại" });
        }
        // Nếu đơn hàng đã giao, không cho phép cập nhật
        if (order.status === "Đã giao") {
            return res.json({ success: false, message: "Không thể cập nhật, đơn hàng đã giao" });
        }
        // Nếu trạng thái là "Đã hủy", xóa đơn hàng
        if (status === "Đã hủy") {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: true, message: "Đơn hàng đã bị hủy và xóa" });
        }
        // Cập nhật trạng thái đơn hàng
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Đã cập nhật trạng thái đơn hàng" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
export const getTotalRevenue = async (req, res) => {
    try {
        const orders = await orderModel.find({ status: "Đã giao" });
      const total = orders.reduce((sum, order) => sum + order.amount, 0);
  
      console.log("Tổng doanh thu:", total);
      res.json({ success: true, total });
    } catch (error) {
      console.error("Lỗi server:", error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  };  
  
export { placeOderStripe, placeOders, placeOdersRazorpay, allOrders, updateStatus, userOrders };
