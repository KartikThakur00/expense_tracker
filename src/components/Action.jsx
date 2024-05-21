import { useState } from 'react'
import subtractSvg from '../assets/subtract.svg'
import addSvg from '../assets/add.svg'
import walletSvg from '../assets/wallet.svg'
import crossSvg from '../assets/cross.svg'
import tickSvg from '../assets/tick.svg'
import { nanoid } from 'nanoid'

const Action = ({ data, setData }) => {

    const [updateDialog, setUpdateDialog] = useState(false)
    const [budgetDialog, setBudgetDialog] = useState(false)

    const [input, setInput] = useState({
        id: '',
        description: '',
        tag: '',
        amount: ''
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    }

    const handleTransaction = () => {
        let cbalance;
        if (input.tag === 'expense') {

            cbalance = data.Balance - Number(input.amount)
            cbalance = cbalance < 0 ? 0 : cbalance
        } else {
            cbalance = data.Balance + Number(input.amount)
        }
        setData(data => {
            return {
                name: data.name,
                Balance: cbalance,
                Budget: data.Budget,
                transactions: [
                    {
                        id: input.id,
                        time: new Date(),
                        Description: input.description,
                        tag: input.tag,
                        amount: Number(input.amount),
                    },
                    ...data.transactions,
                ],
            }
        })
        setInput({
            id: '',
            description: '',
            tag: '',
            amount: ''
        })
    }

    const handleBudget = () => {
        setData(data => {
            return {
                name: data.name,
                Balance: data.Balance,
                Budget: Number(input.amount),
                transactions: [
                    ...data.transactions,
                ],
            }
        })
    }

    return (
        <section className='mt-4 rounded-xl w-full bg-white border-2'>
            <div className='w-full flex items-center justify-center gap-6 p-3'>
                <div className=' flex flex-col items-center gap-2 cursor-pointer'
                    onClick={() => {
                        setUpdateDialog(!updateDialog);
                        setInput({
                            id: nanoid(),
                            description: '',
                            tag: 'expense',
                            amount: ''
                        })
                    }}>
                    <img src={subtractSvg} alt="add expense" className='w-14 h-14 p-3 rounded-full bg-[#ec472633]' />
                    <p className='text-sm font-medium text-gray-500'>
                        <span className='hidden sm:inline-block'>Add</span> Expense
                    </p>
                </div>
                <div className='flex flex-col items-center gap-2 cursor-pointer ' onClick={() => {
                    setUpdateDialog(!updateDialog);
                    setInput({
                        id: nanoid(),
                        description: '',
                        tag: 'income',
                        amount: ''
                    })
                }}>
                    <img src={addSvg} alt="top up" className='w-14 h-14 p-3 rounded-full bg-[#26dd6c33]' />
                    <p className='text-sm font-medium text-gray-500'>
                        Top Up
                    </p>
                </div>
                <div className='flex flex-col items-center gap-2 cursor-pointer '
                    onClick={() => {
                        setBudgetDialog(!budgetDialog);
                        setInput({
                            id: nanoid(),
                            description: '',
                            tag: '',
                            amount: ''
                        })
                    }}>
                    <img src={walletSvg} alt="create budget" className='w-14 h-14 p-3 rounded-full bg-[#1faed033]' />
                    <p className='text-sm font-medium text-gray-500'>
                        <span className='hidden sm:inline-block'>Create</span> Budget
                    </p>
                </div>
            </div>

            {/* Dialog Box for transaction*/}
            <dialog open={updateDialog} className="fixed z-20 left-0 top-0 h-full w-full backdrop-blur-[2px] bg-[#00000033] " >
                <div className='flex h-full items-center justify-center'>
                    <div className="relative sm:w-full max-w-2xl m-0 mx-auto p-5 bg-white z-10 rounded-lg">
                        <p className={`w-full text-center text-xl font-medium ${input.tag === "expense" ? "text-[#ec4726]" : "text-[#26dd6c]"}`}>{input.tag === "expense" ? "Add Expense" : "Top up"}</p>
                        {/* amount input */}
                        <input
                            name="amount"
                            type="number"
                            min="0"
                            placeholder="10,000 "
                            onChange={handleInputChange}
                            value={input.amount}
                            className="w-full block border-0 outline-none m-0 p-0 px-3 pt-5 bg-transparent font-semibold text-lg mb-2.5"
                        />

                        {/* input description */}
                        <textarea
                            name="description"
                            placeholder="description"
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
                            onClick={() => { handleTransaction(); setUpdateDialog(!updateDialog) }}
                            className="flex items-center justify-center absolute right-6 -bottom-4 bg-[#42b8ac] text-white border-none rounded-full w-9 h-9 text-2xl text-center cursor-pointer transition"
                        >
                            <img src={tickSvg} alt="tick svg" />
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Dialog for Budget */}
            <dialog open={budgetDialog} className="fixed z-20 left-0 top-0 h-full w-full backdrop-blur-[2px] bg-[#00000033] " >
                <div className='flex h-full items-center justify-center'>
                    <div className="relative sm:w-full max-w-2xl m-0 mx-auto p-5 bg-white z-10 rounded-lg">
                        <p className="w-full text-center text-xl font-medium text- ">Set Budget</p>
                        {/* amount input */}
                        <input
                            name="amount"
                            type="number"
                            min="0"
                            placeholder="10,000 "
                            onChange={handleInputChange}
                            value={input.amount}
                            className="w-full block border-0 outline-none m-0 p-0 px-3 py-3 bg-transparent font-semibold text-lg mb-2.5"
                        />

                        {/* close dialog */}
                        <button
                            onClick={() => setBudgetDialog(!budgetDialog)}
                            className="flex items-center justify-center absolute -top-4 right-6  bg-[#ec7171] text-white rounded-full w-9 h-9 text-2xl cursor-pointer transition"
                        >
                            <img src={crossSvg} alt="cancel" />
                        </button>

                        {/* save button */}
                        <button
                            onClick={() => { handleBudget(); setBudgetDialog(!budgetDialog) }}
                            className="flex items-center justify-center absolute right-6 -bottom-4 bg-[#42b8ac] text-white border-none rounded-full w-9 h-9 text-2xl text-center cursor-pointer transition"
                        >
                            <img src={tickSvg} alt="tick svg" />
                        </button>
                    </div>
                </div>
            </dialog>
        </section>
    )
}

export default Action