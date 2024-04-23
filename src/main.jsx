import ReactDOM from "react-dom/client";
import notesData from "./data/notesData";
import App from "./App";
import "./index.css";

// const promise = axios.get("http://localhost:3001/notes");
// promise.then((response) => console.log(response.data));
// console.log(promise);

// axios.get("http://localhost:3001/notes").then((response) => {
//   const notesData = response.data;
//   console.log(notesData);
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <App notes={notesData} />
//   );
// });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
