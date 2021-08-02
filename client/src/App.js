import { useEffect } from "react";
import { Provider } from "react-redux";
import { loadUser } from "./actions/userActions";
import "./bootstrap.min.css";
import MainComponent from "./components/screen/MainComponent";
import store from "./store";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <MainComponent />
      </div>
    </Provider>
  );
};

export default App;
