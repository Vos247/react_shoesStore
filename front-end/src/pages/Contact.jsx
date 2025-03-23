
import Tiltle from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
            <Tiltle text1={'Contact'} text2={'Us'} />
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <div className='w-full md:max-w-[480px]'>
                <img src={assets.combo11} alt="" />
            </div>
            <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-500'>
               <p>tel: 0902 345 762</p>
               <p>email: VNStore@gmail.com</p>
               <p>address: 12 Trịnh Đình Thảo, Tân Phú, TP.HCM</p>
            </div>
           
        </div>
        <NewsletterBox />
    </div>
    
  )
}

export default Contact
