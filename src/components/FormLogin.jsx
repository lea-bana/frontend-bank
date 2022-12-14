import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ApiCalls from "../services/Api";
import { logIn } from "../utils/reducers";
import getLocalStorage from "../storage/storage";

export default function FormLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (userName.trim().length === 0 && password.length === 0) {
      return setError("Please fill in the username and password field. ");
    }

    if (userName.trim().length < 3) {
      return setError("Username must be longer than 3 characters");
    }

    if (password.length < 3) {
      return setError("Password must be longer than 3 characters");
    }

    const response = await new ApiCalls().userLogIn(
      userName,
      password,
      rememberMe
    );
    if (response.status !== 200) {
      return setError("The username and/or password is wrong");
    }

    if (rememberMe) {
      localStorage.setItem(
        "rememberData",
        JSON.stringify({ rememberMe, userName, password })
      );
    }

    const rememberCheckBox = document.getElementById("remember-me");

    if (!rememberCheckBox.checked) {
      localStorage.clear();
    }

    dispatch(logIn(response.data.body.token));
    navigate("/user");
  };

  useEffect(() => {
    let loginData = getLocalStorage("rememberData", false);
    // console.log(loginData);
    if (loginData) {
      // console.log(loginData.rememberMe);
      setRememberMe(loginData.rememberMe);
      setUserName(loginData.userName);
      setPassword(loginData.password);
      // console.log(rememberMe);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={userName}
          autoComplete="current-username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          defaultChecked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
      <p className="error-message">{error}</p>
    </form>
  );
}
