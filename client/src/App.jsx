import "./App.css";
import { useState, useEffect } from "react";
import NewsFeed from './components/NewsFeed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Trial from './components/Trial';
import TrainTT from './components/TrainTT';
import SOS from './components/SOS';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewsFeed />} />
          <Route path="/train" element={<TrainTT />} />
          {/* Expenses */}
          {/* Notes */}
          <Route path="/sos" element={<SOS />} />
          <Route path="/trial" element={<Trial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
