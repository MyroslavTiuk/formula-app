import FormulaInput from "./components/FormulaInput";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Formula Input</h1>
        <FormulaInput />
      </div>
    </div>
  );
};

export default App;
