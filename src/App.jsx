import { useState,useEffect } from "react";
import {
  Code,
  Play,
  RotateCcw,
  CheckCircle,
  Clipboard,
  Loader2,
} from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {dracula} from '@uiw/codemirror-theme-dracula';


function App() {
  const [aiReady, setAiReady] = useState(false);
  const [inputCode, setInputCode] = useState(
    `function helloworld() {\n  console.log("Hello, world!");\n}`
  );
  const [outputCode, setOutputCode] = useState("");
  const [targetLang, setTargetLang] = useState("python");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");


  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    },300) ;
    return () => clearInterval(checkReady);
  }, []);

  const handleConvert = async() => {
    if(!inputCode.trim()) {
      setFeedback("❌ Input code is empty.");
      return;
    }
    if(!aiReady) {
      setFeedback("❌ AI is not ready yet. Please wait.");
      return;
    }
    setLoading(true);
    setFeedback("");
    setOutputCode("");
    try {
      const res = await window.puter.ai.chat(
        `
          Convert the following code into ${targetLang}.
          Only return the converted code , no explanation.
          
          code:
          ${inputCode}
        `
      );

      const replay = 
        typeof res === "string"
          ? res
          : res?.message?.content ||
            res?.message?.map((m) => m.content).
            join("\n") ||
            "";
      
      if(!replay.trim()) throw new Error ("❌ Conversion failed.");
      
      setOutputCode(replay.trim());
      setFeedback("✅ Conversion successful!");
    } catch (error) {
      console.error("Error during conversion: ", error);
      setFeedback(`❌ Error during conversion: ${error.message}`);
    } 
    finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setInputCode(
      `function helloworld() {\n  console.log("Hello, world!");\n}`
    );
    setOutputCode("");
    setFeedback("");
  };

  const handleCopy = async () => {
    if(outputCode){
      await navigator.clipboard.writeText(outputCode);
      setFeedback("📝 Code copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex flex-col items-center justify-center p-6 gap-10 relative overflow-hidden">
      <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent text-center drop-shadow-lg relative">
        AI Code Converter
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
        <select 
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="bg-slate-900/80 px-4 py-2 rounded-xl text-white border border-slate-700 shadow-lg backdrop-blur-md cursor-pointer"
        >
          {["python" , "Java" , "C++" , "Go" , "Rust" , "TypeScript"]
            .map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
          ))}
        </select>
        <button
          onClick={handleConvert}
          disabled={!aiReady || loading}
          className="px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-80 active:scale-95 text-white font-semibold rounded-2xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-5 h-5
            animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          {loading ? "Converting..." : "Convert"}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:opacity-80 active:scale-95 text-white font-semibold rounded-2xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl relative z-10">
        <div 
          className="bg-slate-900/80 border border-slate-700 rounded- shadow-2xl
          overflow-hidden backdrop-blur-md"
        >
          <div 
            className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center gap-2"
          >
            <Code className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-semibold">Input Code</span>
          </div>
          <CodeMirror
            value={inputCode}
            height="420px"
            theme={dracula}
            extensions={[javascript({
              jsx: true
            })]}
            onChange={(value) => setInputCode(value)}
          />
        </div>

        <div 
          className="bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md flex flex-col"
        >
          <div 
            className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5
              text-emerald-400" />
              <span 
                className="text-white font-semibold"
              >
                Converted Code ({targetLang})
              </span>
            </div>
            <button
              onClick={handleCopy}
              disabled={!outputCode}
              className="flex items-center gap-1 text-sm px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50"
              >
                <Clipboard className="w-4 h-4" />
              </button>
          </div>
          <CodeMirror
            value={outputCode}
            height="420px"
            theme={dracula}
            extensions={[javascript({
              jsx: true
            })]}
            onChange={(value) => setOutputCode(value)}
          />
        </div>
      </div>

      {
        feedback && (
          <p
            className={`text-center font-semibold
            drop-shadow-md relative text-white z-10 ${ feedback.
            includes(
              "✅"|| feedback.includes("📋")
              ? "text-emerald-400"
              : "text-rose-400"
            )}`}
          >
            {feedback}
          </p>
        )
      }
    </div>
  );
}

export default App;