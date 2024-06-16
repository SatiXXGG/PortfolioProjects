export default function LoadMoreButton({
  fetchPages,
}: {
  fetchPages: CallableFunction;
}) {
  return (
    <button
      onClick={() => fetchPages()}
      className="bg-blue-700 text-md  px-2 py-1 rounded-md mx-auto text-white flex my-3 transition-all duration-200 active:bg-black active:scale-105"
    >
      Load more...
    </button>
  );
}
