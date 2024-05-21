import { useState } from 'react'
import crossSvg from '../assets/cross.svg'
import tickSvg from '../assets/tick.svg'

const Transactions = ({ data, setData }) => {
  const [updateDialog, setUpdateDialog] = useState(false)

  const [input, setInput] = useState({
    id: data.id,
    time: data.time,
    description: data.Description,
    tag: data.tag,
    amount: data.amount
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  const handleTransactionEdit = () => {

  }


  const month = data.time.getMonth() + 1 < 10 ? `0${data.time.getMonth() + 1}` : data.time.getMonth() + 1
  const year = data.time.getFullYear()
  const date = data.time.getDate()
  const hours = data.time.getHours() < 10 ? `0${data.time.getHours()}` : data.time.getHours()
  const minutes = data.time.getMinutes() < 10 ? `0${data.time.getMinutes()}` : data.time.getMinutes()

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  })

  console.log(input)
  return (
    <div
      className={`w-full flex items-center justify-between mt-2 p-2 sm:px-4 border-2 rounded-md cursor-pointer ${data.tag === "expense" ? "bg-red-100 border-red-200" : "bg-green-100 border-green-200"}`}
      onClick={() => setUpdateDialog(!updateDialog)}
    >
      <div>
        <p className='text-base font-medium '>
          {data.Description}
        </p>
        <p className='text-xs text-gray-400'>
          {`${date}/${month}/${year} ${hours}:${minutes}`}
        </p>
      </div>
      <p className={`${data.tag === "expense" ? "text-red-500" : "text-green-500"} font-medium`}>
        {data.tag}
      </p>

      <p className={`${data.tag === "expense" ? "text-red-500" : "text-green-500"} font-medium sm:text-base`}>
        {formatter.format(data.amount)}
      </p>

      {/* edit dialog */}
      <dialog open={updateDialog} className="fixed z-20 left-0 top-0 h-full w-full backdrop-blur-[2px] bg-[#00000033] " >
        <div className='flex h-full items-center justify-center'>
          <div className="todo-input relative sm:w-full max-w-2xl m-0 mx-auto p-5 bg-white z-10 rounded-lg">
            <p className="w-full text-center text-xl font-medium ">Edit Transaction</p>
            {/* title input */}
            <input
              name="amount"
              type="number"
              min="0"
              placeholder="10,000 "
              onChange={handleInputChange}
              value={input.amount}
              className="w-full block border-0 outline-none m-0 p-0 px-3 pt-5 bg-transparent font-semibold text-lg mb-2.5"
            />

            {/* input note */}
            <textarea
              name="description"
              placeholder={data.Description}
              spellCheck="false"
              onChange={handleInputChange}
              value={input.description}
              className="w-full block border-0 outline-none m-0 p-0 px-3 bg-transparent font-sans resize-none text-base font-normal leading-6 min-h-[4em] max-h-[50vh]"
            ></textarea>

            {/* close dialog */}
            <button
              onClick={() => setUpdateDialog(!updateDialog)}
              className="flex items-center justify-center absolute -top-4 right-6  bg-[#ec7171] text-white rounded-full w-9 h-9 text-2xl cursor-pointer transition"
            >
              <img src={crossSvg} alt="cancel" />
            </button>

            {/* save button */}
            <button
              disabled={!(input.description || input.amount)}
              style={!(input.description || input.amount) ? { display: 'none' } : { display: 'block' }}
              onClick={() => { handleTransactionEdit(); setUpdateDialog(!updateDialog) }}
              className="flex items-center justify-center absolute right-6 -bottom-4 bg-[#42b8ac] text-white border-none rounded-full w-9 h-9 text-2xl text-center cursor-pointer transition"
            >
              <img src={tickSvg} alt="tick svg" />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Transactions