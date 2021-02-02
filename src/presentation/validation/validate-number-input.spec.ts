import { Validator } from './validate-number-input';

describe('Validator.isPositiveInteger', () => {
  it('should return true if string contains one positive integer number', () => {
    expect(Validator.isPositiveInteger('140')).toBe(true);
  });

  it('should return false if string contains negative number', () => {
    expect(Validator.isPositiveInteger('-140')).toBe(false);
  });

  it('should return false if string contains float number', () => {
    expect(Validator.isPositiveInteger('1.40')).toBe(false);
  });

  it('should return false if string is empty', () => {
    expect(Validator.isPositiveInteger('')).toBe(false);
  });

  it('should return false if string is not one number', () => {
    expect(Validator.isPositiveInteger('ddd')).toBe(false);
  });
});
