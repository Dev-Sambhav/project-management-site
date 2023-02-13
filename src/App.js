import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// styles
import "./App.css";

// components and pages
import {Navbar, Sidebar, OnlineUsers} from "./components";
import {Login, Signup, Create, Dashboard, Project, ChatRoom, Feedbackform} from "./pages"


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
