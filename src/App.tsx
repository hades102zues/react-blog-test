import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
