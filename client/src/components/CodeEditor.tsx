import "ace-builds/src-noconflict/ext-language_tools";
import React, { useState } from "react";
import AceEditor from "react-ace";
import ButtonLoader from "./ButtonLoader";

interface CodeEditorProps {
  onExecuteCode: (code: string) => Promise<void>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onExecuteCode }) => {
  const [pythonCode, setPythonCode] = useState("# Let's do some coding....");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("monokai"); // Set default theme to monokai

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const executePythonCode = async () => {
    setIsLoading(true);
    try {
      if (pythonCode.trim() === "") {
        return;
      }
      await onExecuteCode(pythonCode);
    } catch (error) {
      console.error("Error executing Python code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-[2] border-r bg-[#272822] border-r-gray-600 h-full">
      <div className="flex h-full bg-[#2D2F34] border-b border-b-gray-700 min-h-[50px]">
        <p className="bg-[#272822] text-white p-2 border-x border-gray-700 text-center flex items-center ml-[41px] justify-center">
          <span>index.py</span>
        </p>
        <div className="flex items-center px-4 justify-end w-full p-2 gap-4">
          <select
            onChange={(e) => handleThemeChange(e.target.value)}
            value={theme}
            className="ml-4 bg-gray-800 text-white px-2 py-1 rounded outline-none"
          >
            <option value="monokai">Monokai</option>
            <option value="github">GitHub</option>
            <option value="solarized_dark">Solarized Dark</option>
          </select>
          <button
            disabled={isLoading}
            onClick={executePythonCode}
            className={`bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center px-4 py-2 w-24 font-bold ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? <ButtonLoader /> : "RUN"}
          </button>
        </div>
      </div>
      <AceEditor
        mode="python"
        theme={theme}
        onChange={setPythonCode}
        value={pythonCode}
        name="python-editor"
        editorProps={{ $blockScrolling: true }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        style={{ height: "calc(100vh - 123px)", width: "100%" }}
        fontSize="18px"
      />
    </div>
  );
};

export default CodeEditor;
