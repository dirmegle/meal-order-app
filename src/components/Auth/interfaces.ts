export interface FormConfig {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  id: string;
}

export interface FormErrors {
  [name: string]: string | undefined;
}

export interface FormData {
  [name: string]: string;
}
