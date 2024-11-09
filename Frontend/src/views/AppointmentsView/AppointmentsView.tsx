'use client';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/context/user';
import { ReservedClasses } from '@/components/ReservedClases/ReservedClases';
import NoDataMessage from '@/components/NoDataMessage/NoDataMessage';
import { useRouter } from 'next/navigation';

const AppointmentsView: React.FC = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push('/');
    }
  }, [userId, router]);

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <ReservedClasses userId={userId} />
    </div>
  );
};

export default AppointmentsView;
