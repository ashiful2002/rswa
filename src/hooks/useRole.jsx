const useRole = () => {
  const { role, loading } = useAuth();

  return {
    role,
    loading,
    isSuperAdmin: role === "super_admin",
    isAdmin: role === "super_admin" || role === "admin",
    isModerator: role === "moderator",
    isUser: role === "donor" || role === "user",
  };
};

export default useRole;
