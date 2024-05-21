import { useState } from 'react'
import crossSvg from '../assets/cross.svg'
import tickSvg from '../assets/tick.svg'

const Transactions = ({data, transaction, setData }) => {

  const [updateDialog, setUpdateDialog] = useState(false)
  
  let time=new Date(transaction.time)

  const month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
  const year = time.getFullYear()
  const date = time.getDate()
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  })

  const [input, setInput] = useState({
    id: transaction.id,
    time: transaction.time,
    description: transaction.Description,
    tag: transaction.tag,
    amount: transaction.amount
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  const handleTransactionEdit = () => {
    let cbalance;
    if (input.tag === 'expense') {
      if (transaction.amount > input.amount) {
        cbalance = data.Balance + (transaction.amount - Number(input.amount))
      } else {
        console.log(typeof data.Balance, typeof Number(input.amount), typeof Number(transaction.amount))
        cbalance = data.Balance - (Number(input.amount) - transaction.amount)
        cbalance = cbalance < 0 ? 0 : cbalance
      }
    } else {
      if (transaction.amount > Number(input.amount)) {
        cbalance = data.Balance - (transaction.amount - Number(input.amount))
        cbalance = cbalance < 0 ? 0 : cbalance
      } else {
        cbalance = data.Balance + (Number(input.amount) - transaction.amount)
      }
    }
    setData(transaction => {
      return {
        name: transaction.name,
        Balance: cbalance,
        Budget: transaction.Budget,
        transactions: data.transactions.map((transaction) => {
          if (transaction.id === input.id) {
            return {
              id: input.id,
              time: input.time,
              Description: input.description,
              tag: input.tag,
              amount: Number(input.amount),
            }
          }
          return transaction
        }),
      }
    })

  }

  const handleDelete = (id) => {
    let cbalance;
    if (transaction.tag === 'expense') {
      console.log(typeof data.Balance, typeof transaction.amount)
      cbalance = data.Balance + transaction.amount
    } else {
      cbalance = data.Balance - transaction.amount
      cbalance = cbalance < 0 ? 0 : cbalance
    }
    console.log(transaction.transactions)
    setData(transaction => {
      return {
        name: transaction.name,
        Balance: cbalance,
        Budget: transaction.Budget,
        transactions: data.transactions.filter((transaction) => transaction.id !==id),
      }
    })


  }

  return (
    <div>

      <div
        className={`w-full flex items-center justify-between mt-2 p-2 sm:px-4 border-2 rounded-md cursor-pointer ${transaction.tag === "expense" ? "bg-red-100 border-red-200" : "bg-green-100 border-green-200"}`}
        onClick={() => setUpdateDialog(!updateDialog)}
      >
        <div>
          <p className='text-base font-medium '>
            {transaction.Description}
          </p>
          <p className='text-xs text-gray-400'>
            {`${date}/${month}/${year} ${hours}:${minutes}`}
          </p>
        </div>
        <p className={`${transaction.tag === "expense" ? "text-red-500" : "text-green-500"} font-medium`}>
          {transaction.tag}
        </p>

        <p className={`${transaction.tag === "expense" ? "text-red-500" : "text-green-500"} font-medium sm:text-base`}>
          {formatter.format(transaction.amount)}
        </p>
      </div>
      < dialog open={updateDialog} className="fixed z-20 left-0 top-0 h-full w-full backdrop-blur-[2px] bg-[#00000033] " >
        <div className='flex h-full items-center justify-center'>
          <div className="todo-input relative sm:w-full max-w-2xl m-0 mx-auto p-5 bg-white z-10 rounded-lg">
            <p className={`w-full text-center text-xl font-medium ${input.tag === "expense" ? "text-[#ec4726]" : "text-[#26dd6c]"} `}>Edit Transaction</p>

            {/* title input */}
            <input
              name="amount"
              type="number"
              min="0"
              placeholder="10,000 "
              onChange={handleInputChange}
              value={input.amount}
              className="w-full border-0 outline-none m-0 p-0 px-3 pt-5 bg-transparent flex-1 font-semibold text-lg mb-1"
            />



            {/* input note */}
            <textarea
              name="description"
              placeholder={transaction.Description}
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
              onClick={() => { handleDelete(transaction.id); setUpdateDialog(!updateDialog) }}
              className="flex items-center justify-center absolute left-7 -bottom-4 bg-red-400 text-white border-none rounded-full text-base px-4 py-2 text-center cursor-pointer transition"
            >Delete</button>
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
      </dialog >
    </div>
  )
}

export default Transactions