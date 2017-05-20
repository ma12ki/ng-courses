import { CourseDeleteModalComponent } from './';

describe('CourseDeleteModalComponent', () => {
  let component: CourseDeleteModalComponent;
  let mockDialogRef;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('mockDialogRef', ['close']) as any;
  });

  beforeEach(() => {
    component = new CourseDeleteModalComponent(mockDialogRef);
  });

  describe('#confirm()', () => {
    it('closes dialog with TRUE', () => {
      const expected = true;

      component.confirm();

      expect(mockDialogRef.close).toHaveBeenCalledWith(expected);
    });
  });

  describe('#cancel()', () => {
    it('closes dialog with FALSE', () => {
      const expected = false;

      component.cancel();

      expect(mockDialogRef.close).toHaveBeenCalledWith(expected);
    });
  });
});
