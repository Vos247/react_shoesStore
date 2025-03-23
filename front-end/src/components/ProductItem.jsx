import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link className="text-gray-700 cursor-pointer group" to={`/product/${id}`}>
      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Ảnh sản phẩm với hiệu ứng zoom */}
        <img 
          src={image[0]} 
          alt={name} 
          className="w-full aspect-square object-cover transform transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Overlay khi hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white text-black px-4 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Xem chi tiết
            </span>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="p-4 bg-white">
          <p className="text-sm font-medium truncate transform transition-transform duration-300 group-hover:text-blue-600">
            {name}
          </p>
          <p className="mt-2 text-sm font-bold bg-gray-100 rounded-lg px-3 py-1 inline-block transform transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
            VND: {price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
