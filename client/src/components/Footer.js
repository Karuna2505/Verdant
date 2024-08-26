import React,{ useState,useEffect } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebook,FaInstagram,FaTwitter,FaYoutube,FaChevronDown,FaChevronUp } from "react-icons/fa";


const card=[
  {
    title: 'ABOUT US',
    items: ['Our Story', 'Careers', 'Contact Us', 'Locate Stores', 'Own Grown', 'Garden Services &', 'Maintenance'],
  },
  {
    title: 'CUSTOMER CARE',
    items: ['Take the plant quiz', 'Track Order', 'Shipping Policy', 'Terms and Conditions', 'Privacy Policy', 'FAQS', 'Terms of Services', 'Refund Policy'],
  },
  {
    title: 'OFFERS AND REWARDS',
    items: ['Plants Parent Reward Club', 'Verdant Coupons'],
  },
  {
    title: 'GET IN TOUCH',
    items: ['Call:1234567890', 'Email:karunamathur14@gmail.com'],
  },
]

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <div className='flex flex-col items-center'>
    <hr className='w-full bg-[#397b57]'/>
    <div className='flex flex-col-reverse md:flex md:flex-row justify-center mx-4 sm:mx-8 md:mx-12 text-[#397b57] gap-4 sm:gap-6  lg:gap-20 px-4 py-8 sm:py-16 '>
      <div className='flex flex-col sm:flex sm:flex-row gap-2 sm:gap-10 lg:gap-14'>


      {card.map((section, index) => (
    <div key={index} className='w-full sm:w-1/2'>
      <div className='flex gap-6'>
      <h2 className='mb-6 font-medium sm:text-sm md:text-base'>{section.title}</h2>
      <button
              className='block sm:hidden h-7 w-7'
              onClick={() => toggleSection(index)}
            >
              {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
      </div>
      <ul className={`md:text-xs lg:text-sm ${openSection === index || windowWidth >= 640 ? 'block' : 'hidden'}`}>
        {section.items.map((item, idx) => (
          <li key={idx} className="py-1 sliding-underline w-fit">{item}</li>
        ))}
      </ul>
    </div>
        ))}

        
      </div>
      <div className='w-full sm:w-4/5 md:w-1/5'>
        <h2 className='font-medium text-base mb-4'>SIGN UP FOR OUR NEWSLETTER</h2>
        <p className='text-sm py-1'>For plant care tips,our featured plant of the week,exclusive offers and discounts</p>
        <div className='flex flex-wrap'>
          <input placeholder='Enter email address' className='border-b-2 border-[#92bca5] py-1 outline-none'/>
          <FaArrowRightLong className='mt-3'/>
        </div>
        <h2 className='py-1 text-base font-medium mt-2'>FOLLOW US</h2>
        <div className='flex gap-4 my-2'>
        <FaFacebook className='zoom h-6 w-6'/>
        <FaInstagram className='zoom h-6 w-6'/>
        <FaTwitter className='zoom h-6 w-6'/>
        <FaYoutube className='zoom h-6 w-6'/>
        </div>
        <a href='google.maps.com' className='text-base font-medium mt-2'>SITEMAP</a>
      </div>
    </div>
    <div className='text-sm font-normal text-[#397b57] my-4 hover:font-medium'>©2024,Verdant.All right reserved.</div>
    </div>
  )
}

export default Footer
