import React, {useEffect, useState} from 'react';
import QuoteViewer from '../../components/QuoteViewer/QuoteViewer';
import {QuoteApi} from '../../types';
import {useParams} from 'react-router-dom';
import {getContent} from '../../utils/getContent';
import Preloader from '../../components/Preloader/Preloader';

interface Props {
  removeQuote: (id: string) => void;
}

const CategoryPage: React.FC<Props> = ({removeQuote}) => {
  const {category} = useParams();
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteApi[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    void getContent(`quotes.json?orderBy="category"&equalTo="${category}"`, setFilteredQuotes, setLoader);
  }, [category]);

  return (
    <>
      {
        loader ?
          <Preloader/>
          :
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
      }
    </>
  );
};

export default CategoryPage;