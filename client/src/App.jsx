import "./App.css";
import NewsFeed from './components/pages/NewsFeed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Trial from './components/Trial';
import TrainTT from './components/pages/TrainTT';
import SOS from './components/pages/SOS';
import Lecture from './components/pages/Lecture';
import Notes from "./components/pages/Notes";
import Expense from "./components/pages/Expense";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewsFeed />} />
          <Route path="/train" element={<TrainTT />} />
          <Route path="/lecture" element={<Lecture />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/sos" element={<SOS />} />
          <Route path="/trial" element={<Trial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
