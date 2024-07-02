import { FormConfig } from '../interfaces';

const loginFormConfig: FormConfig[] = [
  { name: 'email', label: 'Email', placeholder: 'Email', type: 'Email', id: 'email' },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    id: 'password',
  },
];

export default loginFormConfig;
