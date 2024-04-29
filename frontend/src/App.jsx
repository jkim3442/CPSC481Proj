import MapChart from './components/MapChart';
import Select from './components/Select';

function App() {
  return (
    <>
      <div className="container mx-auto border">
        <section className="mx-auto w-full border-2 border-red-300 md:w-11/12 lg:w-10/12 xl:w-8/12">
          <MapChart />
          <div className="border">
            <Select />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
