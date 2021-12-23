import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = (props) => {
  let navigate = useNavigate();
  const { inGame, player, score } = props;

  const saveRecord = async () => {
    navigate('/finish-game', {
      state: { finish: 'leave', player: player, score: score },
    });
  };

  return (
    <nav
      className="nav p-3"
      style={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <li className="nav-item">
        <div className="nav-link">Sofka U Trivia Game</div>
      </li>
      <li>
        {inGame ? (
          <button onClick={saveRecord} className="btn btn-primary">
            Abandonar juego
          </button>
        ) : (
          <NavLink to="/" className="btn btn-primary">
            Regresar al menu
          </NavLink>
        )}
      </li>
    </nav>
  );
};

export default Header;
