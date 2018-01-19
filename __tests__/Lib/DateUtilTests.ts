import * as U from '../../App/Lib/DateUtils';
import * as T from '../../App/Types';

describe('renderTime', () => {
  it('should correctly render seconds < 60', () => {
    expect(U.renderTime(59)).toBe('59 s');
  });
  it('should correctly render seconds < 30', () => {
    expect(U.renderTime(29)).toBe('29 s');
  });
  it('should correctly render minutes and seconds', () => {
    expect(U.renderTime(60)).toBe('1:00');
    expect(U.renderTime(61)).toBe('1:01');
    expect(U.renderTime(90)).toBe('1:30');
    expect(U.renderTime(91)).toBe('1:31');
    expect(U.renderTime(120)).toBe('2:00');
    expect(U.renderTime(119)).toBe('1:59');
    expect(U.renderTime(600)).toBe('10:00');
  });
});
