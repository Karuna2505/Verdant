import React,{useState} from 'react'
import {FaPlus,FaMinus} from "react-icons/fa6"

const Filter = ({title,category}) => {
    const [isOpen,setOpen] = useState(false);
    const toggleSign=()=>{
      setOpen(!isOpen);
    }
  return (
    <div className='flex flex-col gap-2'>

  <hr className='bg-[#357b57] h-[2px] w-full'/>
  <div className='flex justify-between'>
  <h1>{title}</h1>
  <h1 className='font-medium mt-1' onClick={toggleSign}>{isOpen ? <FaMinus /> :<FaPlus />}</h1>
  </div>
  <ul className={`text-sm  ${isOpen ? 'block' : 'hidden'}`}>
    {category.map(item=>{
      return <div className='flex gap-2'><input type='checkbox' className='checked:bg-[#357b57] hover:bg-[#357b57]'/><li>{item}</li></div>
    })}
   </ul>
       
    </div>
  )
}

export default Filter
