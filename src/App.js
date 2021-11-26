import React from 'react';
import './App.css';
import StarWarsProvider from './context/Provider';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SearchHistory from './components/SearchHistory';
import SortFilters from './components/SortFilters';

function App() {
  return (
    <StarWarsProvider>
      <SearchBar />
      <Filters />
      <SortFilters />
      <SearchHistory />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
