import { AngularBeePage } from './app.po';

describe('angular-bee App', () => {
  let page: AngularBeePage;

  beforeEach(() => {
    page = new AngularBeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
