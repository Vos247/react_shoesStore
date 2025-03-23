
import { assets } from '../assets/assets'
import Tiltle from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Tiltle text1={'About'} text2={'Us'} />
        
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.combo11} alt="" />
        <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-500'>
        <p>Giày là một loại phụ kiện quan trọng trong thời trang và đời sống hàng ngày, không chỉ giúp bảo vệ bàn chân mà còn thể hiện phong cách cá nhân. Có nhiều loại giày khác nhau phục vụ cho từng mục đích cụ thể, như giày thể thao, giày tây, giày cao gót, giày lười, giày sneaker, và nhiều loại khác.</p>
        <p>Giày là một loại phụ kiện quan trọng trong thời trang và đời sống hàng ngày, không chỉ giúp bảo vệ bàn chân mà còn thể hiện phong cách cá nhân. Có nhiều loại giày khác nhau phục vụ cho từng mục đích cụ thể, như giày thể thao, giày tây, giày cao gót, giày lười, giày sneaker, và nhiều loại khác.</p>
        <b className='text-black'>Our Mission</b>
        <p>Giày là một loại phụ kiện quan trọng trong thời trang và đời sống hàng ngày, không chỉ giúp bảo vệ bàn chân mà còn thể hiện phong cách cá nhân. Có nhiều loại giày khác nhau phục vụ cho từng mục đích cụ thể, như giày thể thao, giày tây, giày cao gót, giày lười, giày sneaker, và nhiều loại khác.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Tiltle text1={'Why'} text2={'Chosse'} />

      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
