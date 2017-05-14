import { ICourse } from './shared/course.entity';
import * as courses from './courses.actions';

export interface State {
  loading: boolean;
  items: ICourse[];
  totalItems: number;
  itemsPerPage: number;
  offset: number;
  searchTerm: string;
  courseToEdit: ICourse | {};
  error: any;
};

export const initialState: State = {
  loading: false,
  items: [],
  totalItems: 0,
  itemsPerPage: 5,
  offset: 0,
  searchTerm: '',
  courseToEdit: {},
  error: null,
};

export function reducer(state = initialState, action: courses.Actions): State {
  switch (action.type) {
    case courses.LOAD_START: {
      const { itemsPerPage, offset, searchTerm } = (action as courses.LoadStartAction).payload;

      return {
        ...state,
        loading: true,
        error: null,
        itemsPerPage,
        offset,
        searchTerm,
      };
    }
    case courses.LOAD_ONE_START:
    case courses.SAVE_START:
    case courses.REMOVE_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case courses.LOAD_SUCCESS: {
      const { items, totalItems } = (action as courses.LoadSuccessAction).payload;

      return {
        ...state,
        loading: false,
        items,
        totalItems,
        error: null,
      };
    }
    case courses.LOAD_ONE_SUCCESS: {
      return {
        ...state,
        courseToEdit: (action as courses.LoadOneSuccessAction).payload,
      };
    }
    case courses.SAVE_SUCCESS:
    case courses.REMOVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case courses.LOAD_ERROR:
    case courses.LOAD_ONE_ERROR:
    case courses.REMOVE_ERROR: {
      return {
        ...state,
        loading: false,
        error: (action as courses.LoadErrorAction).payload,
      };
    }
    default: {
      return state;
    }
  }
}
