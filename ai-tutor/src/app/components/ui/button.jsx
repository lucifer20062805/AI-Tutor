export function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition"
      >
        {children}
      </button>
    );
  }
  