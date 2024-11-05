'use client';
import React, { useContext} from 'react';
import { UserContext } from '@/context/user';
import { ReservedClasses } from '@/components/ReservedClases/ReservedClases';

const AppointmentsView: React.FC = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  return (
    <div className="p-4">
      {userId ? (
        <ReservedClasses userId={userId} />
      ) : (
        <p className="text-white">User id not found</p>
      )}
    </div>
  );
};

export default AppointmentsView;
