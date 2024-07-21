import React from "react";

const Home = () => {
    return (
        <div>
            <div className="h-auto bg-[#397b57] flex flex-col  md:flex-row md:justify-between px-6 md:px-12 lg:px-20 gap-4 items-center">
                <div className="w-full md:w-4/12 text-white">
                    <h1 className="pt-8 md:pt-0 text-5xl lg:text-6xl font-semibold">
                        Life in love with
                    </h1>
                    <div className="flex">
                        <h1 className="text-5xl lg:text-6xl font-semibold">plants</h1>
                        <img
                            src="./plant1.png"
                            alt="plant"
                            className="h-14 w-14 lg:h-20 lg:w-20 mt-3 ml-3"
                        />
                    </div>
                    <h1 className="font-medium text-lg pt-5 md:pt-9">280+</h1>
                    <h1 className="pb-4">shops around the world</h1>
                </div>
                <div className="h-full bg-[#b1c6bb] rounded-[5rem] md:rounded-t-full  w-10/12 sm:w-6/12 md:w-4/12 flex justify-center">
                    <img src="./Plant.png" alt="Plant" className="h-[20rem] md:h-[28rem]" />
                </div>
                <div className="w-full md:w-4/12 flex flex-col gap-6 text-white py-6 md:py-10 md:px-8">
                    <p className="">
                        Plants are vital organisms that
                        harness sunlight through photosynthesis.
                        They range from mosses to trees, supporting
                        ecosystems, providing oxygen, and sustaining
                        life on Earth.
                    </p>
                    <div>
                        <button className="py-2 px-4 rounded-3xl bg-[#b1c6bb] md:bg-white text-[#397b57] font-medium">
                            Show the shop
                        </button>
                    </div>
                    <div>
                        <h1 className="text-lg">325+</h1>
                        <p>Unique plants including signature items</p>
                    </div>
                </div>
            </div>
            <div className="bg-white text-[#397b57] pt-28 flex flex-col md:flex md:flex-row items-center justify-center px-6 md:px-20 mb-20">
                    <img src="./plant4.jpg" alt="" className="w-[22rem] h-[20rem] rounded-3xl"/>       
                <div className="flex flex-col gap-8 w-8/12 md:w-5/12 items-center py-8">
                    <h1 className="text-3xl font-bold text-[#17171e] text-center">
                        Decore your home with natural beauty
                    </h1>
                    <p className="text-[#989a9e] font-bold text-center">
                        Green plants obtain most of their energy from sunlight via
                        photosynthesis by primary chloroplasts that are derived from
                        endosymbiosis with cynobacteria.
                    </p>
                    <button className="text-[#397b57] font-medium border border-[#397b57] rounded-3xl px-4 py-2 w-40">
                        Read more
                    </button>
                </div>
                <img src="./plant3.png" alt="" className="h-[20rem] px-2 md:px-8" />
            </div>
        </div>
    );
};

export default Home;
