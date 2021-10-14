import React, { useState } from "react";
import Login from "./components/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Alignment, Button, Menu, Navbar, Popover, Position } from "@blueprintjs/core";
import Table from "./components/table";
import Cadastro from "./components/Cadastro";


function App() {
  const [isLogin, setLogin] = useState(false);
  const [isMedico, setIsMedico] = useState(false)

  function mostraBotoesLoginLogout() {
    if (isLogin) {
      return <Button className="bp3-minimal" icon="log-out" intent='danger' text='Logout' onClick={() => setLogin(false)} />
    } else {
      return <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button className="bp3-minimal" icon="log-in" text='Login' />
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button className="bp3-minimal" icon="inbox" text='Signup' />
        </Link>
      </>

    }

  }
  function mostraIconesNavbar() {
    if (isLogin) {
      if (isMedico) {
        return <>
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
      } else {
        return <>
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
      }
    } else {
      return <div></div>

    }

  }



  const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-black">
      <Router>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Gerenciamento de Pacientes</Navbar.Heading>

            <Navbar.Divider />

            {mostraIconesNavbar()}

          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />

            {mostraBotoesLoginLogout()}

          </Navbar.Group>
        </Navbar>
        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <div className="flex items-center justify-center h-full min-w-full bg-white">
          <Switch>
            <Route path="/signup">
              <Cadastro type='paciente'></Cadastro>
            </Route>
            <Route path="/login">
              <Login valida={setLogin} tipoUsuario={setIsMedico} />
            </Route>
            {/*Médico*/}
            <Route path="/medico/">

            </Route>
            <Route path="/medico/exames">

            </Route>
            <Route path="/medico/plantao">

            </Route>
            {/*Atendente*/}
            <Route path="/add-atendimento">

            </Route>
            <Route path="/cadastrar/medico">

            </Route>
            <Route path="/cadastrar/paciente">

            </Route>
            <Route path="/cadastrar/atendete">

            </Route>
            <Route path="/usuarios/atendentes">

            </Route>
            <Route path="/usuarios/medicos">

            </Route>
            <Route path="/usuarios/pacientes">

            </Route>
            <Route path="/">
              <Table></Table>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>


  );
}

export default App;
