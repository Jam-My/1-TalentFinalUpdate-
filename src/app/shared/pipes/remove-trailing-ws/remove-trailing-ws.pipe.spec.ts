import { RemoveTrailingWsPipe } from './remove-trailing-ws.pipe';

describe('RemoveTrailingWsPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveTrailingWsPipe();
    expect(pipe).toBeTruthy();
  });
});
