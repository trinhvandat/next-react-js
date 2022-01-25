import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { Account, ACCOUNTS_LOCALSTORAGE_KEY } from "../../HomePage";

function UpdateAccount ({account}) {
    const router = useRouter();

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Account>();

    const listAccountsInLocalStorage = () => {
        const accountJsons = localStorage.getItem(ACCOUNTS_LOCALSTORAGE_KEY);
        return accountJsons == null ? [] : JSON.parse(accountJsons);
    }

    const onSubmit: SubmitHandler<Account> = data => {
        const accounts = listAccountsInLocalStorage();

        let indexChanged;
        accounts.forEach((element, index) => {
            if(element.username === data.username){
                indexChanged = index;
            }
        });

        accounts[indexChanged] = data;

        console.log(accounts);
        

        localStorage.setItem(ACCOUNTS_LOCALSTORAGE_KEY, JSON.stringify(accounts))

        router.push("/accounts")
    }
    
    return (
        <div>
            <h1>update accounts</h1>
            <form onSubmit={handleSubmit(onSubmit)} id="registerForm">
            <table>
              <tr>
                <td>Username:</td>
                <td><input readOnly={true} defaultValue={account?.username} {...register("username")}/></td>
              </tr>
              <tr>
                <td>Name:</td>
                <td><input defaultValue={account?.name} {...register("name", {required: true})} /></td>
              </tr>
              <tr>
                {errors.name?.type === 'required' && <p>Username is required</p>}
              </tr>
              <tr>
                <td>Email:</td>
                <td><input defaultValue={account?.email} {...register("email", {required: true})}/></td>
              </tr>
              <tr>
                {errors.email?.type === 'required' && <p>Username is required</p>}
              </tr>
              <tr>
                <td>Address:</td>
                <td><input defaultValue={account?.address} {...register("address", {required: true})} /></td>
              </tr><tr>
                {errors.address?.type === 'required' && <p>Username is required</p>}
              </tr>
              <tr>
                  <td>Company:</td>
                  <td><input defaultValue={account?.company} {...register("company")} /></td>
              </tr>
              <tr>
                  <input type="submit" />
              </tr>
            </table>
          </form>
        </div>
    );
}

UpdateAccount.getInitialProps = async({query}) => {
    const {username} = query; 
    const accountJsons = localStorage.getItem(ACCOUNTS_LOCALSTORAGE_KEY);
    const accounts = accountJsons == null ? [] : JSON.parse(accountJsons);
    const account = accounts.find((item) => item.username===username);
    return { account: account}
}

export default UpdateAccount;