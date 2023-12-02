import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {ADD_PAGE, EDIT_PAGE, HOME_PAGE} from '../../constanst/routes';
import axiosApi from '../../axiosApi';
import {QuoteApi} from '../../types';
import {getContent} from '../../utils/getContent';
import Header from '../../components/Header/Header';
import HomePage from '../HomePage/HomePage';
import AddQuotes from '../AddQuotes/AddQuotes';
import CategoryPage from '../CategoryPage/CategoryPage';

const App = () => {
  const [quotes, setQuotes] = useState<QuoteApi[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    void getContent('quotes.json', setQuotes, setLoader);
  }, []);

  const removeQuote = async (id: string) => {
    setLoader(true);
    try {
      await axiosApi.delete(`quotes/${id}.json`);
      void getContent('quotes.json', setQuotes);
      if (quotes.length < 2) {
        setQuotes(prevState => {
          return prevState.filter((quote => quote.idQuote !== id));
        });
      }
    } catch (error) {
      toast.error('Sorry, error!');
    } finally {
      toast.success('Quote deleted!');
      setLoader(false);
    }
  };

  const updateData = () => {
    void getContent('quotes.json', setQuotes, setLoader);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header/>
      <div className="container mx-auto">
        <Routes>
          <Route path={HOME_PAGE} element={
            <HomePage
              loader={loader}
              quotes={quotes}
              removeQuote={removeQuote}
            />
          }>
            <Route path={`/quotes/:category`} element={(
              <CategoryPage
                removeQuote={removeQuote}
              />
            )}/>
          </Route>
          <Route path={ADD_PAGE} element={
            <AddQuotes updateData={updateData}/>
          }/>
          <Route path={`/quotes/:id${EDIT_PAGE}`} element={
            <AddQuotes  updateData={updateData}/>
          }/>
          <Route path={`/quotes/:category/:id${EDIT_PAGE}`} element={(
            <AddQuotes/>
          )}/>
          <Route path={'*'} element={(<h1>404</h1>)}/>
        </Routes>
      </div>
    </>
  );
};

export default App;