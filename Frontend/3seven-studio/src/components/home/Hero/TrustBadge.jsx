import { heroContent } from "../../../data/homeContent";
import { FiCheckCircle } from "react-icons/fi";

function TrustBadge() {
  return (
    <div className="trust-badge">

      <FiCheckCircle />

      <span>{heroContent.trustBadge}</span>

    </div>
  );
}

export default TrustBadge;