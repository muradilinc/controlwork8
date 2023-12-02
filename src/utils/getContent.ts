import axiosApi from '../axiosApi';
import {QuoteApi} from '../types';

export const getContent = async (
  url: string,
  setData: React.Dispatch<React.SetStateAction<QuoteApi[]>>,
): Promise<void> => {
  try {
    const response = await axiosApi.get(url);
    setData(() => {
      return Object.keys(response.data).map((quote) => ({
        idQuote: quote,
        quote: response.data[quote]
      }));
    });
  } catch (error) {
    alert('Error! ' + error);
  }
};