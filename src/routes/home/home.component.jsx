import { Outlet} from 'react-router-dom';
import Directory from "../../components/directory/directory.component";
const Home=()=> {
  // create objects
  return (
    <div>
    <Directory/>
    <Outlet/>
    </div>

  );
}
export default Home;