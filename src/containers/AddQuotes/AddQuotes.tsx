import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {Quote} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import {HOME_PAGE} from '../../constanst/routes';
import {toast} from 'react-toastify';
import Form from '../../components/Form/Form';
import Preloader from '../../components/Preloader/Preloader';

interface Props {
  updateData?: () => void;
}

const AddQuotes: React.FC<Props> = ({updateData}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const editStatus = location.pathname.includes('edit');
  const [quote, setQuote] = useState({
    id: 0,
    author: '',
    quoteText: '',
    category: ''
  });
  const [loader, setLoader] = useState(false);


  const getQuote = useCallback(async () => {
    setLoader(true);
    try {
      const response = await axiosApi.get(`quotes/${id}.json`);
      setQuote(response.data);
    } catch (error) {
      toast.error('Sorry, error!');
    } finally {
      setLoader(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      void getQuote();
    }
    if (!editStatus) {
      setQuote({
        id: 0,
        author: '',
        quoteText: '',
        category: ''
      });
    }
  }, [getQuote, id, editStatus]);


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
      setLoader(true);
      if (location.pathname.includes('edit')) {
        await axiosApi.put(`quotes/${id}.json`, {...quoteData, id: quote.id});
        if (updateData) {
          updateData();
        }
        navigate(HOME_PAGE);
      } else {
        await axiosApi.post('quotes.json', quoteData);
        if (updateData) {
          updateData();
        }
        setQuote({
          id: 0,
          author: '',
          quoteText: '',
          category: ''
        });
      }
    } catch (error) {
      toast.error('Sorry, error!');
    } finally {
      setLoader(false);
      toast.success(`Quote ${id ? 'changed' : 'created'}!`);
    }
  };

  return (
    <div className="my-12">
      {
        loader ?
          <Preloader/>
          :
          <Form
            quote={quote}
            editStatus={editStatus}
            createQuote={createQuote}
            changeQuote={changeQuote}
          />
      }
    </div>
  );
};

export default AddQuotes;