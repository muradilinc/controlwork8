import React, {useCallback, useEffect, useState} from 'react';
import {categories} from '../../constanst/categories';
import axiosApi from '../../axiosApi';
import {Quote} from '../../types';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {HOME_PAGE} from '../../constanst/routes';

interface Props {
  updateData?: () => void;
}

const AddQuotes: React.FC<Props> = ({updateData}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const idQuote = location.pathname.split('/')[location.pathname.split('/').length - 2];
  const editStatus = location.pathname.includes('edit');
  const [quote, setQuote] = useState({
    id: 0,
    author: '',
    quoteText: '',
    category: ''
  });

  const getQuote = useCallback(async () => {
    try {
      const response = await axiosApi.get(`quotes/${idQuote}.json`);
      setQuote(response.data);
    } catch (error) {
      alert('Error! ' + error);
    }
  }, [idQuote]);

  useEffect(() => {
    void getQuote();
  }, [getQuote]);

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
      category: quote.category,
      quoteText: quote.quoteText
    };

    try {
      if (location.pathname.includes('edit')) {
        await axiosApi.put(`quotes/${idQuote}.json`, {...quoteData, id: quote.id});
        if (updateData) {
          updateData();
        }
        navigate(HOME_PAGE);
      } else {
        await axiosApi.post('quotes.json', quoteData);
        setQuote({
          id: 0,
          author: '',
          quoteText: '',
          category: ''
        });
      }
    } catch (error) {
      alert('Error! ' + error);
    }
  };

  return (
    <div className="my-12">
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
    </div>
  );
};

export default AddQuotes;