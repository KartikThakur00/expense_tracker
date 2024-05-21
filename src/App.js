import { useState, useEffect} from "react";
import Welcome from "./components/Welcome";
import Action from "./components/Action";
import Card from "./components/Card";
import bankSvg from "./assets/bank.svg";
import targetSvg from "./assets/target.svg";
import incomeSvg from "./assets/increase.svg";
import expenseSvg from "./assets/decrease.svg";
import "./App.css";
import { nanoid } from "nanoid";
import Transactions from "./components/Transactions";

function App() {
  const [data, setData] = useState( JSON.parse(localStorage.getItem("expenseData")) ||{
    name: "React",
    Balance: 10000,
    Budget: 1000,
    transactions: [
      {
        id: nanoid(),
        time: new Date(),
        Description: "Flower",
        tag: "expense",
        amount: 20,
      },
      {
        id: nanoid(),
        time: new Date(),
        Description: "candy",
        tag: "expense",
        amount: 300,
      },
      {
        id: nanoid(),
        time: new Date(),
        Description: "Gift",
        tag: "income",
        amount: 220,
      },
      {
        id: nanoid(),
        time: new Date(),
        Description: "salary",
        tag: "income",
        amount: 300,
      },
    ],
  });

  useEffect(() => {
    localStorage.setItem("expenseData", JSON.stringify(data));
  }, [data]);

  const income = data.transactions
    .filter((transaction) => transaction.tag === "income")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);
  const expense = data.transactions
    .filter((transaction) => transaction.tag === "expense")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);
  
  return (
    <main className="app h-full p-4 ">
      <Welcome name={data.name} />
      <Action data={data} setData={setData} />
      <div className="mt-2 flex flex-wrap ">
        <Card
          img={bankSvg}
          number={data.Balance}
          description="Total Balance"
          bg="bg-[#a855f733]"
        />
        <Card
          img={targetSvg}
          number={data.Budget}
          expense={expense}
          description="Budget"
          bg="bg-[#1faed033]"
        />
        <Card
          img={incomeSvg}
          number={income}
          description="Income"
          bg="bg-[#26dd6c33]"
        />
        <Card
          img={expenseSvg}
          number={Math.abs(expense)}
          description="Expense"
          bg="bg-[#ec472633]"
        />
      </div>
      <div className="bg-white p-4 rounded-lg border-2 mt-4 sm:mt-0">
        <h2 className="text-lg font-medium inline-block"> Transaction History</h2>
        <p className="text-sm text-gray-400">tap/click to edit</p>
        <div className="flex items-center justify-center mt-2">
          <div className="w-full border-[1px] border-purple-200 rounded-full bg-purple-200"></div>
        </div>
        {data.transactions.map((transaction) => {
          return <Transactions key={transaction.id} data={data} transaction={transaction} setData={setData} />;
        })}
      </div>
    </main>
  );
}

export default App;
