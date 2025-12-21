import { app } from "./firebase";

function App() {
  console.log("Firebase initialized:", app);

  return <h1>Firebase Connected ✅</h1>;
}

export default App;
