import ReactDOM from "react-dom/client";

import notesData from "./data/notesData";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notesData} />
);
