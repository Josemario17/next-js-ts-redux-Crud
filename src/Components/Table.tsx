import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openEditModal, openConfirmModal, updateFormData, AddUserInStage, closeConfirmModal, openCreateModal } from '../Store/ModalSlice';
import { setUsers } from '../Store/UserSlice';
import Navegation from './Navegation';
import LoaderTable from './LoaderTable';
import { RootState } from '@/Store/store';
import SearchBar from './SearchBar'; 
import AddButton from './AddButton';

interface User {
    key: string;
    name: string;
    email: string;
    cargo: string;
}

export default function TableList() {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const updateTable = useSelector((state: RootState) => state.modal.updateTable);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const response = await fetch('https://thirdheart-b1751-default-rtdb.firebaseio.com/usuarios.json');
                const data = await response.json();
                if (data) {
                    const usersArray = Object.values(data).map((user: any) => ({
                        key: user.key,
                        name: user.name,
                        email: user.email,
                        cargo: user.cargo,
                    }));
                    dispatch(setUsers(usersArray));
                } else {
                    dispatch(setUsers([])); 
                }
            } catch (error) {
                console.error('Erro:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [dispatch, updateTable, closeConfirmModal]);

    // Filter users based on search term
    const filteredUsers = users.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <><section className="bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <AddButton
                  text="Adicionar Usuario"
                  typeButton="button"
                  handleClick={() => { dispatch(openCreateModal()) }}
                ></AddButton>
              </div>
            </div>
            <div className="overflow-x-auto">
                {
                    loading ? <LoaderTable /> : 
                    <>
                    { filteredUsers.length === 0 ? <p className='w-full text-center'>Não há usuarios</p> :
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {["Nome", "Email", "Cargo"].map((item, index) => (
                                    <th key={index} scope="col" className="px-4 py-4">{item}</th>
                                ))}
                                <th scope="col" className="px-4 py-3">
                                    <span className="sr-only">Acções</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((usuario: User, index: number) => (
                                <tr key={index} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-3 text-white">{usuario.name}</td>
                                    <td className="px-4 py-3 text-white">{usuario.email}</td>
                                    <td scope="row" className="px-4 py-3 font-medium whitespace-nowrap text-white">{usuario.cargo}</td>
                                    <td className="px-4 py-3 flex items-center justify-end">
                                        <button
                                            onClick={() => {
                                                dispatch(updateFormData({
                                                    key: usuario.key,
                                                    name: usuario.name,
                                                    email: usuario.email,
                                                    cargo: usuario.cargo,
                                                }));
                                                dispatch(openEditModal());
                                            }}
                                            type="button"
                                            className="flex w-full items-center py-2 px-4 group duration-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 group-hover:scale-110 duration-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>{ 
                                                dispatch(AddUserInStage({ userKey: usuario.key}));
                                                dispatch(openConfirmModal())}}
                                            type="button"
                                            className="flex w-full items-center py-2 px-4 text-red-500 group duration-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 group-hover:scale-110 duration-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> }
                    </>
                }
            </div>
            <Navegation />
            </div>
          </div>
        </section>
        </>
    );
}
