import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      try {
        const { data } = await axios.get(
         `${import.meta.env.VITE_API_URL}/api/contact`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="px-6 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{msg.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {msg.email}
              </p>

              <p className="mt-4">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}