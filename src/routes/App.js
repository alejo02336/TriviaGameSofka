import React from 'react';
import Home from '../containers/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from '../containers/Categories';
import Questions from '../containers/Questions';
import Game from '../containers/Game';
import Final from '../components/Final';
import Records from '../containers/Records';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-category" element={<Categories />} />
        <Route path="/create-question" element={<Questions />} />
        <Route path="/play-game" element={<Game />} />
        <Route path="/finish-game" element={<Final />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
