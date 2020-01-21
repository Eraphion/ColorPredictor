import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import style from "./index.css"
import {ModePicker} from "./Components/ModePicker"
import {TrainingMode} from "./Components/TrainingMode"
import {UsageMode} from "./Components/UsageMode"
import {ViewPrediction } from './Components/ViewPrediction'
import {BadResult} from "./Components/BadResult"
import {GoodResult} from "./Components/GoodResult"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ModePicker} />
      <Route path="/training" exact component={TrainingMode} />
      <Route path="/usage" exact component={UsageMode} />
      <Route path="/viewPrediction/:r/:g/:b/:background" exact component={ViewPrediction} />
      <Route path="/badResult" exact component={BadResult} />
      <Route path="/goodResult" exact component={GoodResult} />
    </BrowserRouter>
  );
}

export default App;
