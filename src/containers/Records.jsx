import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Records = () => {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    try {
      const data = await fetch(
        'https://foodhy.com.co/rest/index.php/Usuarios/users'
      );
      const cate = await data.json();
      setRecords(cate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Records</h1>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map((record, index) => (
              <tr key={index}>
                <th scope="row">{record.id}</th>
                <td>{record.player}</td>
                <td>{record.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <th>No hay records</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
