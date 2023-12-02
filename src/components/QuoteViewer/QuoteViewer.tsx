import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Quote} from '../../types';
import {NotePencil, Trash} from '@phosphor-icons/react';
import {EDIT_PAGE} from '../../constanst/routes';

interface Props {
  quote: Quote;
  quoteId: string;
  removeQuote: (id: string) => void;
}

const QuoteViewer: React.FC<Props> = React.memo(({quote, quoteId, removeQuote}) => {
  const navigate = useNavigate();

  return (
    <div className="border border-black p-3 mb-5 rounded">
      <div className="flex justify-between">
        <div className="flex flex-wrap max-w-[85%] mb-3">
          <p>{quote.quoteText.includes('«') ? quote.quoteText : `«${quote.quoteText}»`}</p>
        </div>
        <div>
          <button
            onClick={() => navigate(`${location.pathname.includes('quotes') ? `${quoteId}${EDIT_PAGE}` : `quotes/${quoteId}${EDIT_PAGE}`}`)}
            className="text-green-600 mr-2">
            <NotePencil size={35}/>
          </button>
          <button
            onClick={() => removeQuote(quoteId)}
            className="text-red-600"
          >
            <Trash size={35}/>
          </button>
        </div>
      </div>
      <h4>-{quote.author}</h4>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.quote === nextProps.quote;
});

export default QuoteViewer;