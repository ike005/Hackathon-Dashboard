import Dashboard from './pages/Dashboard.tsx';
import Dashboard2 from './pages/Dashboard2.tsx';
import Details from './pages/details.tsx';
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import ParticipantProfile from "./pages/participantProfile.tsx";


function App() {
  return (
    <>
      {/*<Router>*/}
      {/*    <Routes>*/}
      {/*        <Route path="/" element={<Dashboard />} />*/}
      {/*    </Routes>*/}
      {/*</Router>*/}
      {/*  <Dashboard />*/}
        <div className="flex flex-row">
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/2" element={<Dashboard2 />}/>
                <Route path="/participant" element={<Details />}/>
                <Route path="/participant/:id" element={<ParticipantProfile/>} />
            </Routes>
        </div>
    </>
  )
}

export default App
