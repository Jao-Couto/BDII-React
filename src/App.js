import React from "react";
import Login from "./components/login";
import { FaUsers, FaUserPlus, FaUserMd, FaUserInjured, FaUserAlt, FaClipboardList, FaFileMedicalAlt, FaFileMedical, FaUserClock, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Atendimentos from "./components/Atendimentos";
import CadastroUsuario from "./components/CadastroUsuario";
import { useState } from "react/cjs/react.development";
import Button from "./components/Button";
import DropdownMenu from "./components/DropdownMenu";
import useLocalStorage from "./services/useLocalStorage";

function App() {

  const [isLogin, setLogin] = useLocalStorage("isLogged", false);
  const [isAtendente, setIsAtendente] = useLocalStorage("isAtendente", false);

  const [table, setTable] = useState("atendente");

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
                pathname: "/",
              }}
            />
          )
        }
      />
    );
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
    },
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Router>
        <div className="flex flex-row p-3 w-full justify-between">
          
          {isLogin ? (<>
            <div className="w-full flex">
              {!isAtendente ? (
                <>
                  <Link to="/medico/" style={{ textDecoration: "none" }}>
                    <Button name="Atendimentos" icon={<FaClipboardList size="24"/>} id="atnd" styles="min-w-navbar-btn"/>
                  </Link>
                  <Link to="/medico/exames" style={{ textDecoration: "none" }}>
                    <Button name="Exames" icon={<FaFileMedicalAlt size="24"/>} id="exames" styles="min-w-navbar-btn"/>
                  </Link>
                  <Link to="/medico/plantao" style={{ textDecoration: "none" }}>
                    <Button name="Plantão" icon={<FaUserClock size="24"/>} id="plantao" styles="min-w-navbar-btn"/>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button name="Atendimentos" icon={<FaClipboardList size="24"/>} id="atnd" styles="min-w-navbar-btn"/>
                  </Link>
                  <Link to="/add-atendimento" style={{ textDecoration: "none" }}>
                    <Button name="Adicionar Atendimento" icon={<FaFileMedical size="24"/>} id="atndAdd" styles="min-w-navbar-btn"/>
                  </Link>
                  <DropdownMenu 
                    id="cadastros"
                    name="Cadastros"
                    icon={<FaUserPlus size="24"/>}
                    styles="min-w-navbar-btn"
                    options={[
                      {name:"Medico", route:"/cadastrar/medico", icon:<FaUserMd size="18"/>},
                      {name:"Paciente", route:"/cadastrar/paciente", icon:<FaUserInjured size="18"/>}
                      ]}
                  />
                  <DropdownMenu 
                    id="usuarios"
                    name="Usuarios"
                    icon={<FaUsers size="24"/>}
                    styles="min-w-navbar-btn"
                    options={[
                      {name:"Atendentes", route:"/usuarios/atendentes", icon:<FaUserAlt size="18"/>},
                      {name:"Médicos", route:"/usuarios/medicos", icon:<FaUserMd size="18"/>},
                      {name:"Paciente", route:"/usuarios/pacientes", icon:<FaUserInjured size="18"/>}
                      ]}
                  />
                </>
              )}
            </div>
              <div className="flex items-end">
                <Button name="Logout" icon={<FaSignOutAlt size="24"/>} onClick={()=>setLogin(false)} color="bg-red-500" styles="rounded-sm text-white cursor-pointer" backdrop="bg-white"/>
              </div>
            </>
            ) : (
            <div className="flex mr-0 ml-auto">
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button name="Login" icon={<FaSignInAlt size="24" />} styles="min-w-navbar-btn cursor-pointer"/>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button name="Sign Up" icon={<FaUserPlus size="24" />} styles="min-w-navbar-btn cursor-pointer"/>
                </Link>
              </>
            </div>
          )}
        </div>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <div className="flex items-center justify-center h-full min-w-full bg-white">
          <Switch>
            <Route path="/signup">
              <CadastroUsuario type="atendente"></CadastroUsuario>
            </Route>
            <Route path="/login">
              <Login
                valida={setLogin}
                tipoUsuario={setIsAtendente}
              />
            </Route>
            {/*Médico*/}
            <PrivateRoute path="/medico/exames"></PrivateRoute>
            <PrivateRoute path="/medico/plantao"></PrivateRoute>
            <PrivateRoute path="/medico/">
              <Atendimentos/>
            </PrivateRoute>
            {/*Atendente*/}
            <PrivateRoute path="/add-atendimento">
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/medico">
              <CadastroUsuario type="medico" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/paciente">
              <CadastroUsuario type="paciente" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/atendete">
              <CadastroUsuario type="atendente" />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/atendentes"></PrivateRoute>
            <PrivateRoute path="/usuarios/medicos"></PrivateRoute>
            <PrivateRoute path="/usuarios/pacientes"></PrivateRoute>
            <PrivateRoute path="/">
              <Atendimentos isAtendente={isAtendente} />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
