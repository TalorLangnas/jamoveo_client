// Line item interface
export interface ILineItem {
  lyrics?: string;
  chords?: string;
}

export type ILine = ILineItem[];

// Song interface
interface Song {
  _id: string;
  name: string;
  artist: string;
  image?: string;
  body: ILine[];
}

export default Song;
