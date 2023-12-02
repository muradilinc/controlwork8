import React from 'react';
import {QuoteApi} from '../../types';
import QuoteViewer from '../../components/QuoteViewer/QuoteViewer';
import SideBar from '../../components/SideBar/SideBar';

interface Props {
  quotes: QuoteApi[];
  removeQuote: (id: string) => void;
}

const HomePage: React.FC<Props> = ({quotes, removeQuote}) => {
  return (
    <div className="grid grid-cols-3 my-5">
      <div className="col-span-1">
        <SideBar/>
      </div>
      <div className="col-span-2">
        <h4>All</h4>
        {
          quotes.map(quote => (
            <QuoteViewer
              key={quote.idQuote}
              quote={quote.quote}
              quoteId={quote.idQuote}
              removeQuote={removeQuote}
            />
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;