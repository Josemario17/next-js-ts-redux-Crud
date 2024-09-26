import React, { useEffect, useMemo } from 'react';
import LoaderTable from './LoaderTable';
import UserRow from './UserRow';
import { RootState } from '@/Store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from '@/Store/UserApi';
import { setUsers } from '@/Store/UserSlice';

interface User {
    key: string;
    name: string;
    email: string;
    cargo: string;
}

interface UserTableProps {
    searchTerm: string;
}

const UserTable: React.FC<UserTableProps> = ({ searchTerm }) => {
        
    const dispatch = useDispatch();
    const initial = useSelector((state: RootState) => state.modal.initial)
    const step = useSelector((state: RootState) => state.modal.step)
    const { data: users = [], error, isLoading, refetch  } = useGetUsersQuery();
    const updateTable = useSelector((state: RootState) => state.modal.updateTable);
    const memoizedUpdateTable = useMemo(() => updateTable, [updateTable]);
    
    useEffect(() => {
        refetch();
    }, [updateTable, refetch]);
    
    useEffect(() => {
        if (users.length) {
            dispatch(setUsers(users));
        }
    }, [users, dispatch]);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cargo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <LoaderTable />;
    }

    if (filteredUsers.length === 0) {
        return <p className='w-full text-center'>Não há usuarios</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
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
                    {filteredUsers.slice(initial, step).map((usuario) => (
                        <UserRow key={usuario.key} usuario={usuario} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
