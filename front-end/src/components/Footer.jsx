import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-gray-100 py-12 mt-40">
      <div className="max-w-6xl mx-auto px-6 sm:grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 text-sm">
        
        {/* Cột Logo & Mô tả */}
        <div>
          <img src={assets.logo} className="w-32 mb-4" alt="V-N STORE Logo" />
          <p className="text-gray-700">
            <span className="font-bold">V-N STORE</span> đang cập nhật...
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-bold">V-N STORE</span> hiện nay đã có mặt trên 5 cửa hàng.
          </p>
        </div>
        {/* Cột Danh mục */}
        <div>
          <p className="text-xl font-semibold mb-6">CỬA HÀNG 🏬</p>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-black transition-colors duration-300">🏠 Trang chủ</li>
            <li className="hover:text-black transition-colors duration-300">ℹ️ Thông tin</li>
            <li className="hover:text-black transition-colors duration-300">🚚 Giao hàng</li>
            <li className="hover:text-black transition-colors duration-300">🔏 Chính sách bảo mật</li>
          </ul>
        </div>
        {/* Cột Liên hệ */}
        <div>
          <p className="text-xl font-semibold mb-6">LIÊN HỆ 📞</p>
          <ul className="space-y-2 text-gray-600">
            <li>📍 12 Trịnh Đình Thảo, Tân Phú, TP.HCM</li>
            <li>📞 0902 345 762</li>
            <li>📧 VNStore@gmail.com</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Footer;
