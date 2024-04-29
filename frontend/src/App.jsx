import MapChart from './components/MapChart';
import Select from './components/Select';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="container mx-auto ">
        <Header />
        <section className="mx-auto w-full border md:w-11/12 lg:w-10/12 xl:w-8/12">
          <MapChart />
          <Select />
        </section>
      </div>
    </>
  );
}

export default App;
