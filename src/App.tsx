import { FormWrapper } from "./components/Forms";

import { formInputs } from "./config/signup";

const App = (): JSX.Element => {
  return (
    <main>
      <FormWrapper inputs={formInputs} />
    </main>
  );
};

export default App;
