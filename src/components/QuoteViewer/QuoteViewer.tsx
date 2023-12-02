import React from 'react';
import {Quote} from '../../types';
import {NotePencil, Trash} from '@phosphor-icons/react';

interface Props {
  quote: Quote;
  quoteId: string;
  removeQuote: (id: string) => void;
}

const QuoteViewer: React.FC<Props> = ({quote, quoteId, removeQuote}) => {
  return (
    <div className="border border-black p-3 mb-5 rounded">
      <div className="flex justify-between">
        <div className="flex flex-wrap max-w-[85%] mb-3">
          <p>{quote.quoteText}</p>
        </div>
        <div>
          <button className="text-green-600 mr-2">
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
};

export default QuoteViewer;