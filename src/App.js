import React from 'react';
import './App.css';
import EventRegistrationForm from './EventRegistrationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Event Registration</h1>
      </header>
      <main>
        <EventRegistrationForm />
      </main>
    </div>
  );
}

export default App;
