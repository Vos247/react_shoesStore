import {useContext,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const {productId}=useParams();
  const {products,currency,addToCart}=useContext(ShopContext)
  const [productData,setProductData]=useState(false)
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')
  const fetchProductData=async ()=>{
    products.map((item)=>{
     if(String(item._id)=== productId){
      setProductData(item)
      setImage(item.image[0])
      return null
     }
     
    })
  }
  useEffect(()=>{
    fetchProductData()
  },[productId])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img 
                  key={index} 
                  src={item} 
                  alt="" 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity duration-300' 
                  onClick={() => setImage(item)}
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto'/>
          </div>
        </div>
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img className='w-3 5' src={assets.starlight} alt="" />
              <img className='w-3 5' src={assets.starlight} alt="" />
              <img className='w-3 5' src={assets.starlight} alt="" />
              <img className='w-3 5' src={assets.starlight} alt="" />
              <img className='w-3 5' src={assets.stardark} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency.symbol}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Kích cở</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border-2 border-gray-200 p-2 bg-gray-200 cursor-pointer ${size===item ? 'border-red-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
<button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-4 py-2 '>THÊM VÀO GIỎ HÀNG</button>
                <hr className='mt-8 sm:w-4/5' />
                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>Cam kết chính hãng </p>
                  <p>Thanh toán khi nhận hàng  </p> 
                  <p>Đổi trả trong 7 ngày</p>
                </div>
        </div>
      </div>
        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>MÔ TẢ sản PHẨM </b>
            <b className='border px-5 py-3 text-sm'>đánh giá từ khách hàng</b>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Đang cập nhật...</p>
          </div>
        </div>
        <RelatedProduct  category={productData.category}  subCategory={productData.subCategory}/>
    </div>
  ): <div className='opacity-0'>Loading...</div>
}

export default Product