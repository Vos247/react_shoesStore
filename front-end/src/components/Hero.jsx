import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    assets.combo2,
    assets.hero1,
    assets.combo5,
    assets.combo11,
    assets.combo3,
    assets.combo4,
    assets.combo5,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container mx-auto px-4 my-8 relative'>
      <div className='flex flex-col sm:flex-row border border-gray-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[400px]'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center p-8'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse rounded-full'></p>
              <h2 className='relative text-2xl md:text-3xl font-bold group'>
                <span className='relative inline-block animate-shine'>
                  SẢN PHẨM NỔI BẬT
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full'></span>
                </span>
              </h2>
            </div>
            
            <p className='text-lg md:text-xl mt-4 relative overflow-hidden group'>
              <span className='inline-block transform hover:scale-105 transition-transform duration-300'>
                Các sản phẩm mới nhất
              </span>
            </p>

            <div className='flex items-center gap-2 mt-4'>
              <Link>
                <p className='font-semibold text-sm md:text-base relative group overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 hover:scale-105 transition-transform duration-300 cursor-pointer'>
                  Xem tất cả
                </p>
              </Link>
              <p className='w-8 md:w-11 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse rounded-full'></p>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <div className='w-full sm:w-1/2 relative h-full overflow-hidden'>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=''
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform ${
                index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          ))}
          {/* Navigation Buttons */}
          <button 
            className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300'
            onClick={() => setCurrentImageIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1)}
          >
            &#10094;
          </button>
          <button 
            className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300'
            onClick={() => setCurrentImageIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Background Effects */}
      <div className='absolute -z-10 w-[250px] h-[250px] bg-blue-200 rounded-full blur-3xl opacity-40 top-[-50px] left-[-50px]'></div>
      <div className='absolute -z-10 w-[250px] h-[250px] bg-purple-200 rounded-full blur-3xl opacity-40 bottom-[-50px] right-[-50px]'></div>
    </div>
  );
};

export default Hero;
