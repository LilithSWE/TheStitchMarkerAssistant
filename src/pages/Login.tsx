export const Login = () => {
  return (
    <>
      <h2>Welcome to The Stitch Marker Assistant</h2>
      <h3>Create new user</h3>
      <form>
        <input type="text" name="username" id="username" placeholder="Name" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input type="submit" value="submit" />
      </form>
      <p>OR</p>
      <h3>Log in</h3>
      <form>
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input type="submit" value="submit" />
      </form>
    </>
  );
};
