import React from 'react';
import axiosApi from '../axiosApi';
import {toast} from 'react-toastify';
import {QuoteApi} from '../types';

export const getContent = async (
  url: string,
  setData: React.Dispatch<React.SetStateAction<QuoteApi[]>>,
  setLoader?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setLoader ? setLoader(true) : null;
  try {
    const response = await axiosApi.get(url);
    setData(() => {
      return Object.keys(response.data).map((quote) => ({
        idQuote: quote,
        quote: response.data[quote]
      }));
    });
  } catch (error) {
    toast.error('Sorry, error!');
  } finally {
    setLoader ? setLoader(false) : null;
  }
};