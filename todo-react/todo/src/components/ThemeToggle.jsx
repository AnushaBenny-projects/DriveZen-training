function ThemeToggle({
  theme,
  toggleTheme
}) {

  return (

    <button
      type="button"
      className="themeBtn"
      onClick={toggleTheme}
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>

  );

}

export default ThemeToggle;
