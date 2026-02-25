import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useStore } from "../store";

export default function Editor() {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();

  const {
    files,
    updateFileContent,
    toggleTheme,
    theme
  } = useStore();

  const file = files[fileId!];
  const [value, setValue] = useState(file?.content || "");
  const timer = useRef<number | undefined>(undefined);

  // Debounced autosave
  useEffect(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      updateFileContent(fileId!, value);
    }, 500);
  }, [value]);

  // Update editor when switching files
  useEffect(() => {
    if (file) setValue(file.content);
  }, [fileId]);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;

  function wrap(chars: string) {
    const textarea = document.querySelector(
      '[data-testid="markdown-editor"]'
    ) as HTMLTextAreaElement;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected =
      value.slice(start, end) ||
      (chars === "**" ? "bold text" : "italic text");

    setValue(
      value.slice(0, start) +
        chars +
        selected +
        chars +
        value.slice(end)
    );
  }

  return (
  <div data-testid="editor-layout" className="app">

    <div data-testid="file-browser" className="sidebar">
      {Object.values(files).map((f) => (
        <div
          key={f.id}
          data-testid={`file-item-${f.id}`}
          onClick={() => navigate(`/editor/${f.id}`)}
        >
          {f.name}
        </div>
      ))}

      <button
  data-testid="create-file-button"
  onClick={() => navigate("/editor/untitled.md")}
>
  New File
</button>
    </div>

    <div className="main">

      <div className="toolbar">
        <button data-testid="toolbar-bold-button" onClick={() => wrap("**")}>
          Bold
        </button>

        <button data-testid="toolbar-italic-button" onClick={() => wrap("*")}>
          Italic
        </button>

        <button data-testid="theme-toggle-button" onClick={toggleTheme}>
          Theme
        </button>
      </div>

      <div className="content">
        <textarea
          data-testid="markdown-editor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div data-testid="markdown-preview" className="preview">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      </div>

      <div data-testid="word-count-display" className="status">
        Words: {words}
      </div>

    </div>
  </div>
);
}