export type Styles = {
  "autosized-wrapper": string;
  container: string;
  "container--errors": string;
  "container--focused": string;
  "delete-button__close-icon": string;
  token: string;
  "token__delete-button": string;
  "token__label-wrapper": string;
  "token--active": string;
  "token--editable": string;
  "token--error": string;
  "token--read-only": string;
  "token-list": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
