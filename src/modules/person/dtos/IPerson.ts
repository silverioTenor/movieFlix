export default interface IPerson {
  id?: string;
  name: string;
  age: number;
  genre: 'man' | 'woman';
  nationality: string;
  papel: 'actor' | 'author';
  movie_id: string[];
}
