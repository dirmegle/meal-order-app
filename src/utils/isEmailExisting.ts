import fetchData from './fetchData';

export default async function isEmailExisting(email: string): Promise<boolean> {
  const path = `usersLoginInfo?${new URLSearchParams({ email })}`;
  try {
    const [existingUser] = await fetchData(path);

    if (existingUser) {
      return true;
    }
    return false;
  } catch {
    throw new Error();
  }
}
