import React from 'react';

interface SongCard {
  name: string;
  artist: string;
  imageUrl?: string;
}

const SongCard: React.FC<SongCard> = (props) => {
  return (
    <div style={styles.card}>
      {props.imageUrl ? (
        <img src={props.imageUrl} alt={`${props.name} cover`} style={styles.image} />
      ) : (
        <div style={styles.placeholder}>No Image Available</div>
      )}
      <h3 style={styles.songName}>{props.name}</h3>
      <p style={styles.artist}>{props.artist}</p>
    </div>
  );
};



const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    maxWidth: '300px',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px'
  },
  placeholder: {
    width: '100%',
    height: '150px',
    backgroundColor: '#eee',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666'
  },
  songName: {
    margin: '0.5rem 0'
  },
  artist: {
    margin: 0,
    color: '#555'
  }
};

export default SongCard;
