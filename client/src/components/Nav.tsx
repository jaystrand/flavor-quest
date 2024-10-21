import { Link } from 'react-router-dom';
import SearchRecipes from './SearchRecipes';

const Nav = () => {
  return (
    <nav>
      <Link to="/path1">Link 1</Link>
      <Link to="/path2">Link 2</Link>
      <SearchRecipes />
    </nav>
  );
};

export default Nav;