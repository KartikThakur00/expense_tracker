import React from 'react'

const Dialog = () => {
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
    return (
        <div>Dialog</div>
    )
}

export default Dialog