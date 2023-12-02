import React from 'react';
import QuoteViewer from '../../components/QuoteViewer/QuoteViewer';
import {QuoteApi} from '../../types';
import {useLocation} from 'react-router-dom';

interface Props {
  quotes: QuoteApi[];
  removeQuote: (id: string) => void;
}

const CategoryPage: React.FC<Props> = ({quotes, removeQuote}) => {
  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const filteredQuotes = quotes.filter((quote) => quote.quote.category === category);

  console.log(filteredQuotes);


  return (
    <>
      <h4 className="text-2xl capitalize mb-3">{category}</h4>
      {
        filteredQuotes.length !== 0 ?
          filteredQuotes.map(quote => (
            <QuoteViewer
              key={quote.idQuote}
              quote={quote.quote}
              quoteId={quote.idQuote}
              removeQuote={removeQuote}
            />
          ))
          :
          <h4>Empty Quotes!</h4>
      }
    </>
  );
};

export default CategoryPage;