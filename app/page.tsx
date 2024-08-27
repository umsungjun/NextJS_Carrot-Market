export default function Home() {
  return (
    <main className="bg-gray-100  sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-yellow-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2 md:flex-row">
        <input
          className="w-full rounded-full h-12 bg-gray-200 px-5 outline-none ring ring-transparent focus:ring-orange-500 transition-shadow invalid:focus:ring-red-500 peer"
          type="email"
          required
          placeholder="Search here..."
        />
        <span className="hidden text-red-500 peer-invalid:block">
          Email is Required
        </span>
        <button
          className="bg-orange-500  text-white
        py-3 rounded-full active:scale-90 transition-transform font-medium focus:outline-none md:px-5"
        >
          Search
        </button>
      </div>
    </main>
  );
}
