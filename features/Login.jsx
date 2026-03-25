import "../styles/login.css";
import React from "react";

export default function Login({ setLogin }) {
  const [isSignUp, setSignUp] = React.useState(false);
  return (
    <>
      <section className="form-container">
        <div>
          <h1>filmflow.</h1>
          <h2>{isSignUp ? "SIGN UP" : "LOGIN"}</h2>
          <form>
            <label htmlFor="email">
              email:
              <input id="email" type="email" name="email" required />
            </label>
            <label htmlFor="password">
              pswrd:
              <input id="password" type="password" name="password" required />
            </label>
            {isSignUp && (
              <label htmlFor="confirm-password">
                confirm pswrd:
                <input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  required
                />
              </label>
            )}
            <button
              type="submit"
              onClick={() => {
                setLogin(true);
              }}
            >
              submit
            </button>
          </form>
          <p>
            Not a member yet?{" "}
            <button
              onClick={() => {
                setSignUp((prevVal) => !prevVal);
              }}
            >
              {isSignUp ? "LOGIN" : "SIGN UP"}
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
