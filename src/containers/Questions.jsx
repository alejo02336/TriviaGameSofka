import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';

const Questions = () => {
  const [question, setQuestion] = useState({
    text: '',
    category: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

  const [list, setList] = useState(null);
  const [qlist, setQlist] = useState(null);

  const { text, category, option1, option2, option3, option4 } = question;

  const options = [option1, option2, option3, option4];

  const insertQuestion = async (e) => {
    e.preventDefault();
    console.log(text, question, option1, option2);

    await fetch('https://foodhy.com.co/rest/index.php/Question/save', {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        category: category,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then(async () => {
        for (let i = 0; i < options.length; i++) {
          await insertOption(
            'https://foodhy.com.co/rest/index.php/Question/saveop',
            options[i],
            i === 3 ? 'true' : 'false',
            text
          );
        }

        getQuestions();
      });
  };

  const insertOption = async (url, text, value, question) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        value: value,
        question: question,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => console.log('Success:', response));

    await setQuestion({
      text: '',
      category: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    });
  };

  const fillCategory = async () => {
    const data = await fetch(
      'https://foodhy.com.co/rest/index.php/Category/categories'
    );
    const cate = await data.json();
    setList(cate);
  };

  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const getQuestions = useCallback(async () => {
    const data = await fetch(
      'https://foodhy.com.co/rest/index.php/Question/question'
    );
    if (data.status === 200) {
      const res = await data.json();
      let questions = {};
      for (let i = 0; i < res.length; i++) {
        var item = res[i];
        var e = item.question;
        if (!(e in questions)) questions[e] = [];
        questions[e].push(item);
      }
      var result = [];

      for (var i in questions) result.push([i, questions[i]]);
      await setQlist(result);
      await fillCategory();
    } else {
      await fillCategory();
    }
  }, []);

  const deleteQuestion = async (texto, category) => {
    await fetch('https://foodhy.com.co/rest/index.php/Question/borrar', {
      method: 'POST',
      body: JSON.stringify({
        text: texto,
        category: category,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then(() => getQuestions());
  };

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div>
      <Header />
      <div className="card-body">
        <form onSubmit={insertQuestion} id="savequestion">
          <div className="form-group">
            <label>Pregunta</label>
            <input
              type="text"
              className="form-control"
              id="question"
              required
              name="text"
              onChange={handleChange}
              value={text}
            />
          </div>
          <label>Categoria</label>
          <select
            name="category"
            id="categorylvl"
            className="form-control mb-3"
            onChange={handleChange}
            required
            value={category}
          >
            <option></option>

            {list &&
              list.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name} LVL {category.level}{' '}
                </option>
              ))}
          </select>
          <label>Opcion 1</label>
          <input
            name="option1"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="option1"
            required
            value={option1}
          />
          <label>Opcion 2</label>
          <input
            name="option2"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="option2"
            value={option2}
            required
          />
          <label>Opcion 3</label>
          <input
            name="option3"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="option3"
            value={option3}
            required
          />
          <label>Opcion 4 (Respuesta correcta)</label>
          <input
            name="option4"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="option4"
            value={option4}
            required
          />
          <button className="btn btn-primary mt-3">Guardar pregunta</button>
        </form>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Pregunta</th>
            <th scope="col">Categoria</th>
            <th scope="col">Opcion</th>
          </tr>
        </thead>
        <tbody id="questionList">
          {qlist &&
            qlist.map((question, index) => (
              <tr key={index}>
                <th>{question[1][0].question}</th>
                <td>{question[1][0].category}</td>
                <td>
                  <button
                    onClick={() =>
                      deleteQuestion(
                        question[1][0].question,
                        question[1][0].category
                      )
                    }
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
  );
};

export default Questions;
