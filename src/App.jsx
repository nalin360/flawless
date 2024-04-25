import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginSignUp/LoginForm";
import Register from "./components/LoginSignUp/Register";
import Dashboard from "./pages/Dashboard";
import Board from "./components/BoardContents";
import Analytics from "./pages/Analytics";
import Body from "./components/Board/Body";
import WorkList from "./components/Dashboard2/List";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/body" element={<Body />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="board">	
            <Route index element={<Board />} /> 
            <Route path="todoboards/:boardId" element={<WorkList />} />
          </Route>
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<div>No match</div>} />
      </Routes>
    </>
 );
}

export default App;
