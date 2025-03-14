import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Rules from "./components/Rules";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/rules" replace />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
