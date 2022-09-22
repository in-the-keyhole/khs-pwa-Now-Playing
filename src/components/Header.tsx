import logo from '../images/nowplaying-white-logo-nav.png'
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state'

import './Header.css';

const Header = () => {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useLocalStorageState("loggedIn", { defaultValue: false });
  const logout = () => {
    setLoggedIn(false);
    navigate("/");
  }
  return (
    <nav>
      <ul className="menu">
        <li className="logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </li>
        {/* <li className="item"><Link to="/">NowPlaying</Link></li>  */}
        {loggedIn && <li className="item"><button onClick={logout}>Logout</button></li>}
        {/* <li className="toggle"><a href="/"><i className='fas fa-bars'></i></a></li> */}
      </ul>
    </nav>
  );
}

export default Header;
