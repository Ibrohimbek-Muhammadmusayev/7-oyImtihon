import React, { useEffect, useState } from "react";
import Navbar from "../companents/navbar";
import { productdata } from "../utils";
import "./../index.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todoSlice";

function Products() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchtitle, setSearchtitle] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const [categorydata, setCategorydata] = useState([]);
  const [prices, setPrices] = useState(0);
  const [category, setCategory] = useState("");
  const [skips, setSkips] = useState(0);
  const [brend, setBrend] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [skips]);

  const fetchData = async () => {
    try {
      const response = await productdata(`/products?limit=15&skip=${skips}`);
      setData(response.data.products);
      setSearchdata(response.data.products); // Initial search data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await productdata("/products/category-list");
      setCategorydata(response.data);
    } catch (error) {
      console.error("Error fetching category data: ", error);
    }
  };

  const searchFunc = () => {
    let filteredData = data;

    if (searchtitle) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(searchtitle.toLowerCase())
      );
    }

    if (category) {
      filteredData = filteredData.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (prices > 0) {
      filteredData = filteredData.filter((item) => item.price <= prices);
    }

    if (brend) {
      filteredData = filteredData.filter((item) => item.brand === brend);
    }

    setSearchdata(filteredData);
  };

  const selectCategory = (e) => {
    setCategory(e.target.value);
  };

  const selectCompany = (e) => {
    setBrend(e.target.value);
  };



  const addCard = (item)=>{
    dispatch(addTodo({
      id: item.id,
      title: item.title,
      brend: item.brend,
      count: 1,
      price: item.price,
      images: item.images[0],
  }));
  console.log(item);
  }

  return (
    <div>
      <Navbar />
      <div className="navbar mt-[80px] bg-primary-content max-w-[1090px] rounded-[6px] justify-between m-auto">
        <div className="flex flex-col m-auto gap-[40px]">
          <div className="flex max-w-[1090px] flex-wrap m-auto mt-[24px] justify-center gap-[30px]">
            <div className="form-control flex max-w-[244px]">
              <label className="flex label mr-[100px]">search product</label>
              <input
                type="text"
                value={searchtitle}
                onChange={(e) => setSearchtitle(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col max-w-[244px]">
              <label className="label mr-[105px]">select category</label>
              <select
                value={category}
                onChange={selectCategory}
                className="select w-full input-bordered max-w-[244px] h-[32px]"
              >
                <option value="">all</option>
                {categorydata?.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col max-w-[244px]">
              <label className="label mr-[105px]">select company</label>
              <select
                value={brend}
                onChange={selectCompany}
                className="select w-full input-bordered max-w-[244px] h-[32px]"
              >
                <option value="">all</option>
                {data?.map((item) => (
                  <option value={item.brand} key={item.id}>
                    {item.brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col max-w-[244px]">
              <label className="label mr-[165px]">sort by</label>
              <select className="select w-full input-bordered max-w-[244px] h-[32px]">
                <option value="a-z">a-z</option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
            </div>
          </div>
          <div className="navbar flex flex-wrap items-center justify-between">
            <div className="flex flex-col m-auto w-[205px]">
              <div className="flex gap-[30px]">
                <span>select price</span>
                <span>${prices}.00</span>
              </div>
              <input
                type="range"
                min={0}
                max="100"
                value={prices}
                onChange={(e) => setPrices(e.target.value)}
                className="range range-primary max-w-[244px]"
              />
              <div className="flex gap-[30px]">
                <span>${prices}.00</span>
                <span>Max : $100.00</span>
              </div>
            </div>
            <div className="flex m-auto gap-[16px]">
              <button
                onClick={searchFunc}
                className="btn btn-active text-[#ffff] w-[224px] h-[32px] bg-[#057AFF]"
              >
                SEARCH
              </button>
              <button
                onClick={() => {
                  setSearchtitle("");
                  setCategory("");
                  setBrend("");
                  setPrices(0);
                }}
                className="btn btn-active text-[#ffff] w-[224px] h-[32px] bg-[#C149AD]"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar flex justify-between max-w-[1090px] m-auto mt-[36px] h-[70px] border-b boder-[#E2E8F4]">
        <h1 className="text-[#394E6A] text-[16px] font-normal">15 products</h1>
        <div className="flex">
          <button className="btn btn-square btn-ghost">
            <img src="/public/Button.svg" alt="button logo" />
          </button>
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* cart wrapper */}
      <div className="flex flex-wrap gap-[16px] max-w-[1090px] m-auto mt-[48px]">
        {searchdata?.map((item) => (
          <div key={item.id} className="card w-[352px] h-[400px] bg-base-100 shadow-xl">
            <figure className="px-5 w-[320px] h-[250px] pt-5">
              <img src={item.images[0]} alt="Shoes" className="rounded-xl " />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.price}</p>
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(`my_modal_${item.id}`).showModal();
                }}
                className="btn w-[220px]"
              >
                Buy now
              </button>
            </div>
            <dialog id={`my_modal_${item.id}`} className="modal ">
              <div className="modal-box flex flex-col w-[300px] h-[500px] text-center">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg mb-[10px]">Add Korzinka</h3>
                <div className="flex justify-center items-center gap-[20px]">
                  <button onClick={(e)=> {
                    
                  }} className="btn w-[100px] btn-primary">+</button>
                  <span>1</span>
                  <button className="btn w-[100px] btn-primary">-</button>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <figure className="w-[200px] h-[260px]">
                    <img src={item.images[0]} alt="Shoes" />
                  </figure>
                  <p>{item.title}</p>
                </div>
                <div className="flex justify-center items-center mt-[30px]">
                  <button onClick={()=>addCard(item)} className="btn w-[100px] btn-primary">Add</button>
                </div>
              </div>
            </dialog>
          </div>
        ))}
        <div className="navbar max-w-[1090px] flex justify-end">
          <div className="join mt-[64px] border-r border-[#ffff] mb-[80px]">
            <input value={15} onClick={(e)=>setSkips(e.target.value)} className="join-item border-r border-[#ffff] btn" type="radio" name="option" aria-label="PREV" />
            <input value={15} onClick={(e)=>setSkips(e.target.value)} className="join-item btn btn-square" type="radio" name="options" aria-label="1" defaultChecked />
            <input value={30} onClick={(e)=>setSkips(e.target.value)} className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
            <input value={15} onClick={(e)=>setSkips(e.target.value)} className="join-item border-r border-[#ffff] btn" type="radio" name="option" aria-label="NEXT" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
