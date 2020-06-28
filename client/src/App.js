import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.content';
import { Navbar } from './components/Navbar'
import 'materialize-css'

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthentificated = !!token
  const routes = useRoutes(isAuthentificated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthentificated
    }}>
      <Router>
        {isAuthentificated && <Navbar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
