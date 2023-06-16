interface RegisterIprops {
  login: string;
  email: string;
  password: string;
}
const register = async ({login, email, password}: RegisterIprops) => {
  const response = await fetch(
    'https://service.ssm.devcontour.ru/api/auth/local/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    const {error} = await response.json();
    throw new Error(error);
  }
};
export default register;
