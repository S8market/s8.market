import './User.scss';


export function User() {
  return (
    <div className="profileContainer">
      <div className="userInfo">
        <div className="userName">Anima Agrawal</div>
        <div className="userLocation">U.P, India</div>
      </div>
      <button 
        className="settingsIcon"
        aria-label="User settings"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/60b7b9b17c2acebb5e5dd74f801fb80eb1602060f49be830eae07222f480e9f3?placeholderIfAbsent=true&apiKey=e80f20ecf30841dba73cb2738bb00e1e"
          alt=""
        />
      </button>
    </div>
  );
}