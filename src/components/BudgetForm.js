import { useForm } from 'react-hook-form';

const BudgetForm = ({ handleAddItem, categories }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (itemData, e) => {
    handleAddItem(itemData);
    e.target.reset();
  };
  return (
    <div style={{background: 'lightgrey', padding: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <input
            type="radio"
            name="type"
            id="income"
            value="income"
            ref={register({ required: true })}
          />
          <label htmlFor="type">Przychód</label>
          <input
            type="radio"
            name="type"
            id="expenditure"
            value="expenditure"
            ref={register({ required: true })}
          />
          <label htmlFor="type">Wydatek</label>
        </div>
        {errors.type && <div>Wybierz typ wpisu</div>}
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Podaj nazwę..."
            ref={register({ required: true })}
          />
        </div>
        {errors.name && <div>Pole wymagane</div>}
        <div>
          <select
            name="category"
            id="category"
            ref={register({ required: true })}
          >
            <option value="">Wybierz kategorię...</option>
            {categories.map((category, index) => (
              <option key={`el-${index}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {errors.category && <div>Pole wymagane</div>}
        <div>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Podaj kwotę..."
            ref={register({ required: true })}
          />
        </div>
        {errors.amount && <div>Pole wymagane</div>}
        <div>
          <button type="submit">Dodaj</button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
