const BudgetHistoryList = ({ items, removeItem }) => {
  return (
    <div>
      <table>
    <thead>
      <tr>
      <th>Nazwa</th>
      <th>Kategoria</th>
      <th>Kwota</th>
      </tr>
    </thead>
    <tbody>
    {items.map(({id, name, category, amount}) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{category}</td>
        <td>{amount}</td>
        <td><button onClick={removeItem} value={id}>Usuń</button></td>
        </tr>
    ))}
    </tbody>
      </table>
    </div>
  )
};

export default BudgetHistoryList;
