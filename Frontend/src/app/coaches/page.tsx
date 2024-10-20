'use client'
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
    }

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
    }

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchCoaches();
        } else {
            router.push('/');
        }
    }, [user, router]);

    if (loading) return <p>Cargando coaches...</p>;

    return (
        <div>
            <h1>Coaches</h1>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        <span>{u.name} - {u.email} - Rol: {u.role}</span>
                        <button onClick={() => handleChangeRole(u.id, 'user')}>Cambiar a User</button>
                        <button onClick={() => handleChangeRole(u.id, 'admin')}>Cambiar a Admin</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
