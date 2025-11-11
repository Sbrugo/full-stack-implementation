import "./App.css";
import { NotesProvider } from "./context/NotesContext";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <NotesProvider>
      <div className="bg-black min-h-screen w-full">
        <NotesPage />
      </div>
    </NotesProvider>
  );
}

export default App;
