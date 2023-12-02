import React from 'react';
import {QuoteApi} from '../../types';
import QuoteViewer from '../../components/QuoteViewer/QuoteViewer';
import SideBar from '../../components/SideBar/SideBar';
import {Outlet, useLocation} from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';

interface Props {
  quotes: QuoteApi[];
  removeQuote: (id: string) => void;
  loader: boolean;
}

const HomePage: React.FC<Props> = ({quotes, removeQuote, loader}) => {
  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const page = location.pathname.includes(category);

  return (
    <div className="grid items-start grid-cols-3 my-5">
      <div className="col-span-1">
        <SideBar/>
      </div>
      <div className="col-span-2">
        {
          loader ?
            <Preloader/>
            :
            !page ?
              <>
                <h4 className="text-2xl capitalize mb-3">All</h4>
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
              </>
              :
              <Outlet/>
        }
      </div>
    </div>
  );
};

export default HomePage;