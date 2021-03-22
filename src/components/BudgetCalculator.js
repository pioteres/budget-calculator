import React, { useEffect, useState } from 'react';
import nextId, { setPrefix } from 'react-id-generator';
import BudgetForm from './BudgetForm';
import BudgetHistoryList from './BudgetHistoryList';
import categories from '../data/Categories';
import budgetHistory from '../data/BudgetHistory';

setPrefix('');

function BudgetCalculator() {
  const getHistory = () =>
    JSON.parse(localStorage.getItem('dataStorage')) &&
    JSON.parse(localStorage.getItem('dataStorage')).length > 0
      ? JSON.parse(localStorage.getItem('dataStorage'))
      : budgetHistory;
  const [budgetList, setBudgetList] = useState(getHistory);
  const incomes = budgetList.filter((item) => item.type === 'income');
  const expenses = budgetList.filter(
    (item) => item.type === 'expenditure'
  );

  const getBalance = (incomesArr, expensesArr) =>
    incomesArr.reduce((sum, item) => (sum += item.amount), 0) -
    expensesArr.reduce((sum, item) => (sum += item.amount), 0);

  const [balance, setBalance] = useState(getBalance(incomes, expenses));
  const removeItem = (item) => {
    console.log(item);
    const newBudgetList = budgetList.filter(
      (elem) => elem.id !== parseInt(item.target.value)
    );
    setBudgetList(newBudgetList);
  };

  const handleAddItem = (itemData) => {
    itemData.id = parseInt(nextId(1));
    itemData.amount = parseFloat(itemData.amount);
    setBudgetList([...budgetList, itemData]);
  };

  useEffect(() => {
    setBalance(getBalance(incomes, expenses));
  }, [incomes, expenses]);

  useEffect(() => {
    localStorage.setItem('dataStorage', JSON.stringify(budgetList));
  }, [budgetList]);

  const styles = {
    color: 'green',
    balanceNegative: {
      color: 'red',
    },
  };
  return (
    <div>
      <div className="grey">
        <h3>Bilans</h3>
        <div style={parseFloat(balance) < 0 ? styles.balanceNegative : styles}>
          {balance.toFixed(2)}
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div className="blue one-third">
          <div>
            <h3>Przychody</h3>
            <BudgetHistoryList items={incomes} removeItem={removeItem} />
          </div>
        </div>
        <div className="green one-third">
          <div>
            <h3>Wydatki</h3>
            <BudgetHistoryList items={expenses} removeItem={removeItem} />
          </div>
        </div>
      </div>
      <BudgetForm handleAddItem={handleAddItem} categories={categories} />
    </div>
  );
}

export default BudgetCalculator;
