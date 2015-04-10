import Card from 'models/card'

describe('Card', function() {
  it('displays "-" for a empty estimate', function () {
    var card = new Card({ estimate: '' });
    expect(card.estimate).to.eq("-");
  });

  it('displays the value for a set estimate', function () {
    var card = new Card({ estimate: 1 });
    expect(card.estimate).to.eq(1);
  });

  it('displays a formatted date for created_at', function () {
    var date = Date.now()
      , card = new Card({ created_at: date });

    expect(card.created_at).to.eq(moment(date).format('DD/MM/YYYY'));
  });

  it('displays labels as a csv of label_name', function () {
    var card = new Card({ labels: [ { name: "Hello" }, { name: "Goodbey" } ] });

    expect(card.labels).to.eq('Hello, Goodbey');
  })
});