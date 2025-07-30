import { useState } from "react";
import tahbihImg from "../../assets/images/sibha.png";
const Tasbih = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
    localStorage.setItem("tasbihCount", count.toString());
  };
  const handleReset = () => {
    setCount(0);
    localStorage.setItem("tasbihCount", "0");
  };
  return (
    <div className="tasbihContainer">
      <span className="tasbihCount">
        {localStorage.getItem("tasbihCount")
          ? localStorage.getItem("tasbihCount")
          : count}
      </span>
      <button className="reset" onClick={() => handleReset()}></button>
      <img
        src={tahbihImg}
        alt="Tasbih"
        style={{ width: "350px", height: "auto" }}
      />
      <button className="increase" onClick={() => handleIncrease()}></button>
    </div>
  );
};

export default Tasbih;
