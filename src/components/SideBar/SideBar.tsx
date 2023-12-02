import {categories} from '../../constanst/categories';
import {Link} from 'react-router-dom';

const SideBar = () => {
  return (
    <div>
      <ul>
        {
          categories.map((category) => (
            <li><Link to={category.id}>{category.title}</Link></li>
          ))
        }
      </ul>
    </div>
  );
};

export default SideBar;