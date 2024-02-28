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
      <div className="flex h-full  bg-[#2D2F34] border-b border-b-gray-700 min-h-[56px]">
        <p className="bg-[#272822] text-white p-2 border-x border-gray-700 text-center flex items-center ml-[41px] justify-center">
          <span>index.py</span>
        </p>
        <div className="flex items-center justify-end w-full gap-4 p-2 px-4">
          <select
            onChange={(e) => handleThemeChange(e.target.value)}
            value={theme}
            className="px-2 py-1 ml-4 text-white bg-gray-800 rounded outline-none"
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
            {isLoading ? (
              <ButtonLoader />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-player-play-filled"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
                  strokeWidth="0"
                  fill="currentColor"
                />
              </svg>
            )}
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
        style={{ height: "calc(100vh - 114px)", width: "100%" }}
        fontSize="18px"
      />
    </div>
  );
};

export default CodeEditor;
