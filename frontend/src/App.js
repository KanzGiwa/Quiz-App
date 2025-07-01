import logo from './logo.svg';
import './App.css';
// import Quiz from './components/Quiz';
// import Result from './components/Result';

// Initialize state: questions, score, submitted

// useEffect on component mount:
//   send GET request to backend ("/api/questions")
//   store questions in state

// define handleSubmit function:
//   gather user answers
//   send POST request to backend ("/api/submit", payload=user_answers)
//   receive score and update state

// render:
//   if not submitted:
//     show Quiz component with questions and handleSubmit
//   else:
//     show Result component with score

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
