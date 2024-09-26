import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCreateModal, closeEditModal, updateTable } from '@/Store/ModalSlice';
import { RootState } from '@/Store/store';
import Form from './Form';

interface ModalProps {
  modalType: 'create' | 'edit';
}

export default function Modal({ modalType }: ModalProps) {
  const dispatch = useDispatch();
  
  const isModalOpen = useSelector((state: RootState) => 
    modalType === 'create' ? state.modal.createModal : state.modal.editModal
  );

  if (!isModalOpen) return null;

  const closeModal = () => {
    if (modalType === 'create') {
      dispatch(closeCreateModal());
      dispatch(updateTable())
    } else if (modalType === 'edit') {
      dispatch(closeEditModal());
      dispatch(updateTable())
    }
  };

  const title = modalType === 'create' ? 'Adicionar' : 'Editar';

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bg-gray-700/50 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
      <div className="relative p-4 mx-auto w-full max-w-2xl max-h-full">
        <div className="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5 shadow-2xl border border-solid border-gray-600">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title} Usuario</h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <Form SectionName={title} />
        </div>
      </div>
    </div>
  );
}
