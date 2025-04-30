import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ExploreSolutions from './ExploreSolutions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about us" element={<AboutUs />} />
        <Route path="/explore-solutions" element={<ExploreSolutions />} />
      </Routes>
    </Router>
  );
}

export default App;
