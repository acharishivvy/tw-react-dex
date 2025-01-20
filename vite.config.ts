import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const ReactCompilerConfig = {
  target: "19",
};

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
    ],
    // ...
  };
});
