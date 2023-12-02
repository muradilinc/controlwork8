import React, {useState} from 'react';
import {categories} from '../../constanst/categories.ts';
import axiosApi from '../../axiosApi.ts';
import {Quote} from '../../types';

const AddQuotes: React.FC = () => {
  const [quote, setQuote] = useState({
    author: '',
    quoteText: '',
    categories: ''
  });

  const changeQuote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setQuote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const createQuote = async (event: React.FormEvent) => {
    event.preventDefault();

    const quoteData: Quote = {
      id: Math.random(),
      author: quote.author,
      category: quote.categories,
      quoteText: quote.quoteText
    };

    try {
      await axiosApi.post('quotes.json', quoteData);
      setQuote({
        author: '',
        quoteText: '',
        categories: ''
      });
    } catch (error) {
      alert('Error! ' + error);
    }
  };

  return (
    <div>
      <form onSubmit={createQuote}>
        <select name="categories" value={quote.categories} onChange={changeQuote} id="categories">
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))
          }
        </select>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            value={quote.author}
            onChange={changeQuote}
            name="author"
            type="text"
            id="author"
          />
        </div>
        <div>
          <label htmlFor="quote-text">Quote text:</label>
          <textarea
            value={quote.quoteText}
            onChange={changeQuote}
            name="quoteText"
            id="quote-text"
            cols={30}
            rows={10}
          />
        </div>
        <button
          type="submit"
          className="capitalize rounded font-bold text-[18px] text-white py-[3px] px-[5px] bg-green-600">create</button>
      </form>
    </div>
  );
};

export default AddQuotes;