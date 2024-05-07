export default function SubmitError({ message, ...props }) {
  return (
    <>
      <div className="bg-white">
        <h2 className="font-bold text-stone-950">Error</h2>
        <h1 className="text-stone-700">{message}</h1>
        <div className="mt-2 flex justify-end">
          <button
            className="rounded-sm bg-blue-600 px-4 py-2 font-medium shadow-lg hover:bg-blue-700"
            {...props}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}
