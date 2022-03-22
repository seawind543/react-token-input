export type Styles = {
  'example-test': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
