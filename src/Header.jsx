import headerStyle from "./Header.module.css";

function Header() {
  return (
    <>
      <header className={headerStyle.header}>
        <a href="#" className={headerStyle.logo}>
          Jamming App
        </a>
      </header>
    </>
  );
}

export default Header;
