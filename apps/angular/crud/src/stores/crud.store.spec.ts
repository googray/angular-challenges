import { CrudStore } from './crud.store';

describe('CrudStore', () => {
  const componentStore = new CrudStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
