const useRole = () => {
  const { role, loading } = useAuth();

  return {
    role,
    loading,
    isAdmin: role === "admin",
    isModerator: role === "moderator",
    isUser: role === "user",
  };
};

export default useRole;
