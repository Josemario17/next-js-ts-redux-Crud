import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  createModal: boolean;
  editModal: boolean;
  confirmModal: boolean;
}

const initialState: ModalState = {
  createModal: false,
  editModal: false,
  confirmModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.createModal = true;
    },
    closeCreateModal: (state) => {
      state.createModal = false;
    },
    openEditModal: (state) => {
      state.editModal = true;
    },
    closeEditModal: (state) => {
      state.editModal = false;
    },
    openConfirmModal: (state) => {
      state.confirmModal = true;
    },
    closeConfirmModal: (state) => {
      state.confirmModal = false;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  openConfirmModal,
  closeConfirmModal,
} = modalSlice.actions;

export default modalSlice.reducer;
