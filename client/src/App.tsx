import Dashboard from './pages/Dashboard.tsx';
import Details from './pages/details.tsx';
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.tsx";


function App() {
  return (
    <>
      {/*<Router>*/}
      {/*    <Routes>*/}
      {/*        <Route path="/" element={<Dashboard />} />*/}
      {/*    </Routes>*/}
      {/*</Router>*/}
      {/*  <Dashboard />*/}
        <Navbar />
        <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/participant" element={<Details />}/>
        </Routes>
    </>
  )
}

export default App
