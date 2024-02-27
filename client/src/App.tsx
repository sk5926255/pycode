import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import CodeOutput from "./components/CodeOutput";
import CodeInput from "./components/CodeInput";

interface OutputTypes {
  stdout: string;
  stderr: string;
  error: {
    code: number;
    killed: boolean;
    signal: string | null;
    cmd: string;
  };
}

const App: React.FC = () => {
  const [output, setOutput] = useState<OutputTypes>({
    stdout: "",
    stderr: "",
    error: { code: 0, killed: false, signal: null, cmd: "" },
  });
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");

  const executeCode = async (code: string): Promise<void> => {
    setOutput({
      stdout: "",
      stderr: "",
      error: { code: 0, killed: false, signal: null, cmd: "" },
    });
    try {
      // Call the backend to execute code
      const response = await fetch("http://localhost:4001/execute/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, input: userInput }),
      });

      if (!response.ok) {
        // Handle non-successful response
        const errorMessage = await response.text();
        setError(errorMessage);
      }

      const result = await response.json();
      setOutput(result);
      setError(null); // Clear error state
    } catch (error) {
      console.error("Error executing Python code:", error);
      // throw error;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b px-16 py-4 border-b-gray-700 bg-[#202020] text-white font-bold capitalize">
        <h1 className="text-center">Python Interpreter</h1>
      </header>
      <main className="flex items-start h-full bg-[#272822]">
        <CodeEditor onExecuteCode={executeCode} />
        <div className="flex flex-col flex-1">
          <CodeInput onUserInputChange={setUserInput} />
          <CodeOutput output={output} otherError={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
