const Nav = () => {
  return (
    <nav className="navbar">
      <h3>Kanban de l'équipe</h3>

      <div className="navbar__right">
        <p>Bienvenue, {localStorage.getItem("userId")}</p>
      </div>
    </nav>
  );
};

export default Nav;
