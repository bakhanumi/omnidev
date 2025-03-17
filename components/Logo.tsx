export default function Logo() {
  return (
    <div className="logo-section">
      <svg className="elixir-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 L90 80 L50 100 L10 80 Z" className="logo-shape" />
        <path d="M40 30 L60 30 L65 45 L35 45 Z" className="logo-detail" />
        <path d="M35 55 L65 55 L70 70 L30 70 Z" className="logo-detail" />
      </svg>
      <span>omniscient<br />dev</span>
    </div>
  );
}
