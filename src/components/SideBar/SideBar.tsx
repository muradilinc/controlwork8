import {categories} from '../../constanst/categories';
import {Link} from 'react-router-dom';
import {HOME_PAGE} from '../../constanst/routes';

const SideBar = () => {
  return (
    <div>
      <ul>
        <li><Link to={HOME_PAGE}>All</Link></li>
        {
          categories.map((category) => (
            <li key={category.id}><Link to={`/quotes/${category.id}`}>{category.title}</Link></li>
          ))
        }
      </ul>
    </div>
  );
};

export default SideBar;