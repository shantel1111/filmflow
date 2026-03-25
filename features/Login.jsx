import "../styles/login.css";

export default function Login({ setLogin }) {
  return (
    <>
      <section className="form-container">
        <div>
          <h1>filmflow.</h1>

          <form>
            <label htmlFor="email">
              email:
              <input id="email" type="email" name="email" required />
            </label>
            <label htmlFor="password">
              pswrd:
              <input id="password" type="password" name="password" required />
            </label>
            <button
              type="submit"
              onClick={() => {
                setLogin(true);
              }}
            >
              submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
