import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [playerMark, setPlayerMark] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | ''>('');

  const [entry, setEntry] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));

  useEffect(() => {
    const result = calculateWinner(entry);
    if (result) {
      setWinner(result);
    }
  }, [entry]);

  return (
    <div className='container'>
      {winner && <h1 className='winner'>Winner: {winner}</h1>}
      {entry.map((_, index) => (
        <Squares
          key={index + 's'}
          playerMark={playerMark}
          setPlayerMark={setPlayerMark}
          entry={entry}
          setEntry={setEntry}
          index={index}
        />
      ))}
      <div className=' feedback'>{entry}</div>
      <button onClick={() => window.location.reload()}>Reset </button>
    </div>
  );
}

export default App;

type squareProps = {
  playerMark: string;
  setPlayerMark: React.Dispatch<React.SetStateAction<'X' | 'O'>>;
  index: number;
  entry: ('X' | 'O' | null)[];
  setEntry: React.Dispatch<React.SetStateAction<('X' | 'O' | null)[]>>;
};

const Squares = ({
  playerMark,
  setPlayerMark,
  entry,
  setEntry,
  index,
}: squareProps) => {
  const btn = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const curr = playerMark === 'X' ? 'O' : 'X';
    if (btn.current === null) return;
    btn.current.textContent = curr;
    btn.current.disabled = true;
    setPlayerMark(curr);
    const updated = [...entry];
    updated[index] = curr;
    setEntry(updated);
  };

  return (
    <button ref={btn} onClick={handleClick}>
      {index}
    </button>
  );
};

function calculateWinner(squares: ('X' | 'O' | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
