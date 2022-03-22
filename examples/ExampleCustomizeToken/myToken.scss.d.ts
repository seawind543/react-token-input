export type Styles = {
  'button-icon': string;
  'customize-token': string;
  'display-label': string;
  'edit-icon': string;
  error: string;
  input: string;
  message: string;
  pass: string;
  'status-icon': string;
  'token-body': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
