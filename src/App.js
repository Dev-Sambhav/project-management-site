import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// styles
import "./App.css";

// components and pages
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/project/Project";
import ChatRoom from "./pages/chatroom/ChatRoom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";
import Feedbackform from "./pages/feedback/Feedbackform";
function App() {
  const { user, isAuthReady } = useAuthContext();
   
  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {!user && <Login />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path="/signup">
                {!user && <Signup />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path="/create">
                {user && <Create />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/projects/:id">
                {user && <Project />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/chatroom">
                {user && <ChatRoom />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/feedback">
                {user && <Feedbackform />}
                {!user && <Redirect to="/login" />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
