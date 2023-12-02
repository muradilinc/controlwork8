import {useEffect} from 'react';
import Header from '../../components/Header/Header.tsx';
import {Route, Routes} from 'react-router-dom';
import {ADD_PAGE, HOME_PAGE} from '../../constanst/routes.ts';
import HomePage from '../HomePage/HomePage.tsx';
// import {Quote} from '../../types';
// import axiosApi from '../../axiosApi.ts';
import AddQuotes from '../AddQuotes/AddQuotes.tsx';

const App = () => {
  // const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    // try {
    //
    // } catch (error) {
    //   alert('Error! ' + error);
    // }
  }, []);

  return (
    <div>
      <Header/>
      <div className="container mx-auto">
        <Routes>
          <Route path={HOME_PAGE} element={<HomePage/>}/>
          <Route path={ADD_PAGE} element={<AddQuotes/>}/>
          <Route path={'*'} element={(<h1>404</h1>)}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;