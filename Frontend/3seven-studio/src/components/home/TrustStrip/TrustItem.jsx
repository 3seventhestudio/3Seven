function TrustItem({ icon: Icon, title, text }) {
  return (
    <div className="trust-item">
      <div className="trust-icon">
        <Icon />
      </div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default TrustItem;