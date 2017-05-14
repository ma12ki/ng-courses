import { State } from './courses.reducer';

export const getItems = (state: State) => state.items;
export const getTotalItems = (state: State) => state.totalItems;
export const getItemsPerPage = (state: State) => state.itemsPerPage;
export const getOffset = (state: State) => state.offset;
export const getSearchTerm = (state: State) => state.searchTerm;
export const getError = (state: State) => state.error;
export const isLoading = (state: State) => state.loading;
