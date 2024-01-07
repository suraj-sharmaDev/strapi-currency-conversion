import "./App.css";
import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";

function App() {
  return (
    <main>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </main>
  );
}

export default App;
