import { useNavigate } from 'react-router-dom';

export default function IconCard() {
  const navigate = useNavigate();

  const icons = [
    { 
      src: "./images/carteRegion.jpg", 
      label: "Nos agences",
      route: "/agences" 
    },
  
  ];

  return (
    <div className="icon-map">
      {icons.map((icon, index) => (
        <div key={index} onClick={() => navigate(icon.route)} >
          <img src={icon.src} alt={icon.label}/>
          <span>{icon.label}</span>
        </div>
      ))}
    </div>
  );
}

