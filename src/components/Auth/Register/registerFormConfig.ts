import { FormConfig } from '../interfaces';

const registerFormConfig: FormConfig[] = [
  { name: 'email', label: 'Your email', placeholder: 'Email', type: 'email', id: 'email' },
  { name: 'name', label: 'Your name', placeholder: 'Name', type: 'text', id: 'name' },
  {
    name: 'surname',
    label: 'Your surname',
    placeholder: 'Surname',
    type: 'text',
    id: 'surname',
  },
  {
    name: 'createPassword',
    label: 'Create password',
    placeholder: 'Create password',
    type: 'password',
    id: 'createPassword',
  },
  {
    name: 'repeatPassword',
    label: 'Repeat password',
    placeholder: 'Repeat password',
    type: 'password',
    id: 'repeatPassword',
  },
];

export default registerFormConfig;
