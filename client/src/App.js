import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import Main from "./components/Main";
import store from "./store";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
