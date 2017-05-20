import { fakeAsync, tick } from '@angular/core/testing';
import { LoadStartAction, RemoveStartAction } from '../courses.actions';
import { Observable } from 'rxjs/Rx';
import { coursesSelectors, State } from '../../app.reducer';
import { CoursesComponent } from './courses.component';

const mockStoreValues = {
  courses$: new Observable<any[]>(),
  totalCourses$: new Observable<number>(),
  itemsPerPage$: new Observable<number>(),
  offset$: new Observable<number>(),
  searchTerm$: new Observable<string>(),
};

const mockStore: any = {
  select(selector) {
    switch (selector) {
      case coursesSelectors.getItems:
        return mockStoreValues.courses$;
      case coursesSelectors.getTotalItems:
        return mockStoreValues.totalCourses$;
      case coursesSelectors.getItemsPerPage:
        return mockStoreValues.itemsPerPage$;
      case coursesSelectors.getOffset:
        return mockStoreValues.offset$;
      case coursesSelectors.getSearchTerm:
        return mockStoreValues.searchTerm$;
      default:
        throw new Error(`Unexpected selector: ${selector}`);
    }
  }
};

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let mockRouter;
  let mockDialog;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']) as any;
    mockDialog = jasmine.createSpyObj('mockDialog', ['open']) as any;
    mockStore.dispatch = jasmine.createSpy('dispatch');
  });

  beforeEach(() => {
    component = new CoursesComponent(mockRouter, mockDialog, mockStore);
  });

  describe('constructor', () => {
    it('subscribes to proper parts of the store', () => {
      expect(component.courses$).toBe(mockStoreValues.courses$);
      expect(component.totalCourses$).toBe(mockStoreValues.totalCourses$);
      expect(component.itemsPerPage$).toBe(mockStoreValues.itemsPerPage$);
      expect(component.offset$).toBe(mockStoreValues.offset$);
      expect(component.searchTerm$).toBe(mockStoreValues.searchTerm$);
    });
  });

  describe('#ngOnInit()', () => {
    it('calls fetchCourses', () => {
      component.fetchCourses = jasmine.createSpy('fetchCourses');

      component.ngOnInit();

      expect(component.fetchCourses).toHaveBeenCalled();
    });
  });

  describe('#fetchCourses()', () => {
    it('dispatches courses load start action with default values', () => {
      const expected = new LoadStartAction({
        offset: 0,
        searchTerm: '',
        itemsPerPage: 5,
      });

      component.fetchCourses();

      expect(mockStore.dispatch).toHaveBeenCalledWith(expected);
    });

    it('dispatches courses load start action with supplied values', () => {
      const offset = 10;
      const searchTerm = 'my goddamn keys';
      const expected = new LoadStartAction({
        offset,
        searchTerm,
        itemsPerPage: 5,
      });

      component.fetchCourses(offset, searchTerm);

      expect(mockStore.dispatch).toHaveBeenCalledWith(expected);
    });
  });

  describe('#deleteCourse()', () => {
    describe('when dialog returns a TRUTHY value', () => {
      beforeEach(() => {
        mockDialog.open.and.returnValue({
          afterClosed() {
            return Observable.of(true);
          }
        });
      });

      it('dispatches course remove start action', fakeAsync(() => {
        const courseId = 6;
        const expected = new RemoveStartAction(courseId);

        component.deleteCourse(courseId);

        tick();

        expect(mockStore.dispatch).toHaveBeenCalledWith(expected);
      }));
    });

    describe('when dialog returns a FALSY value', () => {
      beforeEach(() => {
        mockDialog.open.and.returnValue({
          afterClosed() {
            return Observable.of(false);
          }
        });
      });

      it('does NOT dispatch course remove start action', fakeAsync(() => {
        component.deleteCourse(1);

        tick();

        expect(mockStore.dispatch).not.toHaveBeenCalled();
      }));
    });
  });

  describe('#editCourse()', () => {
    it('redirects to course edit page', () => {
      const courseId = 6;

      component.editCourse(courseId);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['courses', courseId]);
    });
  });

  describe('#onSearch()', () => {
    it('calls fetchCourses with supplied search term', () => {
      const searchTerm = 'grail';
      component.fetchCourses = jasmine.createSpy('fetchCourses');

      component.onSearch(searchTerm);

      expect(component.fetchCourses).toHaveBeenCalledWith(0, searchTerm);
    });
  });
});
