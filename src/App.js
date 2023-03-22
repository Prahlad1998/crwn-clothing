import {Routes,Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
const Shop =()=>{
  return (
<h2>This is the SHOPPING page</h2>
  )
}

const App=()=> {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
      <Route index element={<Home/>}  />
      <Route path="Shop" element={<Shop/>}  />
      <Route path="signIN" element={<SignIn/>}  />
      </Route>
    </Routes>
  );
}

export default App;
