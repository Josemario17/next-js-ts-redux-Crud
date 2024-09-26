import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../Store/UserSlice';
import Navegation from './Navegation';
import LoaderTable from './LoaderTable';
import SearchBar from './SearchBar';
import AddButton from './AddButton';
import UserTable from './UserTable';
import { RootState } from '@/Store/store';
import { closeConfirmModal, closeCreateModal, closeEditModal, openCreateModal } from '@/Store/ModalSlice';
import { useGetUsersQuery } from '@/Store/UserApi';

export default function TableList() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <section className="bg-gray-900 p-3 sm:p-5 antialiased">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <AddButton text="Adicionar Usuario" typeButton='button' handleClick={() => { dispatch(openCreateModal()) }} />
                        </div>
                    </div>
                    <UserTable searchTerm={searchTerm} />
                    <Navegation />
                </div>
            </div>
        </section>
    );
}
