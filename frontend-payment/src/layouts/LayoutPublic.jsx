import { Outlet } from "react-router-dom"
import Navbar from "../components/NavBar"

const LayoutPublic = () => {
  return (
    <div >
        <Navbar/>
        <Outlet/>
      
    </div>
  )
}

export default LayoutPublic
