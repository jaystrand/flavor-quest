import { Outlet } from 'react-router-dom';
import Navbar from './components/Nav';    
// import RandomFoodImage from './components/RandomFoodImage'; 
function App() {
  return (
    <div className="container">
      <Navbar />  {/* Display the Navbar */}
      <main>
      {/* <h1> Food Image from the second API  </h1>
      <RandomFoodImage />  */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default App;