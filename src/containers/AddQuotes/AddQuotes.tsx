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
        <div>
          <label htmlFor="categories">Category</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="categories"
            value={quote.categories}
            onChange={changeQuote}
            id="categories"
          >
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            value={quote.author}
            onChange={changeQuote}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="author"
            type="text"
            id="author"
          />
        </div>
        <div>
          <label htmlFor="quote-text">Quote text</label>
          <textarea
            value={quote.quoteText}
            onChange={changeQuote}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="quoteText"
            id="quote-text"
            cols={30}
            rows={10}
          />
        </div>
        <button
          type="submit"
          className="capitalize rounded font-bold text-[18px] text-white py-[3px] px-[5px] bg-green-600">create
        </button>
      </form>
    </div>
  );
};

export default AddQuotes;