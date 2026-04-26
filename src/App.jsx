import { useState, useEffect, useContext } from "react";

import "./App.css";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  const [loggedInUserDate, setLoggedInUserDate] = useState(null)

  const authData = useContext(AuthContext);

  // useEffect(()=>{
  //   setLocalStorage()
  // },[])

  // useEffect(() => {
 
  //   if (authData) {
  //     const loggedInUser = localStorage.getItem("loggedInUser");
  //     if (loggedInUser) {
  //       setUser(loggedInUser.role);
  //     }
  //   }
  // }, [authData]);

  const handleLogin = (email, password) => {
    if (email == "admin@me.com" && password == "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (authData ) {
      const employee =authData.employees.find((e) => email == e.email && password == e.password)
      if(employee){
        setUser("employee");
        setLoggedInUserDate(employee)
        localStorage.setItem("loggedInUser",JSON.stringify({ role: "employee" }))
      }
    } else {
      alert("invalid credentials");
    }
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : ''}
      {user == "admin" ? (
        <AdminDashboard></AdminDashboard>
      ) : (
        <EmployeeDashboard></EmployeeDashboard>
      )}
      {/* <AdminDashboard/> */}
      {/* <EmployeeDashboard/> */}
    </>
  );
}

export default App;
