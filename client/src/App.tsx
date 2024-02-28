import React, { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import { io } from "socket.io-client";
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

  const socket = io("http://localhost:4001");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("scriptResult", (data) => {
      setOutput((prevState) => ({
        ...prevState,
        stdout: data.stdout || prevState.stdout,
        stderr: data.stderr || prevState.stderr,
      }));
      console.log("Received script result:", output);
    });

    socket.on("input", (data) => {
      console.log("Received input request:", data);
      setError("Input request received");
    });

    socket.on("executionFinished", (data) => {
      console.log("Execution finished:", data);
      if (data.code !== 0) {
        setError(`Execution finished with code ${data.code}`);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, error]);

  const executeCode = async (code: string): Promise<void> => {
    setOutput({
      stdout: "",
      stderr: "",
      error: { code: 0, killed: false, signal: null, cmd: "" },
    });

    socket.emit("python", { code });
  };

  return (
    <div className="min-h-screen">
      <header className="border-b px-16 py-4 border-b-gray-700 bg-[#202020] text-white font-bold capitalize">
        <h1 className="text-center">Python Interpreter</h1>
      </header>
      <main className="flex items-start h-full bg-[#272822]">
        <CodeEditor onExecuteCode={executeCode} />
        <div className="flex flex-col flex-1">
          <CodeInput />
          <CodeOutput output={output} otherError={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
