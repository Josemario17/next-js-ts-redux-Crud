import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { database } from '@/Services/Firebase';

interface ModalState {
  createModal: boolean;
  editModal: boolean;
  confirmModal: boolean;
  formData: {
    name: string;
    email: string;
    cargo: string;
  } | null;
}

const initialState: ModalState = {
  createModal: false,
  editModal: false,
  confirmModal: false,
  formData: null,
};


function gravar(formData: { name: string; email: string; cargo: string }) {
  const ref = database.ref('usuarios');
  ref.push(formData); 
}

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
    updateFormData: (state, action: PayloadAction<{ name: string; email: string; cargo: string }>) => {
      state.formData = action.payload;
    },
    resetFormData(state) {
      state.formData = null; 
    },
    submitForm: (state) => {
      if (state.formData) {
        gravar(state.formData);  
        state.formData = null; 
      }
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
  updateFormData,
  submitForm, 
  resetFormData
} = modalSlice.actions;

export default modalSlice.reducer;
