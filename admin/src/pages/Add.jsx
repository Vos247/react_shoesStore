import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const [name,setName]=useState('');
  const [description,setDescription]=useState('')
  const [price,setPrice]= useState('')
  const [category,setCategory]= useState('Men')
  const [subCategory,setSubCategory]= useState('GiayDa')
  const [bestseller,setBestseller]=useState(false)
  const [sizes,setSizes]=useState([])

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      const formData= new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response= await axios.post(backendUrl+ "/api/product/add",formData,{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice('')
        setBestseller(false)
      }
      else{
        toast.error(response.data.message)
      }
      

    } catch (error) {
      console.log( error);
      toast.error(error.message)
   };


  }
  return (
    
   <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div >
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
           <label htmlFor="image1">
        <img className='w-20 border border-gray-300' src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="" />
        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
      </label>
      <label htmlFor="image2">
        <img className='w-20 border border-gray-300' src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="" />
        <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
      </label>
      <label htmlFor="image3">
        <img className='w-20 border border-gray-300' src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="" />
        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
      </label>
      <label htmlFor="image4">
        <img className='w-20 border border-gray-300 ' src={!image4 ? assets.upload : URL.createObjectURL(image4)} alt="" />
        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
      </label>
        </div>
      </div>
     
     
     <div className='w-full'>
        <p className='mb-2'>Tên sản phẩm</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' required />
     </div>
     <div className='w-full'>
        <p className='mb-2'>Mô tả</p>
        <input onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='mo ta san pham ' required />
     </div>


     <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
              <p>Giới tính</p>
              <select onChange={(e)=>setCategory(e.target.value)}  className='w-full px-3 py-3' name="" id="">
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
            <div>
              <p>Thương hiệu</p>
              <select onChange={(e)=>setSubCategory(e.target.value)}  className='w-full px-3 py-3' name="" id="">
                <option value="Timberland">Timberland</option>
                <option value="RickOwens">Rick Owen</option>
                <option value="Converse">Converse</option>
                <option value="Onitsuka">Onitsuka</option>
                <option value="Nike">Nike</option>
              </select>
            </div>
            <div>
              <p className='mb-2'>Giá tiền</p>
              <input onChange={(e)=>setPrice(e.target.value)}  className='w-full px-3 py-2 sm:w-[120px]' type="number" />
            </div>
     </div>


     <div>
      <p className='mb-2'>Sizez</p>
      <div className='flex gap-3'>
      {[...Array(11)].map((_, i) => {
  const size = (35 + i).toString();
  return (
    <div
      key={size}
      onClick={() =>
        setSizes((prev) =>
          prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
        )
      }
    >
      <p
        className={`${
          sizes.includes(size) ? "bg-pink-300" : "bg-slate-200"
        } px-3 py-1 cursor-pointer`}
      >
        {size}
      </p>
    </div>
  );
})}
      </div>
     </div>
     <div className='flex gap-2 mt-2'>
      <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller'/>
      <label className='cursor-pointerpointer' htmlFor="bestseller">Thêm vào mục Bestseller</label>
     </div>
     <button  type='submit' className='w-28 py-3 bg-black text-white'>Add</button>
    </form>
  )
}

export default Add
