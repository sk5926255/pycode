import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import CodeOutput from "./components/CodeOutput";

const App: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCode = async (code: string): Promise<void> => {
    setIsLoading(true);
    setOutput(""); // Clear output state
    try {
      // Call the backend to execute code
      const response = await fetch("http://localhost:9000/execute/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        // Handle non-successful response
        const errorMessage = await response.text();
        setError(errorMessage);
        // throw new Error(errorMessage);
        return;
      }

      const result = await response.json();
      setOutput(result);
      setError(null); // Clear error state
    } catch (error) {
      console.error("Error executing Python code:", error);
      // throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b px-16 py-4 border-b-gray-700 bg-[#202020] text-white font-bold capitalize">
        <h1 className="text-center">Python Interpreter</h1>
      </header>
      <main className="flex items-start h-full bg-[#272822]">
        <CodeEditor onExecuteCode={executeCode} />
        <CodeOutput output={output} error={error} />
      </main>
    </div>
  );
};

export default App;
