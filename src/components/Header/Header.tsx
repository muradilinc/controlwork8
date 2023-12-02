import {Link} from 'react-router-dom';
import {ADD_PAGE, HOME_PAGE} from '../../constanst/routes.ts';

const Header = () => {
  return (
    <div className="bg-red-600">
      <div className="container mx-auto grid grid-cols-2 items-center p-5">
        <div className="col-span-1">
          <Link to={HOME_PAGE}>
            <h1 className='text-4xl text-white font-bold'>Quotes Central</h1>
          </Link>
        </div>
        <div className="col-span-1 grid justify-end">
          <ul className="grid grid-cols-2 text-white text-2xl">
            <li className="capitalize"><Link to={HOME_PAGE}>Quotes</Link></li>
            <li className="capitalize"><Link to={ADD_PAGE}>new quote</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;