import fetchData from './fetchData';
import { Users } from '../hooks/useUserData';

interface UserLoginToRegister {
  email: string;
  repeatPassword: string;
}

interface UserProfileToRegister {
  name: string;
  surname: string;
}

export type UserToRegister = UserLoginToRegister & UserProfileToRegister;

async function getLastUserId(): Promise<Users[]> {
  const path = `users?_sort=-id&_limit=1`;
  const user = await fetchData(path);
  return user;
}

async function getNextUserId(): Promise<number> {
  const [user] = await getLastUserId();
  return +user.id + 1;
}

async function addUserToLoginEndpoint(
  { email, repeatPassword }: UserLoginToRegister,
  userId: number
) {
  const user = {
    userId,
    userName: '',
    password: repeatPassword,
    email,
  };

  const path = 'http://localhost:3002/usersLoginInfo';

  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

async function addUserToUserEndpoint({ name, surname }: UserProfileToRegister, userId: number) {
  const balance = 0.0;

  const user = {
    id: userId.toString(),
    name,
    surname,
    balance,
    img: '',
    orders: [],
    orderHistory: [],
  };

  const path = 'http://localhost:3002/users';

  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export default async function registerUser(formData: UserToRegister) {
  const userId = await getNextUserId();
  await addUserToLoginEndpoint(formData, userId);
  await addUserToUserEndpoint(formData, userId);
}
