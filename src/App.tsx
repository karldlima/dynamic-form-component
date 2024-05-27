import { FormWrapper } from "./components/Forms";

import { formInputs } from "./config/signup";
import "./App.css";

const App = (): JSX.Element => {
  return (
    <main>
      <FormWrapper inputs={formInputs} />
    </main>
  );
};

export default App;
