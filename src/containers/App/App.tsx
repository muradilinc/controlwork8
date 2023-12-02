import {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import {ADD_PAGE, HOME_PAGE} from '../../constanst/routes';
import HomePage from '../HomePage/HomePage';
import AddQuotes from '../AddQuotes/AddQuotes';
import axiosApi from '../../axiosApi';
import {QuoteApi} from '../../types';
import {getContent} from '../../utils/getContent';

const App = () => {
  const [quotes, setQuotes] = useState<QuoteApi[]>([]);

  // const getQuot = async (): Promise<void> => {
  //   try {
  //     const response = await axiosApi.get('quotes.json');
  //     setQuotes(() => {
  //       return Object.keys(response.data).map((quote) => ({
  //         idQuote: quote,
  //         quote: response.data[quote]
  //       }));
  //     });
  //   } catch (error) {
  //     alert('Error! ' + error);
  //   }
  // };

  useEffect(() => {
    void getContent('quotes.json', setQuotes);
  }, []);

  const removeQuote = async (id: string) => {
    try {
      await axiosApi.delete(`quotes/${id}.json`);
      void getContent('quotes.json', setQuotes);
      if (quotes.length < 2) {
        setQuotes(prevState => {
          return prevState.filter((quote => quote.idQuote !== id));
        });
      }
    } catch (error) {
      alert('Error! ' + error);
    }
  };

  const updateData = () => {
    void getContent('quotes.json', setQuotes);
  };

  return (
    <div>
      <Header/>
      <div className="container mx-auto">
        <Routes>
          <Route path={HOME_PAGE} element={<HomePage quotes={quotes} removeQuote={removeQuote}/>}/>
          <Route path={ADD_PAGE} element={<AddQuotes/>}/>
          <Route path={`/quotes/:id/edit`} element={<AddQuotes updateData={updateData}/>}/>
          <Route path={'*'} element={(<h1>404</h1>)}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;