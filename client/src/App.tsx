import Dashboard from './pages/Dashboard.tsx';
import Details from './pages/ParticipantsTable.tsx';
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import ProfilesPage from "./pages/ProfilesPage.tsx";
import NotFound from "./pages/NotFound.tsx";


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
                <Route path="/participant" element={<Details />}/>
                <Route path="/participant/:user_id" element={<ProfilesPage/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    </>
  )
}

export default App
