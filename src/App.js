import React from "react";
import Login from "./components/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Alignment, Button, Navbar } from "@blueprintjs/core";


function App() {
  return (
    <div className="flex flex-col items-center h-screen bg-black">
      <Router>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Blueprint</Navbar.Heading>
                <Navbar.Divider />
                
                  <Link to="/" style={{textDecoration:'none'}}> <Button className="bp3-minimal" icon="home" text="Home"></Button></Link> 
                
                
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Link to="/login" style={{textDecoration:'none'}}> <Button className="bp3-minimal" icon="log-in" text='Login'/> </Link> 
            <Link to="/signup" style={{textDecoration:'none'}}> <Button className="bp3-minimal" icon="inbox" text='Signup'/> </Link> 
                  
            </Navbar.Group>
        </Navbar>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <div className="flex items-center justify-center h-full min-w-full bg-white">
          <Switch>
            <Route path="/signup">
              
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    
    
  );
}

export default App;
