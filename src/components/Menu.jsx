import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <section className="main-menu">
      <div className="card">
        <div className="card-body">
          <img
            className="card-img-top mb-3 img-fluid"
            src="https://us.123rf.com/450wm/djvstock/djvstock1903/djvstock190303654/118412122-trivia-noche-cerebro-creatividad-letras-ilustraci%C3%B3n-vectorial.jpg?ver=6"
            alt="trivia"
            style={{ height: '350px', objectFit: 'contain' }}
          />
          <Link className="btn btn-primary btn-lg btn-block" to="/play-game">
            Jugar
          </Link>
          <Link
            className="btn btn-primary btn-lg btn-block"
            to="/create-question"
          >
            Crear preguntas
          </Link>
          <Link
            className="btn btn-primary btn-lg btn-block"
            to="/create-category"
          >
            Crear categoria
          </Link>

          <Link className="btn btn-primary btn-lg btn-block" to="/records">
            Tabla de records
          </Link>
        </div>
      </div>
      <p className="ml-3 mt-3">
        Creado por: Danny Alejandro Martinez Duque para reto tecnico sofka u
      </p>
    </section>
  );
};

export default Menu;
