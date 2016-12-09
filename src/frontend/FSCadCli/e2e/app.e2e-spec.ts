import { FSCadCliPage } from './app.po';

describe('fscad-cli App', function() {
  let page: FSCadCliPage;

  beforeEach(() => {
    page = new FSCadCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
