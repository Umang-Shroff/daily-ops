import "./App.css";
import { useState, useEffect } from "react";
import NewsFeed from './components/NewsFeed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Trial from './components/Trial';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewsFeed />} />
          <Route path="/trial" element={<Trial />} />
          {/* Example for a future route: <Route path="expenses" element={<ExpenseTracker />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
