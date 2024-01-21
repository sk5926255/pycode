interface OutputSectionProps {
  output: string;
  error: string | null;
}

const CodeOutput: React.FC<OutputSectionProps> = ({ output, error }) => {
  const formattedOutput = output.replace(/\n/g, "<br>");

  return (
    <div className="text-white h-full flex-1  bg-[#272822]">
      <div className="flex h-full bg-[#2D2F34] border-b border-b-gray-700">
        <div className="flex items-center px-4 justify-end w-full p-2 min-h-[50px]"></div>
      </div>
      <div className="h-[calc(100vh-123px)]">
        {output && <p>{formattedOutput}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CodeOutput;
