import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search-recipes">Search Recipes</Link></li>
        {/* <a href="/profile">Profile</a> */}
        <li><Link to="/about-us">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;