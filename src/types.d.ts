export interface Quote {
  id: number;
  quoteText: string;
  author: string;
  category: string;
}

export interface QuoteApi {
  idQuote: string;
  quote: Quote;
}

export interface Categories {
  title: string;
  id: string;
}