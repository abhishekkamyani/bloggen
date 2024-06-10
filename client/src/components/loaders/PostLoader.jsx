export default function PostLoader() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg outline outline-1">
      <div className="flex-shrink-0 h-48 relative animate-pulse bg-gray-500"></div>
      <div className="flex flex-1 flex-col justify-between bg-white dark:bg-slate-700 p-6">
        <div className="flex-1 mt-2 flex flex-col gap-y-4">
          <p className="py-2 bg-gray-400 w-1/2 animate-pulse"></p>
          <p className="py-4 bg-gray-400 w-full animate-pulse"></p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0 h-10 w-10 object-cover object-center rounded-full animate-pulse bg-gray-500"></div>

          <div className="ml-3 w-full">
            <p className="py-2 bg-gray-400 w-1/4 animate-pulse"></p>

            <div className="flex space-x-1 justify-between w-full">
              <time className="py-2 bg-gray-400 w-1/2 mt-2 animate-pulse"></time>
              <span className="bg-gray-500 w-1/4 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
