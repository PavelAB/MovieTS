import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// TODO Background; it must be responsive. Currently, it is not


function App() {  

  return (
      <div className="body">
        <div className="container">
          <Header />
          <Outlet />
          <Footer />
        </div>        
      </div>
    
  )
}

export default App
