import { OrderByPipe } from './order-by.pipe';


describe('order-by pipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('sorts items by given attr', () => {
    const items = [
      { a: 5, b: 4 },
      { a: 1, b: 2 },
      { a: 3, b: 6 },
    ];
    const expected = [
      { a: 1, b: 2 },
      { a: 3, b: 6 },
      { a: 5, b: 4 },
    ];

    const actual = pipe.transform(items, 'a');

    expect(actual).toEqual(expected);
  });
});
