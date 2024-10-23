const ChatBox = ({ message }) => {
  return (
    <div className="p-4 space-y-4">
      {/* First Message (Button-like) */}
      {message.map((message) => {
        return (
          <div
            className={`w-full flex ${
              message.role == "user" ? "justify-end" : ""
            }`}
          >
            <div
              className={
                (message.role == "user"
                  ? "bg-gray-200 text-gray-600 px-4"
                  : "bg-blue-100 text-blue-800 px-4") +
                " py-2 rounded-lg inline-block w-[85%]"
              }
            >
              {message.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
