import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Text from "./Components/Text";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <div>
              <div className="border container min-h-[500px] h-[80vh] mx-auto flex flex-col items-center overflow-y-auto">
                <div className="h-[100px] w-[100px] border flex-shrink-0"></div>
                <div className="h-[100px] w-[100px] border flex-shrink-0"></div>
                <div className="h-[100px] w-[100px] border flex-shrink-0"></div>
                <div className="h-[100px] w-[100px] border flex-shrink-0"></div>
              </div>
            </div>
          }
        />

        {/* /text route */}
        <Route path="/text" element={<Text />} />
      </Routes>
    </Router>
  );
}

export default App;
