export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5">
          <div className="min-w-28 min-h-28 bg-neutral-700" />
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-neutral-700 h-5 w-4/5"></div>
            <div className="bg-neutral-700 h-5 w-3/5"></div>
            <div className="bg-neutral-700 h-5 w-2/5"></div>
            <div className="bg-neutral-700 h-5 w-1/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
