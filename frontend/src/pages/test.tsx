import { useEffect } from "react"
import { useQuery } from '@tanstack/react-query';
import { queryClient } from "@/api/queryClient";
import { meFetch } from "@/api/User";


export default function Test() {
    const userListQuery = useQuery({
        queryFn: () => meFetch(),
        queryKey: ["users"]
    }, queryClient);

    useEffect(() => {
        meFetch();
    }, []);

    switch(userListQuery.status) {
        case ('pending'): return 'Loading...'
        case('error'): return userListQuery.error.message
        case('success'): return 'OK'
    }
}