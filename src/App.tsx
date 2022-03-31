import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes";
import "./styles/global.css";
import "./styles/vars.css";

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
