import React from 'react'
import walletSvg from '../assets/wallet-1.svg'

const Welcome = ({ name }) => {
  return (
    <header className=''>
      <div className='flex items-center justify-between px-4 mb-4 '>
        <div className='w-fit h-fit bg-purple-100 border border-purple-200 px-4 py-2 rounded-2xl'>
          <div className='text-2xl  font-medium text-purple-500 flex gap-2 '>
            <img src={walletSvg} alt='wallet' className=' w-8 h-8' />
            <p className=' hidden sm:block'>Tracker</p>
          </div>
        </div>
        <div className='text-right'>
          <h2 className='text-xl font-medium text-purple-500 '>
            Welcome, {name}
          </h2>
          <p className='font-sans text-sm text-gray-500 font-semibold hidden sm:block'>
            Continue your journey to financial success
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-[96%] border-[1px] border-purple-200 rounded-full bg-purple-200'>
        </div>
      </div>
    </header>
  )
}

export default Welcome