import React from 'react';
import {QuoteApi} from '../../types';
import QuoteViewer from '../../components/QuoteViewer/QuoteViewer';
import SideBar from '../../components/SideBar/SideBar';

interface Props {
  quotes: QuoteApi[];
}

const HomePage: React.FC<Props> = ({quotes}) => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <SideBar/>
      </div>
      <div className="col-span-2">
        <h4>All</h4>
        {quotes.map(quote => (<QuoteViewer key={quote.idQuote} quote={quote.quote}/>))}
      </div>
    </div>
  );
};

export default HomePage;