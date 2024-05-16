import { ConcatenateNamePipe } from './concatenate-name.pipe';

describe('ConcatenateNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ConcatenateNamePipe();
    expect(pipe).toBeTruthy();
  });
});
