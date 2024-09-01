import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";


function App() {  

  return (
      <div className="body">
        <div className="container">
          <Header />
          <Outlet />
          <div>

          </div>
          </div>
        
      </div>
    
  )
}

export default App
