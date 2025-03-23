import { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_Fee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
  });
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Kiểm soát trạng thái mã giảm giá
  

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const applyDiscount = () => {
    if (isDiscountApplied) return; // Nếu đã áp dụng thì không cho nhập lại
    
    const validCode = import.meta.env.VITE_DISCOUNT_CODE;
    const discountValue = Number(import.meta.env.VITE_DISCOUNT_AMOUNT) || 0;
    
    if (discountCode === validCode) {
        let discountApplied = 0;
        const cartAmount = getCartAmount();

        if (typeof discountValue === 'string' && discountValue.includes('%')) {
            const percent = parseFloat(discountValue.replace('%', ''));
            if (!isNaN(percent)) {
                discountApplied = (cartAmount * percent) / 100;
                toast.success(`Mã giảm giá hợp lệ! Giảm ${percent}% (${discountApplied.toFixed(0)} VND)`);
            }
        } else {
            discountApplied = Number(discountValue) || 0;
            toast.success(`Mã giảm giá hợp lệ! Giảm ${discountApplied} VND`);
        }

        setDiscountAmount(discountApplied);
        setIsDiscountApplied(true); // Không cho nhập lại mã
    } else {
        setDiscountAmount(0);
        toast.error("Mã giảm giá không hợp lệ!");
    }
};

const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === items));
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    let finalTotal = getCartAmount() + delivery_Fee - discountAmount;
    if (finalTotal < 0) finalTotal = 0;

    let orderData = {
      address: formData,
      items: orderItems,
      amount: finalTotal,
      discount: discountAmount
    };

    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });

    if (response.data.success) {
      setCartItems({});
      navigate('/orders');
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      <div className='flex flex-col gap-4 sm:max-w[480]'>
        <Title text1={'Delivery '} text2={'Information'} />
        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} type='text' placeholder='First Name' className='border p-2 w-full' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} type='text' placeholder='Last Name' className='border p-2 w-full' />
        </div>
        <input required name='email' value={formData.email} onChange={onChangeHandler} type='email' placeholder='Email' className='border p-2 w-full' />
        <input required name='street' value={formData.street} onChange={onChangeHandler} type='text' placeholder='Street Address' className='border p-2 w-full' />
        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler} type='text' placeholder='City' className='border p-2 w-full' />
          <input required name='state' value={formData.state} onChange={onChangeHandler} type='text' placeholder='State' className='border p-2 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} type='text' placeholder='Zipcode' className='border p-2 w-full' />
          <input required name='country' value={formData.country} onChange={onChangeHandler} type='text' placeholder='Country' className='border p-2 w-full' />
        </div>
        <input required name='phone' value={formData.phone} onChange={onChangeHandler} type='number' placeholder='Phone' className='border p-2 w-full' />
      </div>
      <div className='mt-8'>
          <CartTotal discountAmount={discountAmount} />
          <div className='mt-6'>
            <p className='text-lg font-medium'>Mã giảm giá</p>
            <div className='flex gap-2 mt-2'>
              <input type='text' placeholder='Nhập mã giảm giá' className='border p-2 w-full' value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
              <button type='button' className='bg-blue-500 text-white px-4 py-2' onClick={applyDiscount}>Áp dụng</button>
            </div>
          </div>
        <div className='mt-12'>
          <Title text1={'Payment '} text2={'Method'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-500' : ''}`}></p>
              <p>TRẢ TIỀN MẶT KHI NHẬN HÀNG</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white text-sm sm:text-lg px-4 py-2'>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOder;
