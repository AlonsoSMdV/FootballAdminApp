import { PasswordTogglePipe } from '../password-toggle/password-toggle.pipe';

describe('PasswordTogglePipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordTogglePipe();
    expect(pipe).toBeTruthy();
  });
});
