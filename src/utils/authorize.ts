import { useAuthStore } from '@/store';
import { Role } from '@/types';

export const isRole = (role: Role) => {
  const { user } = useAuthStore();
  if (!user) return false;

  return user?.role === role;
};
