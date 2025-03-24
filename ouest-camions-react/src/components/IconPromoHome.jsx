
export default function IconPromoHome() {

  const icons = [
    { 
      src: "./images/promoImage2.jpg", 
      label: "Promotion",

    },
  
  ];

  return (
    <div className="icon-promo">
      {icons.map((icon, index) => (
        <div key={index} >
          <img src={icon.src} alt={icon.label}/>
        </div>
      ))}
    </div>
  );
}

