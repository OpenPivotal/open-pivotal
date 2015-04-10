import Base from 'models/base'

describe('Base', function() {
  it('assigns properties from a provided hash', function () {
    var obj = new Base({ name: 'hello', surname: 'goodbey' });
    expect(obj.name).to.eq('hello');
    expect(obj.surname).to.eq('goodbey');
  });
});