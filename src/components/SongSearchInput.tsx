import React from 'react';

interface SongSearchInputProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

const SongSearchInput: React.FC<SongSearchInputProps> = ({ query, setQuery, onSearch }) => {
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter song name..."
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SongSearchInput;
