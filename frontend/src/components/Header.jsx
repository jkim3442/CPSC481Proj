export default function Header() {
  console.log('<Header />');

  return (
    <>
      <header className="mt-4 flex items-center justify-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          Flight Itinerary Optimizer
        </h1>
      </header>
    </>
  );
}
