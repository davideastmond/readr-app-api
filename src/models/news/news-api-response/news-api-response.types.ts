export interface INewsApiResponse {
  status: string,
  totalResults: number
  articles: INewsArticle[]
}

export interface INewsArticle {
  source: {
    id: string,
    name: string
  }
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
