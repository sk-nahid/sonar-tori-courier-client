import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"; // your secure axios instance
import useAuth from "./useAuth";   // your auth context
import Loading from "../components/shareComponents/Loading";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: role = null,
    isLoading: roleLoading,
    refetch
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      
      return res.data?.role || null;
    },
  });

  
  if (roleLoading || authLoading) {

    return <Loading></Loading>
  }
  
  return { role, authLoading  ,roleLoading, refetch };
};

export default useUserRole;
