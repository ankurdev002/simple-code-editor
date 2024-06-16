import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";

const CodeEditor = () => {
  const [code, setCode] = useState(`// Type your React code here
    import React from 'react';
    
    const App = () => {
      return (
        <div>
          <h1>Hello, World!</h1>
        </div>
      );
    };
    
    export default App;
    `);
  const textareaRef = useRef(null);
  const codeContainerRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleScroll = () => {
    if (textareaRef.current && codeContainerRef.current) {
      codeContainerRef.current.scrollTop = textareaRef.current.scrollTop;
      codeContainerRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertAtCursor(textareaRef.current, "  ");
    } else if (e.key === "Enter") {
      e.preventDefault();
      insertNewLineWithIndentation(e);
    }
  };

  const insertAtCursor = (textarea, text) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const newValue = value.substring(0, start) + text + value.substring(end);
    setCode(newValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
    });
  };

  const insertNewLineWithIndentation = (e) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const value = textarea.value;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const line = value.substring(lineStart, start);
    const match = line.match(/^\s*/);
    const indent = match[0];

    const newValue =
      value.substring(0, start) + "\n" + indent + value.substring(start);
    setCode(newValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd =
        start + 1 + indent.length;
    });
  };

  return (
    <>
      <div className="code-editor-container">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck="false"
          className="text-area-editor"
        />
        <pre
          ref={codeContainerRef}
          aria-hidden="true"
          className="pre-text-editor"
        >
          <code
            className="language-jsx"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.jsx, "jsx"),
            }}
          />
        </pre>
      </div>
    </>
  );
};

export default CodeEditor;
