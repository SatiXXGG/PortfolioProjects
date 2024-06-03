export default function Button({
  title,
  func,
}: {
  title: string;
  func: CallableFunction;
}) {
  return (
    <button
      onClick={() => {
        func(title);
      }}
      className="text-white active:outline-white active:scale-105 active:bg-black transition-all p-4 bg-neutral-800 mx-2 my-2 text-2xl justify-between rounded-sm outline-2 outline outline-neutral-900"
    >
      {title}
    </button>
  );
}
