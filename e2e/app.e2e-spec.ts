import { HazarhulenAngularPage } from './app.po';

describe('hazarhulen-angular App', function() {
  let page: HazarhulenAngularPage;

  beforeEach(() => {
    page = new HazarhulenAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
