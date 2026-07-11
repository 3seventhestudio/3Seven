import { heroContent } from "../../../data/homeContent";
import { FiShoppingBag } from "react-icons/fi";

function FloatingCard() {
  return (
    <div className="floating-card">

      <div className="floating-icon">

        <FiShoppingBag />

      </div>

      <div>

        <h4>{heroContent.floatingTitle}</h4>

        <p>{heroContent.floatingText}</p>

      </div>

    </div>
  );
}

export default FloatingCard;