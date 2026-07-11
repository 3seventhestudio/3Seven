import "./Breadcrumb.css";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb-container">
      <div className="container">

        <nav className="breadcrumb">

          {items.map((item, index) => (
            <span key={index}>

              {index !== 0 && (
                <span className="separator">/</span>
              )}

              {item.link ? (
                <Link to={item.link}>
                  {item.label}
                </Link>
              ) : (
                <span className="active">
                  {item.label}
                </span>
              )}

            </span>
          ))}

        </nav>

      </div>
    </div>
  );
}