import { useRouter } from "next/router";
import { AccountContext, ACCOUNTS_LOCALSTORAGE_KEY } from "../HomePage";
import styles from '../../styles/ListAccounts.module.css';

function ListAccounts({accounts}) {

    const router = useRouter();

    const deleteAccount = (username: string) => {
        const result = confirm("Want to delete?");
        if (result) {
            const accountsAfterDelete = accounts.filter((element) => element.username !== username);
            console.log(accountsAfterDelete);
            localStorage.setItem(ACCOUNTS_LOCALSTORAGE_KEY, JSON.stringify(accountsAfterDelete));
            router.push('/accounts');
        }
    }

    return (
        <div>
            <button onClick={() => router.back()}>Back Home</button>
            <h2>List account screen</h2>
            <table className={styles.tblusers}>
                
                    <tr>
                        <td>Username</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Address</td>
                        <td>Phone number</td>
                        <td>Company</td>
                        <td>Action</td>
                    </tr>
                
                <tbody>
                    {accounts.map((item) => (
                        <tr key={item?.username}>
                            <td>{item?.username}</td>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td>{item?.address}</td>
                            <td>{item?.phone}</td>
                            <td>{item?.company}</td>
                            <td>
                                <a className={styles.detailLink} onClick={() => {router.push(`/accounts/${item?.username}/update`)}}>Edit</a> | 
                                <a className={styles.detailLink} onClick={() => deleteAccount(item?.username)}> Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ListAccounts.getInitialProps = async(ctx) => {
    const accountJsons = localStorage.getItem(ACCOUNTS_LOCALSTORAGE_KEY);
    const accounts = accountJsons == null ? [] : JSON.parse(accountJsons);
    return { accounts: accounts}
}

export default ListAccounts;