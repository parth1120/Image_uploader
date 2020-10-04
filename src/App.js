import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import UploadedImages from './components/Uploaded';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route {...Main} />
            <Route {...UploadedImages} />
            <Redirect path="*" to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
