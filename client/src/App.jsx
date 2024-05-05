import { Link } from "react-router-dom"
import './index.css';

function App() {
  return (
    <div className="app">
      <h1>Are you a User or Admin</h1>
      <div className="app__link">
        <Link to='/login'>Admin</Link>
        <Link to='/'>User</Link>
      </div>
    </div>
  );
}

export default App;
