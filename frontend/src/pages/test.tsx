import { usersFetch } from "@/api/User";
import { useEffect } from "react"
import { useQuery } from '@tanstack/react-query';
import { queryClient } from "@/api/queryClient";


export default function Test() {
    const userListQuery = useQuery({
        queryFn: () => usersFetch(),
        queryKey: ["users"]
    }, queryClient);

    useEffect(() => {
        usersFetch();
    }, []);

    switch(userListQuery.status) {
        case ('pending'): return 'Loading...'
        case('error'): return userListQuery.error.message
        case('success'): return 'OK'
    }
}