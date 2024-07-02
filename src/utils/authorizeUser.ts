import fetchData from './fetchData';

export interface UserToLogIn {
  userId: string;
  userName?: string;
  password: string;
  email: string;
}

const retrieveUser = async (userId: string): Promise<UserToLogIn | undefined> => {
  const path = `usersLoginInfo?userId=${userId}`;
  const [loggedInUser] = await fetchData(path);
  return loggedInUser;
};

const initializeUser = async (): Promise<UserToLogIn | undefined> => {
  const id = localStorage.getItem('SignedInUserId');

  if (!id) {
    return undefined;
  }

  return retrieveUser(id);
};

let user: UserToLogIn | undefined = await initializeUser();

export const getUser = () => user;

export const login = async (email: string, password: string): Promise<boolean> => {
  // Should be done through POST request, but leaving this to imitate login.
  const path = `usersLoginInfo?${new URLSearchParams({ email, password })}`;
  const [loggedInUser] = await fetchData(path);

  if (loggedInUser) {
    localStorage.setItem('SignedInUserId', loggedInUser.userId);
    user = loggedInUser;
    return true;
  }

  return false;
};

export const logout = (): void => {
  localStorage.removeItem('SignedInUserId');
  user = undefined;
};
