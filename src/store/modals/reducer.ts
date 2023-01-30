import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Modals, ModalsInitialState, ModalState } from 'types';

const initialState: ModalsInitialState = {
  modalState: {
    activeModal: Modals.init,
    txHash: '',
    open: false,
  },
};

export const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModal: (state: ModalsInitialState, action: PayloadAction<Partial<ModalState>>) => ({
      ...state,
      modalState: {
        ...state.modalState,
        ...action.payload,
      },
    }),

    closeModal: (state: ModalsInitialState) => ({
      ...state,
      modalState: {
        activeModal: Modals.init,
        txHash: '',
        open: false,
      },
    }),

    updateModal: (state: ModalsInitialState, action: PayloadAction<Modals>) => ({
      ...state,
      modalState: {
        ...state.modalState,
        activeModal: action.payload,
      },
    }),
  },
});

export const { setActiveModal, closeModal, updateModal } = modalsReducer.actions;

export default modalsReducer.reducer;
