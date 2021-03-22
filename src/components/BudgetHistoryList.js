const BudgetHistoryList = ({ items, removeItem }) => {
  return (
    <div>
      <table>
    <thead>
      <tr>
      <th>Id</th>
      <th>Nazwa</th>
      <th>Kategoria</th>
      <th>Kwota</th>
      </tr>
    </thead>
    <tbody>
    {items.map(({id, name, category, amount}) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td>{amount}</td>
        <button onClick={removeItem} value={id}>Usuń</button>

        </tr>
    ))}
    </tbody>
      </table>
    </div>
  )
};

export default BudgetHistoryList;
