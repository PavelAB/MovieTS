import { Outlet } from "react-router-dom";


function App() {  

  return (
      <div className="body">
        <div className="container">
          <div>

          </div>
          <Outlet />
          <div>

          </div>
          </div>
        
      </div>
    
  )
}

export default App
