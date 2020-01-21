import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import style from "./index.css"
import {ModePicker} from "./Components/ModePicker"
import {TrainingMode} from "./Components/TrainingMode"
import {UsageMode} from "./Components/UsageMode"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ModePicker} />
      <Route path="/training" exact component={TrainingMode} />
      <Route path="/usage" exact component={UsageMode} />
    </BrowserRouter>
  );
}

export default App;
