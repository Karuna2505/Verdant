import { IoIosCloseCircle } from "react-icons/io";
const Cart=({toggle})=>{ 

    return(
        <div className="w-[16rem] h-svh bg-white fixed right-0 top-0 flex flex-col text-[#357b57]">
        <IoIosCloseCircle className="text-4xl m-4 cursor-pointer" onClick={toggle}/>
        <h1 className="text-xl m-4">Cart is empty</h1>
    </div>
    )
}

export default Cart;