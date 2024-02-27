import { useState } from "react";

interface InputSectionProps {
  onUserInputChange: (input: string) => void;
}
const CodeInput: React.FC<InputSectionProps> = ({ onUserInputChange }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [inputMessage, setInputMessage] = useState<string | null>(null);

  return (
    <div className="text-white h-full flex-1  bg-[#272822]">
      <div className="flex h-full  bg-[#2D2F34] border-b border-b-gray-700">
        <div className="flex h-[56px]  items-center px-4 justify-start w-full p-2 min-h-[50px]">
          INPUT
        </div>
      </div>
      <div className="h-[calc(50vh-123px)]">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full outline-none bg-[#272822] text-white p-4"
        />

        <button onClick={() => onUserInputChange(userInput)}>
          Submit Input
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
