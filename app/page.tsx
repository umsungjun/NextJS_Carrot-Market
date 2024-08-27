export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2">
        <input
          className="w-full rounded-full h-12 bg-gray-200 px-5 outline-none ring ring-transparent focus:ring-orange-500 transition-shadow"
          type="text"
          placeholder="Search here..."
        />
        <button
          className="bg-orange-500  text-white
        py-3 rounded-full active:scale-90 transition-transform font-medium focus:outline-none"
        >
          Search
        </button>
      </div>
    </main>
  );
}
