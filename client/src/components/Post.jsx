import React from 'react'

function Post() {
    return (
        <div className='text-black bg-white dark:bg-neutral-700 border-black border dark:text-white rounded-lg'>
            <img className='rounded-t-lg' src="https://bit.ly/3xm9Ndj" alt="cover" />
            <div className='px-2 pb-3'>
                <h3 className='mt-3'>The ‘March Madness' Effect on Company Culture — Win or Bust?</h3>
                <summary className='list-none mt-2 text-gray-700 dark:text-gray-300'>Company Culture — Win or Bust? March Madness is here. Should this popular bracket-busting event have a presence in the workplace? H...</summary>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>John Doe</p>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>2022-01-15</p>
            </div>
        </div>
    );
}

export default Post;