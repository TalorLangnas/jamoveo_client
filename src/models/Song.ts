// src/models/Song.ts

// Define the type for each line item
export interface ILineItem {
  lyrics?: string;
  chords?: string;
}

// Define a line as an array of line items
export type ILine = ILineItem[];

// Define the Song interface matching the server-side model
interface Song {
  _id: string;
  name: string;
  artist: string;
  image?: string; // Optional image property
  body: ILine[];
}

export default Song;
