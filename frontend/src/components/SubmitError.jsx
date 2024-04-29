export default function SubmitError({ message, ...props }) {
  return (
    <>
      <div className="bg-white">
        <h1 className="text-stone-900">{message}</h1>
        <div className="mt-2 flex justify-end">
          <button
            className="rounded-sm bg-blue-600 px-4 py-1 shadow-md hover:bg-blue-700"
            {...props}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}
