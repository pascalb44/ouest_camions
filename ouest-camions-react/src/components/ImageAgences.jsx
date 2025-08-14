import React from 'react';
export default function ImagesAgences() {

  const icons = [
    { 
      src: "./images/companycart.jpg", 
      label: "Nos agences",
    },
  
  ];

  return (
    <div className="icon-agencies">
      {icons.map((icon, index) => (
        <div key={index} >
          <img src={icon.src} alt={icon.label}/>
        </div>
      ))}
    </div>
  );
}
