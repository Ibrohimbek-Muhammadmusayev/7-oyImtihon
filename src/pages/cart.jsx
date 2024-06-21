import { useState } from 'react';
import Navbar from "../companents/navbar";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Cart() {
    const [todosData, setTodosData] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const user = localStorage.getItem('user');
    return (
        <div>
            <Navbar />
            <div className="navbar mt-[75px] border-b border-[#E2E8F4] max-w-[1090px] m-auto">
                <h1 className="tracking-[1.5px] pb-[22px] text-[#394E6A] text-[30px] font-normal">Shopping Cart</h1>
            </div>
            {/*  wrapper */}
            <div className="navbar max-w-[1090px] flex justify-between flex-wrap m-auto mt-[32px]">
                {/* add card wrapper */}
                <div className="max-w-[715px] flex flex-col">
                    {/* tag */}
                    {/* {id, price, title, brend, images} */}
                    {todosData?.map((item) => (
                        <div key={item.id} className="flex gap-[40px] border-b w-[715px] text-primary text-start h-[152px] justify-between border-[#E2E8F4]">
                            <div className="w-[128px] h-[128px] rounded-[12px]">
                                <img className="w-[128px] h-[128px] rounded-[8px]" src={item.images} alt="avatar" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-[16px]">{item.title}</h1>
                                <p className="text-[14px] text-[#C7C9D1]">{item.brend}</p>
                                <p className="text-[14px]">Color :</p>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-[14px]">Amount</h1>
                                <div className="flex gap-[10px] items-center">
                                    <button className='btn'>+</button>
                                    <input value={item.count} type="number" className="input pl-[20px] input-bordered w-[50px] h-[24px]" />
                                    <button className='btn'>-</button>
                                </div>
                                <p className="text-[#057AFF] text-[14px] cursor-pointer">remove</p>
                            </div>
                            <div className="">
                                <h1 className="text-[16px]">{item.price}$</h1>
                            </div>
                        </div>
                    ))}
                </div>
                {/* right price bar */}
                <div className="flex flex-col">
                    <div className="w-[325px] text-primary m-auto p-[32px] flex flex-col rounded-[16px] gap-[24px] h-[230px] bg-primary-content">
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex border-b pb-[9px] border-[#E2E8F4] justify-between">
                                <p>Subtotal</p>
                                <p>$1,149.96</p>
                            </div>
                            <div className="flex border-b pb-[9px] border-[#E2E8F4] justify-between">
                                <p>Shipping</p>
                                <p>$5.00</p>
                            </div>
                            <div className="flex border-b pb-[9px] border-[#E2E8F4] justify-between">
                                <p>Tax</p>
                                <p>$115.00</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p>Order Total</p>
                            <p>$1,269.96</p>
                        </div>
                    </div>
                    {
                    user === 'false' ? 
                    <NavLink to='/login'><button className="mt-[32px] btn btn-active text-[#ffff] w-[325px] h-[32px] bg-[#057AFF]">PLEASE LOGIN</button></NavLink>
                    :
                    <button onClick={() => {document.getElementById(`my_modal_3`).showModal()}} className="mt-[32px] btn btn-active text-[#ffff] w-[325px] h-[32px] bg-[#057AFF]">PRODUCT ORDER</button>
                    }
                    <dialog id={`my_modal_3`} className="modal ">
                        <div className="modal-box flex flex-col w-[400px] justify-center h-[110px] text-center">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">Do you want to order a product</h3>
                                <form method="dialog">
                                    <button className="btn w-[100px] bg-accent">OK</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
}

export default Cart;
