import React from 'react';
import {Link} from 'react-router-dom';

import {categories} from '../../constanst/categories';
import {HOME_PAGE} from '../../constanst/routes';
import {Quote} from '../../types';

interface Props {
  quote: Quote;
  editStatus: boolean;
  createQuote: (event: React.FormEvent) => void;
  changeQuote: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Form: React.FC<Props> = ({quote, editStatus, createQuote, changeQuote}) => {
  return (
    <form onSubmit={createQuote}>
      <div>
        <label htmlFor="categories">Category</label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="category"
          value={quote.category}
          onChange={changeQuote}
          required
          id="category"
        >
          {
            editStatus ?
              <option value={quote.category}>{quote.category}</option>
              :
              <option value=""/>
          }
          {
            categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.title}
              </option>
            ))
          }
        </select>
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          value={quote.author}
          onChange={changeQuote}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="author"
          type="text"
          id="author"
        />
      </div>
      <div>
        <label htmlFor="quote-text">Quote text</label>
        <textarea
          required
          value={quote.quoteText}
          onChange={changeQuote}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="quoteText"
          id="quote-text"
          cols={30}
          rows={10}
        />
      </div>
      <>
        {
          editStatus ?
            <div className="mt-3 flex">
              <button
                type="submit"
                className="capitalize rounded font-bold text-[18px] text-white py-[3px] px-5 bg-green-600">save
              </button>
              <Link
                to={HOME_PAGE}
                className="capitalize ml-3 rounded font-bold text-[18px] text-white py-[3px] px-5 bg-red-600">cancel
              </Link>
            </div>
            :
            <div className="mt-3">
              <button
                type="submit"
                className="capitalize rounded font-bold text-[18px] text-white py-[3px] px-5 bg-green-600">create
              </button>
            </div>
        }
      </>
    </form>
  );
};

export default Form;