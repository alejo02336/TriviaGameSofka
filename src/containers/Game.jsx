import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shuffle } from 'underscore';
import Header from '../components/Header';

const Game = () => {
  let navigate = useNavigate();
  const [ronda, setRonda] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [roundamount, setRoundamount] = useState(0);
  const [cquestion, setCquestion] = useState(null);
  const [form, setForm] = useState('');
  const [player, setPlayer] = useState('');
  const [score, setScore] = useState(0);
  const [game, setGame] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const data = await fetch(
        'https://foodhy.com.co/rest/index.php/Question/question'
      );
      if (data.status === 200) {
        const res = await data.json();
        let questions = {};
        let questionsbylvl = {};
        for (let i = 0; i < res.length; i++) {
          var item = res[i];
          var e = item.question;
          if (!(e in questions)) questions[e] = [];
          questions[e].push(item);
        }
        var result = [];
        for (var i in questions) result.push([i, questions[i]]);
        for (let i = 0; i < result.length; i++) {
          var item2 = result[i];
          var e2 = item2[1][0].level;
          if (!(e2 in questionsbylvl)) questionsbylvl[e2] = [];
          questionsbylvl[e2].push(item2);
        }
        var resultlvl = [];
        for (var l in questionsbylvl) resultlvl.push([l, questionsbylvl[l]]);
        await setQuestions(resultlvl);
        await setRoundamount(resultlvl.length);

        //console.log(resultlvl);
      } else {
      }
    } catch (error) {}
  };

  const selectQuestion = async () => {
    let preguntas = [];
    for (let index = 0; index < questions.length; index++) {
      const preguntarandom = getRandomInt(0, questions[index][1].length);
      console.log(preguntarandom);
      preguntas.push(questions[index][1][preguntarandom]);
    }
    setPlayer(form);
    setCquestion(preguntas);
    setGame('true');
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  const nextQuestion = async (value) => {
    if (value === 'true') {
      if (ronda + 1 >= roundamount) {
        console.log('se acabo el juego');
        navigate('/finish-game', {
          state: { finish: 'win', player: player, score: (ronda + 1) * 50 },
        });
      } else {
        setRonda(() => ronda + 1);

        setScore((ronda + 1) * 20);
      }
    } else {
      console.log('se equivoco');
      navigate('/finish-game', {
        state: { finish: 'lose', player: player, score: score },
      });
    }
  };

  const randomButton = () => {
    let botones = cquestion[ronda][1].map((element, index) => (
      <button
        key={index}
        onClick={() => nextQuestion(element.value)}
        className="btn btn-primary btn-lg btn-block"
      >
        {element.text}
      </button>
    ));

    return shuffle(botones).map((boton, index) => boton);
  };

  return (
    <>
      <Header inGame={game} player={player} score={score} />
      <div className="card">
        <div className="card-body">
          {questions ? (
            Object.keys(questions).length === 0 ? (
              <p>No hay preguntas</p>
            ) : cquestion ? (
              <>
                <p>Ronda (Dificultad / Nivel): {ronda + 1}</p>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h1>{cquestion[ronda][0]}</h1>
                  <h1>Puntaje: {score}</h1>
                </div>

                <hr />

                <>{randomButton()}</>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  selectQuestion();
                }}
              >
                <div className="form-group">
                  <label>Usuario (alias)</label>
                  <input
                    className="form-control"
                    placeholder="Ingresa tu nombre de usuario"
                    id="form"
                    value={form}
                    onChange={handleChange}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Este sera el nombre que aparece en la tabla de records.
                  </small>
                </div>

                <button type="submit" className="btn btn-primary">
                  Empezar juego
                </button>
              </form>
            )
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
