import { Link } from "react-router-dom";
import Navbar from "../companents/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { productdata } from "../utils";

function Home() {
  const [data, setData] = useState([]);
  const [ratingdata, setRatingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productdata("/products");
        setData(response.data.products);

        const filterret = response.data.products?.filter((item) => {
          return item.price >= 100;
        });
        setRatingData(filterret);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    console.log(data);

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="m-auto mt-[80px] max-w-[1090px] text-none flex h-[100%]">
        <div className="">
          <div className="flex items-center gap-[130px]">
            <div className="max-w-[496px] flex flex-col gap-[32px]">
              <h1 className="text-start text-[#394E6A] text-[60px] font-bold tracking-[-1.5px]">
                We are changing <br /> the way people <br /> shop
              </h1>
              <p className="text-start text-[#394E6A] text-[18px] font-normal text-p-text-color">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
                Tempore repellat explicabo enim soluta temporibus asperiores <br />
                aut obcaecati perferendis porro nobis.
              </p>
              <Link to="/products" className="text-start">
                <button className="btn text-[#ffff] w-[147px] h-[48px] bg-[#057AFF]">
                  OUR PRODUCTS
                </button>
              </Link>
            </div>
            <div className="max-w-[496px]">
              <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
              {/* <div className="carousel-item">
                  <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />
                </div> */}
                {ratingdata.map((item) => (
                  <div key={item.id} className="carousel-item">
                    <img src={item.images[0]} className="rounded-box bg-[#fff] w-[320px] h-[416px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="navbar mt-[96px] border-b border-[#E2E8F4]">
            <h1 className="text-[#394E6A] font-normal text-[30px]">featured products</h1>
          </div>
          {/* card wrapper */}
          <div className="flex flex-wrap mb-[200px] gap-[16px] max-w-[1090px] items-center justify-center mt-[48px]">
            {ratingdata?.map((item) => (
              <div key={item.id} className="card w-[352px] h-[332px] bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                  <img src={item.images[0]} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.title}</h2>
                    <p>$: {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
