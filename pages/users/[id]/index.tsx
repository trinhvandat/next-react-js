import { useRouter } from "next/router";
import useSWR from "swr";
import axios from 'axios';

export default function User() {
    const router = useRouter();
    const id  = router.query.id;

    const URL = `https://jsonplaceholder.typicode.com/users/${id}`;
    const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    const {data, error} = useSWR(URL, fetcher);
    
    const getAddress = (address) => {
        return `${address?.street}, ${address?.city}`;
    }

    return (
        <div>
            <button onClick={() => router.back()}>Back to list</button>
            <h2>Detail user information by ID: {id}</h2>
            <p>ID: {data?.id}</p>
            <p>Name: {data?.name}</p>
            <p>Username: {data?.username}</p>
            <p>Email: {data?.email}</p>
            <p>Address: {getAddress(data?.address)}</p>
            <p>Phone number: {data?.phone}</p>
            <p>Company: {data?.company.name}</p>
        </div>
    );
}