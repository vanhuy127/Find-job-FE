import React, { type PropsWithChildren } from 'react';

import { useOutlet } from 'react-router-dom';

export const AuthLayout: React.FC<PropsWithChildren> = () => {
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-lg">{outlet}</div>
    </div>
  );
};
