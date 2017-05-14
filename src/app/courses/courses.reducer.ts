import { ICourse } from './shared/course.entity';
import * as courses from './courses.actions';

export interface State {
  loading: boolean;
  items: ICourse[];
  totalItems: number;
  itemsPerPage: number;
  offset: number;
  searchTerm: string;
  error: any;
};

export const initialState: State = {
  loading: false,
  items: [],
  totalItems: 0,
  itemsPerPage: 5,
  offset: 0,
  searchTerm: '',
  error: null,
};

export function reducer(state = initialState, action: courses.Actions): State {
  switch (action.type) {
    case courses.LOAD_START: {
      const { itemsPerPage, offset, searchTerm } = action.payload;

      return {
        ...state,
        loading: true,
        error: null,
        itemsPerPage,
        offset,
        searchTerm,
      };
    }
    case courses.REMOVE_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case courses.LOAD_SUCCESS: {
      const { items, totalItems } = action.payload;

      return {
        ...state,
        loading: false,
        items,
        totalItems,
        error: null,
      };
    }
    case courses.REMOVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case courses.LOAD_ERROR:
    case courses.REMOVE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
