import { useEffect } from "react";

function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed md:top-20 top-24 md:w-96 max-w-96 z-50 p-4 rounded-lg shadow-lg ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      <div className="flex items-center justify-between">
        <div>{message}</div>
        <button onClick={onClose} className="ml-4">
          x
        </button>
      </div>
    </div>
  );
}

export default Notification;
