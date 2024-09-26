import { backStep, nextStep } from '@/Store/ModalSlice';
import { RootState } from '@/Store/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Navegation() {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users);
    const initial = useSelector((state: RootState) => state.modal.initial);
    const step = useSelector((state: RootState) => state.modal.step);

    return (
        <>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 space-x-4 gap-12 md:space-y-0 p-4">
                <span className="text-sm font-normal gap-2 flex text-gray-500 dark:text-gray-400">
                    Mostrando
                    <span className="font-semibold text-gray-900 dark:text-white">1-5</span>
                    de
                    <span className="font-semibold text-gray-900 dark:text-white">{users.length == 0 ? '-' : users.length}</span>
                </span>
                <div className="inline-flex items-stretch -space-x-px">
                    <button onClick={()=>{
                        initial != 0 ? dispatch(backStep()) : initial
                    }} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Anterior</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button  onClick={()=>{
                        step <= users.length ? dispatch(nextStep()) : step
                    }} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Avançar</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </nav>
        </>
    )
}
