import MapChart from './components/MapChart';
import Select from './components/Select';
import Header from './components/Header';

import StateSelectContextProvider from './store/stateSelect-context';

function App() {
  return (
    <div className="container mx-auto ">
      <Header />
      <section className="mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-8/12">
        <StateSelectContextProvider>
          <MapChart />
          <Select />
        </StateSelectContextProvider>
      </section>
    </div>
  );
}

export default App;
