import "../styles/login.css";
import React from "react";

export default function Login({ setLogin }) {
  const [isSignUp, setSignUp] = React.useState(false);
  return (
    <>
      <section className="form-container">
        <div>
          <form>
            <h1>filmflow.</h1>
            <h2>{isSignUp ? "Join today!" : "Happy to have you back!"}</h2>
            <p className="hook-text">
              Picking movies has never been more easier than now. Free forever.
            </p>
            <label htmlFor="email">
              Your Email:
              <input id="email" type="email" name="email" required />
            </label>
            <label htmlFor="password">
              Password:
              <input id="password" type="password" name="password" required />
            </label>
            {isSignUp && (
              <label htmlFor="confirm-password">
                Confirm password:
                <input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  required
                />
              </label>
            )}
            <button
              className="submit-btn"
              type="submit"
              onClick={() => {
                setLogin(true);
              }}
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
            <p className="membership-text">
              {isSignUp ? "Already have an account? " : "Not a member yet? "}
              <button
                className="account-btn"
                onClick={() => {
                  setSignUp((prevVal) => !prevVal);
                }}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
