import { State, initialState } from './courses.reducer';
import * as selectors from './courses.selectors';

describe('Courses selectors', () => {
  it('gets items', () => {
    const expected = [];
    const state: State = {
      ...initialState,
      items: expected,
    };

    const actual = selectors.getItems(state);

    expect(actual).toEqual(expected);
  });

  it('gets totalItems', () => {
    const expected = 111;
    const state: State = {
      ...initialState,
      totalItems: expected,
    };

    const actual = selectors.getTotalItems(state);

    expect(actual).toEqual(expected);
  });

  it('gets items per page', () => {
    const expected = 222;
    const state: State = {
      ...initialState,
      itemsPerPage: expected,
    };

    const actual = selectors.getItemsPerPage(state);

    expect(actual).toEqual(expected);
  });

  it('gets offset', () => {
    const expected = 333;
    const state: State = {
      ...initialState,
      offset: expected,
    };

    const actual = selectors.getOffset(state);

    expect(actual).toEqual(expected);
  });

  it('gets search term', () => {
    const expected = 'meaning of life';
    const state: State = {
      ...initialState,
      searchTerm: expected,
    };

    const actual = selectors.getSearchTerm(state);

    expect(actual).toEqual(expected);
  });

  it('gets error', () => {
    const expected = '404';
    const state: State = {
      ...initialState,
      error: expected,
    };

    const actual = selectors.getError(state);

    expect(actual).toEqual(expected);
  });

  it('gets loading', () => {
    const expected = true;
    const state: State = {
      ...initialState,
      loading: expected,
    };

    const actual = selectors.isLoading(state);

    expect(actual).toEqual(expected);
  });

  it('gets course to edit', () => {
    const expected = {} as any;
    const state: State = {
      ...initialState,
      courseToEdit: expected,
    };

    const actual = selectors.getCourseToEdit(state);

    expect(actual).toEqual(expected);
  });
});
