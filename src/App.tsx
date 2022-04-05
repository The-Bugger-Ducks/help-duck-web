import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes";

import "./shared/styles/global.css";
import "./shared/styles/vars.css";

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
