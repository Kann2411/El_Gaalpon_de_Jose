'use client'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation';
import { getUsers, changeUserRole } from '@/lib/server/fetchUsers';
import { IUser } from '@/interfaces/interfaces';

export default function Users() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<IUser[]>([]); // Estado para almacenar los usuarios
    const [loading, setLoading] = useState(true); // Estado de carga

    // Función para obtener todos los usuarios
    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            const filteredUsers = data.filter(u => u.role === 'user'); // Filtrar usuarios con rol 'user'
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    }

    // Función para cambiar el rol de un usuario
    const handleChangeRole = async (id: string, newRole: 'user' | 'admin' | 'coach') => {
        try {
            await changeUserRole(id, newRole); // Cambiar rol
            // Eliminar usuario de la lista y actualizar estado
            setUsers(users.filter(user => user.id !== id)); // Elimina el usuario de la lista actual
            alert('Rol cambiado exitosamente');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error changing user role:', error.message);
                alert(`Error al cambiar el rol: ${error.message}`);
            } else {
                console.error('Error changing user role:', error);
                alert('Error desconocido al cambiar el rol');
            }
        }
    }

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchUsers();
        } else {
            router.push('/');
        }
    }, [user, router]);

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        <span>{u.name} - {u.email} - Rol: {u.role}</span>
                        <button onClick={() => handleChangeRole(u.id, 'coach')}>Cambiar a Coach</button>
                        <button onClick={() => handleChangeRole(u.id, 'admin')}>Cambiar a Admin</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
