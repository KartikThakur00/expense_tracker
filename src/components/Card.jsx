import React from 'react'

const Card = ({ img, number, description, bg }) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    })
    let style = `w-10 h-10 p-2 rounded-full ${bg}`
    return (
        <div className='box-border flex-1 basis-6/12 sm:basis-auto'>
            <div className=' bg-white p-6 sm:m-3 border-2 rounded-xl '>
                <img src={img} alt="img" className={style} />
                <p className='text-lg font-semibold mt-4 sm:mt-5 '>{formatter.format(number)}</p>
                <p className='text-sm text-gray-400 mt-2 sm:mt-4'>{description}</p>
            </div>
        </div>
    )
}

export default Card