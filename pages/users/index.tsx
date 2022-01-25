import axios from 'axios';
import { useRouter } from "next/router";
import useSWR from "swr";
import styles from  '../../styles/ListUsers.module.css'


export default function ListUsers() {
    const router = useRouter();

    const TIME_TO_REFRESH_PAGE = 5*60*60;

    const URL = `https://jsonplaceholder.typicode.com/users`;
    const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    const {data, error} = useSWR(URL, fetcher, {refreshInterval: TIME_TO_REFRESH_PAGE});
    
    const getAddress = (address) => {
        return `${address.street}, ${address.city}`;
    }

    return (
        <div>
            <button onClick={() => router.back()}>Back Home</button>
            <h2>List users screen</h2>
            <table className={styles.tblusers}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>Company</th>
                </tr>
                {data &&
                data.map((item) => (
                    <tr key={item.id}>
                        <td><a className={styles.detailLink} onClick={() => router.push(`/users/${item.id}`)}>{item.name}</a></td>
                        <td>{item.email}</td>
                        <td>{getAddress(item.address)}</td>
                        <td>{item.phone}</td>
                        <td>{item.company.name}</td>
                   </tr>
                ))}
            </table>
        </div>
    );
}