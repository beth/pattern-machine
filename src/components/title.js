import { useState } from 'react';
export function Title({ colors }) {
  const title = 'PATTERN MACHINE';
  const [letters, setLetters] = useState(Array(title.length).fill(0));

  const changeLetter = (index) => {
    const newValue = (letters[index] + 1) % colors.length;
    const newLetters = letters.map((value, i) => {
      if(i === index) {
        return newValue;
      } else {
        return value;
      }
    });
    setLetters(newLetters);
  };

  return (<h1 class="title">
    {
      title.split('').map((letter, i) => {
        return (<span onClick={() => changeLetter(i)} className={colors[letters[i]]}>{letter}</span>)
      })
    }
  </h1>);
}