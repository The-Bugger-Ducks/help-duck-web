import { BrowserRouter } from "react-router-dom";
import "./style/global.css";
import MyRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
