// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route } from 'react-router-dom'
import { InputSearch } from './input-search';
import { ReviewJobs } from './review-jobs';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/review-jobs" element={<ReviewJobs/>} />
        <Route path="/" element={<InputSearch/>} />
      </Routes>
    </div>
  );
}

export default App;
