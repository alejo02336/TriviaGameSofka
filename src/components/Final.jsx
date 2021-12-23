import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Final = () => {
  const location = useLocation();
  const { finish, player, score } = location.state;

  const saveRecord = async () => {
    await fetch('https://foodhy.com.co/rest/index.php/Usuarios/save', {
      method: 'POST',
      body: JSON.stringify({
        player: player,
        score: score,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img
        className="card-img-top"
        src={
          finish === 'win'
            ? 'https://media.istockphoto.com/vectors/you-won-the-banner-text-lettering-against-a-blue-comic-background-vector-id1197615689?k=20&m=1197615689&s=170667a&w=0&h=coZzPor6zLM5tlC27rlSl--siu8QENDzlvRDEzvG814='
            : 'https://m.media-amazon.com/images/I/71yu6yl+X0L._SS500_.jpg'
        }
        alt="finishimage"
      />
      <div className="card-body">
        <h5 className="card-title">
          {finish === 'win'
            ? 'Ganaste el juego'
            : `Perdiste el juego (${finish})`}
        </h5>
        <p className="card-text">Informacion de la partida</p>
        <p>Usuario: {player}</p>
        <p>Puntaje: {score}</p>
        <Link
          onClick={saveRecord}
          className="btn btn-primary btn-lg btn-block"
          to="/"
        >
          Menu principal
        </Link>
      </div>
    </div>
  );
};

export default Final;
