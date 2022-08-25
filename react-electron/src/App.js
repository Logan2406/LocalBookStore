import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import {Routes,Route} from "react-router-dom"
import Link1 from './components/Link1';
import Link2 from './components/Link2';
import Link3 from './components/Link3';
import Link4 from './components/Link4';
import Form from './components/Form';
function App() {
  return (

<div className="main-div">
      <Sidebar/>
      <div className="main-content">

        <Routes>
          <Route path="" exact element={<Form/>}/>
          <Route path="/link1/*" exact element={<Link1/>}/>
          <Route path="/link2/*" element={<Link2/>}/>
          <Route path="/link3/*" element={<Link3/>}/>
          <Route path="/link4/*" element={<Link4/>}/>
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
