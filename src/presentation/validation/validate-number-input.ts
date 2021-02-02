export class Validator {
  static isPositiveInteger(value: string): boolean {
    // regex expression
    // if you do not understand regex
    // go to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    return /^\d+$/.test(value);
  }
}
