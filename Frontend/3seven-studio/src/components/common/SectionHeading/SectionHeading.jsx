import "./SectionHeading.css";

function SectionHeading({
  subtitle,
  title,
  description,
  center = false,
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}

      <h2>{title}</h2>

      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default SectionHeading;