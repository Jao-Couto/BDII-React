import React from "react";
import Login from "./components/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Atendimentos from "./components/Atendimentos";
import Cadastro from "./components/Cadastro";
import { useState } from "react/cjs/react.development";

function App() {
  const useStateWithLocalStorage = (localStorageKey) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(localStorageKey) || ""
    );

    React.useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [localStorageKey, value]);

    return [value, setValue];
  };

  const [isLogin, setLogin] = useStateWithLocalStorage(false);
  const [isAtendente, setIsAtendente] = useStateWithLocalStorage(false);

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
    <div className="flex flex-col items-center h-screen bg-black">
      <Router>
        <div className="flex flex-row p-3 w-full">
          {isLogin ? (
            !isAtendente ? (
              <>
                <Link to="/medico/" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3" icon="inbox">
                    Atendimentos
                  </div>
                </Link>
                <Link to="/medico/exames" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3" icon="application">
                    Exames
                  </div>
                </Link>
                <Link to="/medico/plantao" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3" icon="box">
                    {" "}
                    Plantão
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3" icon="inbox">
                    Atendimentos
                  </div>
                </Link>
                <Link to="/add-atendimento" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3" icon="application">
                    Adicionar Atendimento
                  </div>
                </Link>

                <Link to="/cadastrar/medico" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3"> Médico</div>
                </Link>
                <Link
                  to="/cadastrar/paciente"
                  style={{ textDecoration: "none" }}
                >
                  <div className="bg-white p-3"> Paciente</div>
                </Link>

                <div className="bg-white p-3" icon="share">
                  Cadastrar{" "}
                </div>

                <Link
                  to="/usuarios/atendentes"
                  style={{ textDecoration: "none" }}
                >
                  <div className="bg-white p-3"> Atendentes</div>
                </Link>
                <Link to="/usuarios/medicos" style={{ textDecoration: "none" }}>
                  <div className="bg-white p-3"> Médicos</div>
                </Link>
                <Link
                  to="/usuarios/pacientes"
                  style={{ textDecoration: "none" }}
                >
                  <div className="bg-white p-3"> Pacientes</div>
                </Link>
                <div className="bg-white p-3" icon="join-table">
                  Tabelas
                </div>
              </>
            )
          ) : (
            <div></div>
          )}
        </div>
        {isLogin ? (
          <div
            className="bg-white p-3"
            icon="log-out"
            intent="danger"
            onClick={() => setLogin(false)}
          >
            Logout
          </div>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="bg-white p-3" icon="log-in">
                {" "}
                Login{" "}
              </div>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <div className="bg-white p-3" icon="inbox">
                {" "}
                Signup{" "}
              </div>
            </Link>
          </>
        )}

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <div className="flex items-center justify-center h-full min-w-full bg-white">
          <Switch>
            <Route path="/signup">
              <Cadastro type="atendente"></Cadastro>
            </Route>
            <Route path="/login">
              <Login
                valida={setLogin}
                tipoUsuario={setIsAtendente}
                table={setTable}
              />
            </Route>
            {/*Médico*/}
            <PrivateRoute path="/medico/exames"></PrivateRoute>
            <PrivateRoute path="/medico/plantao"></PrivateRoute>
            <PrivateRoute path="/medico/"></PrivateRoute>
            {/*Atendente*/}
            <PrivateRoute path="/add-atendimento"></PrivateRoute>
            <PrivateRoute path="/cadastrar/medico">
              <Cadastro type="medico" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/paciente">
              <Cadastro type="paciente" />
            </PrivateRoute>
            <PrivateRoute path="/cadastrar/atendete">
              <Cadastro type="atendente" />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/atendentes"></PrivateRoute>
            <PrivateRoute path="/usuarios/medicos"></PrivateRoute>
            <PrivateRoute path="/usuarios/pacientes"></PrivateRoute>
            <PrivateRoute path="/">
              <Atendimentos colunas={table} />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
