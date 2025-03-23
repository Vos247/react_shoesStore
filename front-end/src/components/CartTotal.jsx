import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = ({ discountAmount }) => {
    const { currency, delivery_Fee, getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount() || 0;
    const discount = Number(discountAmount) || 0; // Đảm bảo là số
    let total = subtotal + (subtotal > 0 ? delivery_Fee : 0) - discount;
    total = total < 0 ? 0 : total; // Không cho tổng tiền âm
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'Cart Total'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm sm:text-lg'>
                <div className='flex justify-between'>
                    <p>Giá tiền</p>
                    <p>{currency}{subtotal.toLocaleString()}</p>
                </div>
                {discount > 0 && (
                    <div className='flex justify-between text-green-500'>
                        <p>Mã giảm giá</p>
                        <p>-{currency}{discount.toLocaleString()}</p>
                    </div>
                )}
                <div className='flex justify-between'>
                    <p>Phí giao hàng </p>
                    <p>{currency}{subtotal === 0 ? 0 : delivery_Fee.toLocaleString()}</p>
                </div>
                <div className='flex justify-between'>
                    <b>Tổng giá tiền</b>
                    <b>{currency}{total.toLocaleString()}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
