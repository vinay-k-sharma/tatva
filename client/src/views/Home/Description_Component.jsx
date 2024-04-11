import React from 'react';

const Description_Component = () => {
  const items = [
    { text: '100% Natural Products', img: 'https://cdn.shopify.com/s/files/1/0843/6065/9244/files/Layer_1.svg' },
    { text: 'Dermatologically tested', img: 'https://cdn.shopify.com/s/files/1/0843/6065/9244/files/Layer_1_1.svg' },
    { text: 'Carefully sourced from the most potent origin', img: 'https://cdn.shopify.com/s/files/1/0843/6065/9244/files/Layer_1_2.svg' },
    { text: 'Cold Pressed extraction', img: 'https://cdn.shopify.com/s/files/1/0843/6065/9244/files/Layer_1_3.svg' }
  ];

  return (
    <div className="flex justify-between bg-[#F5EDDB] h-32 py-6 px-3">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <img src={item.img} alt="" className="w-10 h-10 object-cover rounded-full" />
          <p className="text-lg font-semibold">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Description_Component;
