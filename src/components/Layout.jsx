import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/session">Session</Link>
          </li>
        </ul>
      </nav>
    </>
  )
};

export default Layout;