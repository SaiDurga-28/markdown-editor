import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FileItem {
  id: string;
  name: string;
  content: string;
}

interface StoreState {
  files: Record<string, FileItem>;
  activeFileId: string;
  theme: "light" | "dark";

  createFile: () => void;
  updateFileContent: (fileId: string, content: string) => void;
  toggleTheme: () => void;
}

const LOCAL_STORAGE_KEY = "markdown-editor-storage";

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      files: {
        "welcome.md": {
          id: "welcome.md",
          name: "welcome.md",
          content: "# Welcome!"
        }
      },

      activeFileId: "welcome.md",
      theme: "light",

      createFile: () => {
        const id = "untitled.md";
        set((state) => ({
          files: {
            ...state.files,
            [id]: { id, name: id, content: "" }
          },
          activeFileId: id
        }));
      },

      updateFileContent: (fileId, content) => {
        set((state) => ({
          files: {
            ...state.files,
            [fileId]: {
              ...state.files[fileId],
              content
            }
          }
        }));
      },

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light"
        }))
    }),
    { name: LOCAL_STORAGE_KEY }
  )
);

// REQUIRED FOR TESTING
(window as any).zustandStore = useStore;
(window as any).getLocalStorageState = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");