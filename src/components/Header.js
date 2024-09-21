import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Header({title}) {
  return (
    <div className='flex items-center h-20 p-2 my-3'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <FontAwesomeIcon icon={faPenToSquare} className={`text-4xl text-[#E6D5B8] mr-2 `}/> 
    </div>
  );
}

