import { describe, it, expect, beforeEach } from 'vitest';

import { useFormStore } from '@/store';
import { countries } from '@/consts';
import { mockFormValue1, mockFormValue2 } from '@/__tests__/form-mock';

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({
      isDialogOpen: false,
      isHookForm: true,
      formValues: [],
      countries,
    });
  });

  it('should initialize with default values', () => {
    const state = useFormStore.getState();

    expect(state.isDialogOpen).toBe(false);
    expect(state.isHookForm).toBe(true);
    expect(state.formValues).toEqual([]);
    expect(state.countries).toBe(countries);
  });

  it('should open dialog with specified form type', () => {
    useFormStore.getState().openDialog(false);

    const state = useFormStore.getState();
    expect(state.isDialogOpen).toBe(true);
    expect(state.isHookForm).toBe(false);
  });

  it('should close dialog', () => {
    useFormStore.setState({ isDialogOpen: true });

    useFormStore.getState().closeDialog();

    expect(useFormStore.getState().isDialogOpen).toBe(false);
  });

  it('should add new form value to the beginning of the array', () => {
    useFormStore.getState().addFormValue(mockFormValue1);

    const state = useFormStore.getState();
    expect(state.formValues).toHaveLength(1);
    expect(state.formValues[0]).toEqual(mockFormValue1);
  });

  it('should maintain correct order when adding multiple form values', () => {
    useFormStore.getState().addFormValue(mockFormValue1);
    useFormStore.getState().addFormValue(mockFormValue2);

    const state = useFormStore.getState();
    expect(state.formValues).toHaveLength(2);
    expect(state.formValues[0]).toEqual(mockFormValue2);
    expect(state.formValues[1]).toEqual(mockFormValue1);
  });
});
