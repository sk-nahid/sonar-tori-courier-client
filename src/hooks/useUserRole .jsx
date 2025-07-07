import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"; // your secure axios instance
import useAuth from "./useAuth";   // your auth context
import Loading from "../components/shareComponents/Loading";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();

  const { data: role = null, isLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data?.role || null;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }
  return { role, isLoading, refetch };
};

export default useUserRole;
