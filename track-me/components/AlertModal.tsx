"use client";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  topic: string;
  onClose: () => void;
}

export default function AlertModal({ isOpen, message, topic, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 relative flex flex-col justify-center items-center">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{topic}</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
