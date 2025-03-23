import { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('V-N Store cảm ơn quý khách, mong quý khách sớm quay lại nhé!');
    setToken('');
    setCartItems({});
  };

  return (
    <>
      <div className='h-[60px]'></div>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'h-[55px] bg-white/95 backdrop-blur-md shadow-lg' : 'h-[60px] bg-white shadow-md'}`}>
        <div className='max-w-7xl mx-auto h-full px-6 flex items-center justify-between'>
          <Link to='/' className='transition-transform hover:scale-110'>
            <img src={assets.logo} className={`transition-all duration-300 ${isScrolled ? 'h-[28px]' : 'h-[32px]'}`} alt="V-N STORE" />
          </Link>

          <ul className='hidden sm:flex gap-7 text-gray-700 text-sm font-medium'>
            <NavLink to='/' className='relative group'>
              <p className='group-hover:text-black transition-colors'>TRANG CHỦ</p>
            </NavLink>
            <NavLink to='/collection' className='relative group'>
              <p className='group-hover:text-black transition-colors'>SẢN PHẨM</p>
            </NavLink>
            <NavLink to='/about' className='relative group'>
              <p className='group-hover:text-black transition-colors'>THÔNG TIN</p>
            </NavLink>
            <NavLink to='/contact' className='relative group'>
              <p className='group-hover:text-black transition-colors'>LIÊN HỆ</p>
            </NavLink>
          </ul>

          <div className='flex items-center gap-4'>
            <img onClick={() => setShowSearch(true)} src={assets.search} className='w-5 cursor-pointer hover:scale-110 transition-transform' alt="Tìm kiếm" />

            <div className='relative group'>
              <img onClick={() => token ? null : navigate('/login')} src={assets.avt} className='w-6 cursor-pointer hover:scale-110 transition-transform' alt="Tài khoản" />
              {token && (
                <div className='absolute right-0 top-full mt-2 hidden group-hover:block bg-white shadow-xl rounded-lg w-44 py-3 px-4 text-gray-700 text-sm'>
                  <p className='cursor-pointer hover:text-black transition-colors'>TÀI KHOẢN CỦA TÔI</p>
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black transition-colors mt-2'>ĐƠN HÀNG CỦA TÔI</p>
                  <p onClick={logout} className='cursor-pointer hover:text-red-600 transition-colors mt-2'>ĐĂNG XUẤT</p>
                </div>
              )}
            </div>

            <Link to='/cart' className='relative'>
              <img src={assets.cart} className='w-6 hover:scale-110 transition-transform' alt="Giỏ hàng" />
              <p className='absolute right-[-4px] bottom-[-4px] w-4 h-4 text-center leading-4 bg-black text-white rounded-full text-[10px]'>
                {getCartCount()}
              </p>
            </Link>

            <img onClick={() => setVisible(true)} src={assets.menu} className='w-6 cursor-pointer sm:hidden hover:scale-110 transition-transform' alt="Menu" />
          </div>
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 transform ${visible ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '250px' }}>
        <div className='flex flex-col text-gray-700 text-sm font-medium'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 transition-colors'>
            <img className='h-3 rotate-180' src={assets.dropdown} alt="Back" />
            <p>Quay lại</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-5 border-b hover:bg-gray-100 transition-colors' to='/'>🏠 Trang chủ</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-5 border-b hover:bg-gray-100 transition-colors' to='/collection'>🛍 Sản phẩm</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-5 border-b hover:bg-gray-100 transition-colors' to='/about'>ℹ️ Thông tin</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-3 pl-5 border-b hover:bg-gray-100 transition-colors' to='/contact'>📞 Liên hệ</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
