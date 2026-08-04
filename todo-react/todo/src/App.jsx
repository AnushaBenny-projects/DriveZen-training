import AddTodo from "./components/AddTodo";
import AppHeader from "./components/AppHeader";
import DisplayTodos from "./components/DisplayTodos";
import useTheme from "./hooks/UseTheme";
import useTodos from "./hooks/useTodos";
import "./App.css";

function App() {

  const API_URL = import.meta.env.VITE_API_URL;
  const { theme, toggleTheme } = useTheme();
  const {
    todos,
    addTodo,
    completeTodo,
    editTodo,
    deleteTodo
  } = useTodos(API_URL);


  return (

    <div className={`app ${theme}`}>

      <div className="container">

        <AppHeader
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <AddTodo addTodo={addTodo} />

        <DisplayTodos
          todos={todos}
          completeTodo={completeTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />

      </div>

    </div>

  );

}

export default App;
