'use client';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation';
import { getUsers, changeUserRole } from '@/lib/server/fetchUsers';
import { IUser } from '@/interfaces/interfaces';

export default function Coaches() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCoaches = async () => {
        try {
            const data = await getUsers();
            const filteredCoaches = data.filter(u => u.role === 'coach');
            setUsers(filteredCoaches);
        } catch (error) {
            console.error('Error fetching coaches:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeRole = async (id: string, newRole: 'user' | 'admin' | 'coach') => {
        try {
            await changeUserRole(id, newRole);
            alert('Rol cambiado exitosamente');
            fetchCoaches(); // Vuelve a cargar la lista de coaches
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error changing coach role:', error.message);
                alert(`Error al cambiar el rol: ${error.message}`);
            } else {
                console.error('Error changing coach role:', error);
                alert('Error desconocido al cambiar el rol');
            }
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchCoaches();
        } else {
            router.push('/');
        }
    }, [user, router]);

    if (loading) return <p className="text-white">Cargando coaches...</p>;

    return (
        <div className="bg-black text-white min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Coaches</h1>
            <ul className="space-y-4">
                {users.map(u => (
                    <li key={u.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg shadow-lg transition duration-300">
                        <span>{u.name} - {u.email} - Rol: {u.role}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleChangeRole(u.id, 'user')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-red-500"
                            >
                                Cambiar a User
                            </button>
                            <button
                                onClick={() => handleChangeRole(u.id, 'admin')}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-red-500"
                            >
                                Cambiar a Admin
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
