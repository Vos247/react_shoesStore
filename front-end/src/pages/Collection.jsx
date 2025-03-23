import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [priceRange, setPriceRange] = useState('')
  const [sortType, setSortType] = useState('relavent')
  const toggleCategory = (e)=>{
    if(
      category.includes(e.target.value)
    ){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else{
      setCategory(prev=>[...prev, e.target.value])
    }
  } 
  const toggleSubCategory = (e)=>{
    if(
      subCategory.includes(e.target.value)
    ){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev, e.target.value])
    }
  } 
  const togglePriceRange = (e) => {
    const value = e.target.value;
    
    setPriceRange(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value); // Bỏ giá trị nếu đã tồn tại
      } else {
        return [...prev, value]; // Thêm giá trị mới vào danh sách
      }
    });
  };  
  const applyFilter = () => {
    let productsCopy = products.slice();
  
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }  
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        subCategory.some(sub => item.subCategory.includes(sub))
      );      
    }
     // Xử lý lọc theo khoảng giá
  if (priceRange.length > 0) {
    productsCopy = productsCopy.filter((item) => {
      return priceRange.some(range => {
        const [min, max] = range.split('-').map(Number);
        return item.price >= min && item.price <= max;
      });
    });
  }
    setFilterProducts(productsCopy);
  };
  
    const sortProducts = ()=>{
    let fpCopy = filterProducts.slice()
    switch(sortType){
     case 'low-hight':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
      break;
     case 'hight-low':
       setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
      break;
      default:
        applyFilter()
        break;
    }
    }
  useEffect(()=>{
    applyFilter()
  },[category, subCategory,search,showSearch,products,priceRange])
  useEffect(()=>{
    sortProducts()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
     {/*   */} 
     <div className='min-w-60'>
      <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'> BỘ LỌC
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src={assets.dropdown} alt="" />
      </p>
      {/*CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>DANH MỤC</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
        <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />MEN
        </p>
        <p className='flex gap-2'>
          <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />WOMEN
        </p>
      </div>
      </div>
      <div className={`border border-gray-300 pl-5 py-3 mt-6${showFilter ? '' : 'hidden'}`}>
  <p className='mb-3 text-sm font-medium'>THƯƠNG HIỆU</p>
  <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
    <p className='flex gap-2'>
      <input className='w-3' type="checkbox" value={'Timberland'} onChange={toggleSubCategory} /> Timberland
    </p>
    <p className='flex gap-2'>
      <input className='w-3' type="checkbox" value={'RickOwens'} onChange={toggleSubCategory} /> Rick Owens
    </p>
    <p className='flex gap-2'>
      <input className='w-3' type="checkbox" value={'Converse'} onChange={toggleSubCategory} /> Converse
    </p>
    <p className='flex gap-2'>
      <input className='w-3' type="checkbox" value={'Onitsuka'} onChange={toggleSubCategory} /> Onitsuka
    </p>
    <p className='flex gap-2'>
      <input className='w-3' type="checkbox" value={'Nike'} onChange={toggleSubCategory} /> Nike
    </p>
  </div>
</div>
<div className={`border border-gray-300 pl-5 py-3 mt-6${showFilter ? '' : 'hidden'}`}>
  <p className='mb-3 text-sm font-medium'>TÌM THEO GIÁ</p>
  <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox" value="100000-500000" onChange={togglePriceRange} /> 100k đến 500k
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox" value="500000-2000000" onChange={togglePriceRange} /> 500k đến 2 triệu
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox" value="2000000-10000000" onChange={togglePriceRange} /> 2 triệu đến 10 triệu
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox" value="10000000-25000000" onChange={togglePriceRange} /> 10 triệu đến 25 triệu
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox" value="25000000-50000000" onChange={togglePriceRange} /> 25 triệu đến 50 triệu
  </p>
</div>
</div>
     </div>
     {/*Right slide */}
     <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'TẤT CẢ'} text2={'SẢN PHẨM'}/>
        {/*Filter */}
        <select onChange={e=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
          <option value="relavent" >Relavent</option>
          <option value="low-hight">THẤP ĐẾN CAO</option>
          <option value="hight-low">CAO ĐẾN THẤP</option>
        </select>
      </div>
      {/*map product */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 auto-rows-fr">
  {filterProducts.map((item, index) => (
    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
  ))}
</div>
     </div>
    </div>
  )
}

export default Collection
