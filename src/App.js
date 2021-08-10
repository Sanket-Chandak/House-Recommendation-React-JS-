import { Route, Switch, Redirect } from "react-router-dom";
import About from "./pages/About";
import Map from "./pages/Map";
import Home from "./pages/Home";
import MainHeader from "./components/MainHeader";
import './App.css';

function App() {
  return (
    <div className='App'>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/map" exact>
            <Map />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

