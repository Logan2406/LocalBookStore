import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Form from './components/Form';
import AboutBook from './components/AboutBook';
import AboutAuthor from './components/AboutAuthor';
import ReviewsForBook from './components/ReviewsForBook';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/aboutBook/:id" element={<AboutBook/>}/>
        <Route path="/aboutAuthor/:id" element={<AboutAuthor/>}/>
        <Route path="/bookReview/:id" element={<ReviewsForBook/>}/>
        <Route path="*" element={<App/>}/>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
