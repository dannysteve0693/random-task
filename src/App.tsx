import  { useState } from 'react';

import TodoList from './components/TodoList';
import WeatherApp from './components/WeatherApp';
import Paginated from './components/Paginated';
import FilterPage from './components/FilterPage';

function App() {

  const [showPage, setShowPage] = useState<string>("todo");


  const renderContent = () => {
    switch (showPage) {
      case "paginated":
        return <Paginated />
      case "weather":
        return <WeatherApp />
      case "filter":
        return <FilterPage />
      default:
        return <TodoList />
    }
  }


  return (
    <>
      <div>
        <div>
          <button onClick={() => setShowPage('todo')}>TodoList</button>
          <button onClick={() => setShowPage('weather')}>Weather App</button>
          <button onClick={() => setShowPage('paginated')}>Pagination</button>
          <button onClick={() => setShowPage('filter')}>Filter Test</button>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        {renderContent()}

      </div>
    </>
  );
}

export default App;