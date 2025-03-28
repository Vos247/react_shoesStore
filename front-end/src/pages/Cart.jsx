import {useContext,useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const {products,currency,cartItems,updateQuantity,navigate} = useContext(ShopContext)
  const [cartData,setCartData]=useState([])

  useEffect(()=>{
    if(products.length>0){
       const tempData=[]
    for(const items in cartItems){
        for(const item in cartItems[items]){
            if(cartItems[items][item]>0){
                tempData.push({
                  _id:items,
                 
                  size:item,
                  quantity:cartItems[items][item],
                  
                })
            }
        }
    }
        setCartData(tempData)
    }

   
    
  },[cartItems,products])
  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3 '>
        <Tiltle text1={'Giỏ hàng'} text2={'Sản phẩm'} />
      </div>
      <div>
        {
          cartData.map((item,index)=>{
           const productData = products.find((product)=>product._id===item._id);
           return(
            <div key={index} className='py-4 border-t text-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
              <div className='flex items-start gap-6'>
                <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='text-sm sm:text-lg font-medium text-black'>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                  
                </div>
              </div>
              <input onChange={(e)=>e.target.value ==='' || e.target.value ==='0' ? null: updateQuantity(item._id,item.size,Number(e.target.value)) } type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 sm:px-2 py-1' />
            <img onClick={()=>updateQuantity(item._id,item.size,0)} className='w-5 cursor-pointer' src={assets.bin} alt="" />
            </div>
           )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm sm:text-lg px-4 py-2 '>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart
