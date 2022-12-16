import axios from 'axios';
import { Movie } from './movie';

export class MovieClient {
  private apiKey = process.env.API_KEY;

  public async getMovie(id: string): Promise<Movie> {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllMovies(search: string): Promise<Movie[]> {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&page=1&apikey=${this.apiKey}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
