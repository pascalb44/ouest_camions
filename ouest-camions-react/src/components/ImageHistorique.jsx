
export default function IconPromoHome() {

  const icons = [
    {
      src: "./images/historique.jpg",
      label: "historique",
    },
  ];

  return (
    <div className="image-historique">
      {icons.map((icon, index) => (
        <div key={index} >
          <img src={icon.src} alt={icon.label} />
        </div>
      ))}
    </div>
  );
}

