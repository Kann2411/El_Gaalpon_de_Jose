'use client'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation';
import { getUsers, changeUserRole } from '@/lib/server/fetchUsers';
import { IUser } from '@/interfaces/interfaces';

export default function Admins() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<IUser[]>([]); // Estado para almacenar los usuarios
    const [loading, setLoading] = useState(true); // Estado de carga

    // Función para obtener todos los usuarios
    const fetchAdmins = async () => {
        try {
            const data = await getUsers();
            const filteredAdmins = data.filter(u => u.role === 'admin'); // Filtrar usuarios con rol 'admin'
            setUsers(filteredAdmins);
        } catch (error) {
            console.error('Error fetching admins:', error);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    }

    // Función para cambiar el rol de un usuario
    const handleChangeRole = async (id: string, newRole: 'user' | 'admin' | 'coach') => {
        try {
            await changeUserRole(id, newRole); // Cambiar rol
            // Eliminar usuario de la lista y actualizar estado
            setUsers(users.filter(u => u.id !== id)); // Elimina el usuario de la lista actual
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

    if (loading) return <p>Loading admins...</p>;

    return (
        <div>
            <h1>Admins</h1>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        <span>{u.name} - {u.email} - Rol: {u.role}</span>
                        <button onClick={() => handleChangeRole(u.id, 'user')}>Cambiar a User</button>
                        <button onClick={() => handleChangeRole(u.id, 'coach')}>Cambiar a Coach</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
