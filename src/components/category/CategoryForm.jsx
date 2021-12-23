import React, { useState, useEffect } from 'react';

const CategoryForm = () => {
  const [category, setCategory] = useState({
    name: '',
    level: '1',
  });
  const [list, setList] = useState(null);

  useEffect(() => {
    fillCategory();
  }, []);

  const { name, level } = category;

  const saveCategory = async (e) => {
    e.preventDefault();

    await fetch('https://foodhy.com.co/rest/index.php/Category/save', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        level: level,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        fillCategory();
        setCategory({ name: '' });
      });
  };

  const fillCategory = async () => {
    const data = await fetch(
      'https://foodhy.com.co/rest/index.php/Category/categories'
    );
    const cate = await data.json();
    setList(cate);
  };

  const deleteCategory = async (name, level) => {
    await fetch('https://foodhy.com.co/rest/index.php/Category/delete', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        level: level,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => fillCategory());
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {' '}
      <div className="card">
        <div className="card-body">
          <form onSubmit={saveCategory} id="saveCategory">
            <div className="form-group">
              <label>Nombre categoria</label>
              <input
                className="form-control"
                placeholder="Ingresa el nombre de la categoria"
                value={name}
                onChange={handleChange}
                required
                name="name"
              />
            </div>
            <label>Nivel categoria</label>
            <select
              onChange={handleChange}
              name="level"
              id="categorylvl"
              className="form-control mb-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className="btn btn-primary">Guardar categoria</button>
          </form>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Nivel</th>
              <th scope="col">Opcion</th>
            </tr>
          </thead>

          <tbody>
            {list &&
              list.map((list, index) => (
                <tr key={index}>
                  <th>{list.name}</th>
                  <td>{list.level}</td>
                  <td>
                    <button
                      onClick={() => deleteCategory(list.name, list.level)}
                      className="btn btn-danger btn-block"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryForm;
