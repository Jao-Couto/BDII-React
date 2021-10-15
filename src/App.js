import React from "react";
import Login from "./components/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//import Button from 'react-bootstrap/Button'

import Table from "./components/Table";
import Cadastro from "./components/Cadastro";
import { Navbar } from "react-bootstrap";
import { Alignment, Button, Menu, Popover, Position } from "@blueprintjs/core";


function App() {
  const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
      localStorage.getItem(localStorageKey) || ''
    );

    React.useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [localStorageKey, value]);

    return [value, setValue];
  };

  const [isLogin, setLogin] = useStateWithLocalStorage(false);
  const [isMedico, setIsMedico] = useStateWithLocalStorage(false)


  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          isLogin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className="flex flex-col items-center h-screen bg-black">
      <Router>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Gerenciamento de Pacientes</Navbar.Heading>

            <Navbar.Divider />

            {isLogin ?
              isMedico ? <>
                <Link to="/medico/" style={{ textDecoration: 'none' }}>
                  <Button className="bp3-minimal" icon="inbox" text="Atendimentos"></Button>
                </Link>
                <Link to="/medico/exames" style={{ textDecoration: 'none' }}>
                  <Button className="bp3-minimal" icon="application" text="Exames"></Button>
                </Link>
                <Link to="/medico/plantao" style={{ textDecoration: 'none' }}>
                  <Button className="bp3-minimal" icon="box" text="Plantão"></Button>
                </Link>
              </>
                : <>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button className="bp3-minimal" icon="inbox" text="Atendimentos"></Button>
                  </Link>
                  <Link to="/add-atendimento" style={{ textDecoration: 'none' }}>
                    <Button className="bp3-minimal" icon="application" text="Adicionar Atendimento"></Button>
                  </Link>
                  <Popover content={
                    <Menu>
                      <Link to="/cadastrar/medico" style={{ textDecoration: 'none' }}>
                        <Button className="bp3-minimal" text="Médico"></Button>
                      </Link>
                      <Link to="/cadastrar/paciente" style={{ textDecoration: 'none' }}>
                        <Button className="bp3-minimal" text="Paciente"></Button>
                      </Link>
                    </Menu>
                  } position={Position.TOP}>
                    <Button className="bp3-minimal" icon="share" text="Cadastrar" />
                  </Popover>
                  <Popover content={
                    <Menu>
                      <Link to="/usuarios/atendentes" style={{ textDecoration: 'none' }}>
                        <Button className="bp3-minimal" text="Atendentes"></Button>
                      </Link>
                      <Link to="/usuarios/medicos" style={{ textDecoration: 'none' }}>
                        <Button className="bp3-minimal" text="Médicos"></Button>
                      </Link>
                      <Link to="/usuarios/pacientes" style={{ textDecoration: 'none' }}>
                        <Button className="bp3-minimal" text="Pacientes"></Button>
                      </Link>
                    </Menu>
                  } position={Position.TOP}>
                    <Button className="bp3-minimal" icon="join-table" text="Tabelas" />
                  </Popover>
                </>
              : <div></div>}

          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />

            {isLogin ?
              <Button className="bp3-minimal" icon="log-out" intent='danger' text='Logout' onClick={() => setLogin(false)} />
              :
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button className="bp3-minimal" icon="log-in" text='Login' />
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button className="bp3-minimal" icon="inbox" text='Signup' />
                </Link>
              </>}

          </Navbar.Group>
        </Navbar>
        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <div className="flex items-center justify-center h-full min-w-full bg-white">
          <Switch>
            <Route path="/signup">
              <Cadastro type='atendente'></Cadastro>
            </Route>
            <Route path="/login">
              <Login valida={setLogin} tipoUsuario={setIsMedico} />
            </Route>
            {/*Médico*/}
            <PrivateRoute path="/medico/exames">

            </PrivateRoute>
            <PrivateRoute path="/medico/plantao">

            </PrivateRoute>
            <PrivateRoute path="/medico/">

            </PrivateRoute>
            {/*Atendente*/}
            <PrivateRoute path="/add-atendimento">

            </PrivateRoute>
            <PrivateRoute path="/cadastrar/medico">
              <Cadastro type="medico" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/paciente">
              <Cadastro type="paciente" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/atendete">
              <Cadastro type="atendente" />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/atendentes">

            </PrivateRoute>
            <PrivateRoute path="/usuarios/medicos">

            </PrivateRoute>
            <PrivateRoute path="/usuarios/pacientes">

            </PrivateRoute>
            <PrivateRoute path="/">
              <Table />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>


  );
}

export default App;
