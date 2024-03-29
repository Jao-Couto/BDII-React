import React from "react";
import Login from "./components/login";
import { FaUsers, FaHospital, FaUserPlus, FaUserMd, FaUserInjured, FaUserAlt, FaClipboardList, FaFileMedicalAlt, FaFileMedical, FaUserClock, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi"
import { MdOutlineAutoGraph } from "react-icons/md"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Atendimentos from "./components/Atendimentos";
import CadastroUsuario from "./components/CadastroUsuario";
import Button from "./components/Button";
import DropdownMenu from "./components/DropdownMenu";
import useLocalStorage from "./services/useLocalStorage";
import CadastroExames from "./components/CadastroExames";
import CadastroAtendimentos from "./components/CadastroAtendimento";
import Exames from "./components/Exames";
import Plantao from "./components/Plantao";
import Atendendo from "./components/Atendento";
import Usuarios from "./components/Usuarios";
import Remedios from "./components/Remedios";
import PlanosDeSaude from "./components/PlanosDeSaude";
import HistoricoAtendimentos from "./components/HistoricoAtendimentos";
import Dashboard from "./components/Dashboard";

function App() {

  const [isLogin, setLogin] = useLocalStorage("isLogged", false);
  const [isAtendente, setIsAtendente] = useLocalStorage("isAtendente", false);

  function handleLogout() {
    setLogin(false);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

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
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }


  return (
    <div className="flex flex-col items-center h-screen">
      <Router>
        <div className="flex flex-row p-3 w-full justify-between border-b bg">

          {isLogin ? (<>
            <div className="w-full flex flex-wrap">
              {!isAtendente ? (
                <>
                  <Link to="/medico/" style={{ textDecoration: "none" }}>
                    <Button name="Atendimentos" icon={<FaClipboardList size="24" />} id="atnd" styles="min-w-navbar-btn" />
                  </Link>
                  <Link to="/medico/exames" style={{ textDecoration: "none" }}>
                    <Button name="Exames e Remédios" icon={<FaFileMedicalAlt size="24" />} id="exames" styles="min-w-navbar-btn" />
                  </Link>
                  <Link to="/medico/plantao" style={{ textDecoration: "none" }}>
                    <Button name="Plantão" icon={<FaUserClock size="24" />} id="plantao" styles="min-w-navbar-btn" />
                  </Link>
                  <Link to="/medico/remedios" style={{ textDecoration: "none" }}>
                    <Button name="Remédios" icon={<GiMedicines size="24" />} id="remedios" styles="min-w-navbar-btn" />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button name="Atendimentos" icon={<FaClipboardList size="24" />} id="atnd" styles="min-w-navbar-btn" />
                  </Link>
                  <Link to="/add-atendimento" style={{ textDecoration: "none" }}>
                    <Button name="Adicionar Atendimento" icon={<FaFileMedical size="24" />} id="atndAdd" styles="min-w-navbar-btn" />
                  </Link>
                  <DropdownMenu
                    id="cadastros"
                    name="Cadastros"
                    icon={<FaUserPlus size="24" />}
                    styles="min-w-navbar-btn"
                    options={[
                      { name: "Medico", route: "/cadastrar/medico", icon: <FaUserMd size="18" /> },
                      { name: "Paciente", route: "/cadastrar/paciente", icon: <FaUserInjured size="18" /> }
                    ]}
                  />
                  <Link to="/planosDeSaude" style={{ textDecoration: "none" }}>
                    <Button name="Planos de Saude" icon={<FaHospital size="24" />} id="planosDeSaude" styles="min-w-navbar-btn" />
                  </Link>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <Button name="Dashboard" icon={<MdOutlineAutoGraph size="24" />} id="dash" styles="min-w-navbar-btn" />
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-end">
              <Button name="Logout" icon={<FaSignOutAlt size="24" />} onClick={() => handleLogout()} color="bg-red-500" styles="rounded-sm text-white cursor-pointer" backdrop="bg-white" />
            </div>
          </>
          ) : (
            <div className="flex mr-0 ml-auto">
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button name="Login" icon={<FaSignInAlt size="24" />} styles="min-w-navbar-btn cursor-pointer" />
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button name="Sign Up" icon={<FaUserPlus size="24" />} styles="min-w-navbar-btn cursor-pointer" />
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
              {isLogin ? <Redirect
                to={{
                  pathname: "/",
                }}
              /> : <Login
                valida={setLogin}
                tipoUsuario={setIsAtendente}
              />}
            </Route>
            {/*Médico*/}
            <PrivateRoute path="/medico/exames">
              <Exames />
            </PrivateRoute>
            <PrivateRoute path="/medico/remedios">
              <Remedios />
            </PrivateRoute>
            <PrivateRoute path="/medico/plantao">
              <Plantao />
            </PrivateRoute>
            <Route path="/medico/atendendo" render={(props) => (isLogin) ? <Atendendo {...props}></Atendendo> : <Redirect
              to={{
                pathname: "/login",
              }}
            />}>
            </Route>
            <PrivateRoute path="/medico/">
              <Atendimentos />
            </PrivateRoute>
            {/*Atendente*/}
            <PrivateRoute path="/add-atendimento">
              <CadastroAtendimentos></CadastroAtendimentos>
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/medico">
              <CadastroUsuario type="medico" />
            </PrivateRoute>
            <PrivateRoute path="/planosDeSaude">
              <PlanosDeSaude />
            </PrivateRoute>
            <PrivateRoute path="/historicoAtendimento">
              <HistoricoAtendimentos></HistoricoAtendimentos>
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/paciente">
              <CadastroUsuario type="paciente" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/exames">
              <CadastroExames />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/atendete">
              <CadastroUsuario type="atendente" />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/atendentes">
              <Usuarios type='atendentes' />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/medicos">
              <Usuarios type='medicos' />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/pacientes">
              <Usuarios type='pacientes' />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
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
