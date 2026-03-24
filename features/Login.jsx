export default function Login() {
  return (
    <>
      <section className="form-container">
        <div>
          <h1>filmflow.</h1>
          <h2>Login</h2>
          <p>Don't have an account? Sign Up</p>
          <form>
            <label htmlFor="email">
              Email:
              <input id="email" type="email" name="email" required />
            </label>
            <label htmlFor="password">
              Password:
              <input id="password" type="password" name="password" required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
