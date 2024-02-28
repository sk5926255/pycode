interface OutputSectionProps {
  output: {
    stdout: string;
    stderr: string;
    error: {
      code: number;
      killed: boolean;
      signal: string | null;
      cmd: string;
    };
  };
  otherError: string | null;
}

const CodeOutput: React.FC<OutputSectionProps> = ({ output, otherError }) => {
  const { stdout, stderr, error } = output;

  // Check if stdout and stderr are strings
  const outputLines = typeof stdout === "string" ? stdout.split("\n") : [];
  const errorLines = typeof stderr === "string" ? stderr.split("\n") : [];

  return (
    <div className="text-white h-full flex-1  bg-[#272822]">
      <div className="flex h-full bg-[#2D2F34] border-b border-b-gray-700">
        <div className="flex  items-center px-4 justify-start w-full p-2 min-h-[50px]">
          OUTPUT
        </div>
      </div>
      <div className="h-[calc(50vh-123px)]">
        {outputLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {errorLines.map((line, index) => (
          <p key={index} style={{ color: "red" }}>
            {line}
          </p>
        ))}
        {error && typeof error === "object" && (
          <div>
            <p>Error Code: {error.code}</p>
            <p>Killed: {error.killed.toString()}</p>
            <p>Signal: {error.signal || "None"}</p>
            <p>Command: {error.cmd}</p>
          </div>
        )}
        {otherError && <p style={{ color: "red" }}>{otherError}</p>}
      </div>
    </div>
  );
};

export default CodeOutput;
