export function Button({ onClick, children }) {
  return (
    <button
      className="bg-green-500 hover:bg-zinc-100 hover:text-zinc-950 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
