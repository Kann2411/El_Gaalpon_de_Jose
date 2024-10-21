'use client';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation';
import { getUsers, changeUserRole } from '@/lib/server/fetchUsers';
import { IUser } from '@/interfaces/interfaces';

export default function Admins() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmins = async () => {
        try {
            const data = await getUsers();
            const filteredAdmins = data.filter(u => u.role === 'admin');
            setUsers(filteredAdmins);
        } catch (error) {
            console.error('Error fetching admins:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleChangeRole = async (id: string, newRole: 'user' | 'admin' | 'coach') => {
        try {
            await changeUserRole(id, newRole);
            setUsers(users.filter(u => u.id !== id));
            alert('Rol cambiado exitosamente');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error changing admin role:', error.message);
                alert(`Error al cambiar el rol: ${error.message}`);
            } else {
                console.error('Error changing admin role:', error);
                alert('Error desconocido al cambiar el rol');
            }
        }
    }

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchAdmins();
        } else {
            router.push('/');
        }
    }, [user, router]);

    if (loading) return <p className="text-white">Loading admins...</p>;

    return (
        <div className="bg-black text-white min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Admins</h1>
            <ul className="space-y-4">
                {users.map(u => (
                    <li key={u.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg shadow-lg  transition duration-300">
                        <span>{u.name} - {u.email} - Rol: {u.role}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleChangeRole(u.id, 'user')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-red-500"
                            >
                                Change to User
                            </button>
                            <button
                                onClick={() => handleChangeRole(u.id, 'coach')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-red-500"
                            >
                                Change to Coach
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
