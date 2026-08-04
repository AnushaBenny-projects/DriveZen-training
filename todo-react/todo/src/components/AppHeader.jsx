import ThemeToggle from "./ThemeToggle";

function AppHeader({
  theme,
  toggleTheme
}) {

  return (

    <div className="header">
      <h1>Todo App</h1>

      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>

  );

}

export default AppHeader;
