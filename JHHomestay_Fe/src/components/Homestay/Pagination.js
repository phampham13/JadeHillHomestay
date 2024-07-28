import React from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'

const Pagination = ({ totalPage, paginate}) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='w-full mt-5'>
      <div className='flex flex-row justify-center'>
        <ChevronLeftIcon class="cursor-pointer w-6 h-6 text-green-600 hover:text-green-700" />
        {pageNumbers.map(number => (
          <div
            key={number}
            className='cursor-pointer  hover:bg-gray-100 text-xs font-semibold flex w-6 h-6 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-600 bg-white text-green-600' 
            onClick={() => paginate(number)}
          >
            {number}
            
          </div>
        ))}
        <ChevronRightIcon class="cursor-pointer w-6 h-6 text-green-600 hover:text-green-700" />
          
      </div>
    </div>
  );
};

export default Pagination;