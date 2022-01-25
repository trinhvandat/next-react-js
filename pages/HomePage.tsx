import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import path from 'path/posix';
import ListAccounts from './accounts';

export type Account = {
    username: string, 
    name: string, 
    email: string, 
    address: string,
    phone: string,
    company: string
  }

export const AccountContext = React.createContext();

export const ACCOUNTS_LOCALSTORAGE_KEY = 'accounts';

export default function HomePage() {

    const router = useRouter()

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const storageAccountsJson = localStorage.getItem(ACCOUNTS_LOCALSTORAGE_KEY);
        const initialAccounts = (storageAccountsJson != null) ? JSON.parse(storageAccountsJson) : [];
        setAccounts(initialAccounts);
    },[]);

    useEffect(() => {
        document.getElementById("registerForm").style.display="none";
    },[]);

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Account>();

    const onSubmit: SubmitHandler<Account> = data => {
        const arr = [
            ...accounts, data
        ]
        setAccounts(arr);
        localStorage.setItem(ACCOUNTS_LOCALSTORAGE_KEY, JSON.stringify(arr))

        router.push("/accounts")
    }

    const showRegisterForm = () => {
        document.getElementById("registerForm").style.display="block";
    }

    const isUniqueUsername = (username: string) => {
      const accountsByUsername = accounts.find((item) => {
        return item?.username === username;
      })
      return accountsByUsername === undefined;
    }

    return (
        <div>
          <button onClick={() => router.push('/users')}>
            Get list users
          </button>
          <br></br>
          <br></br>
    
          <button onClick={() => showRegisterForm()}>
            Register account
          </button>
          <form onSubmit={handleSubmit(onSubmit)} id="registerForm">
            <table>
              <tr>
                <td>Username:</td>
                <td><input defaultValue="" {...register("username", {required: true, maxLength:10, validate: isUniqueUsername})}/></td>
              </tr>
              <tr>
                {errors.username?.type === 'required' && <p>Username is required</p>}
                {errors.username?.type === 'maxLength' && <p>The characters of username must be less than 10.</p>}
                {errors.username?.type === 'validate' && <p>Username does exist</p>}
              </tr>
              <tr>
                <td>Name:</td>
                <td><input defaultValue="" {...register("name", {required: true})} /></td>
              </tr>
              <tr>
                {errors.name?.type === 'required' && <p>Username is required</p>}
              </tr>
              <tr>
                <td>Email:</td>
                <td><input defaultValue="" {...register("email", {required: true})}/></td>
              </tr>
              <tr>
                {errors.email?.type === 'required' && <p>Username is required</p>}
              </tr>
              <tr>
                <td>Address:</td>
                <td><input defaultValue="" {...register("address", {required: true})} /></td>
              </tr><tr>
                {errors.address?.type === 'required' && <p>Username is required</p>}
              </tr>
              <tr>
                  <td>Company:</td>
                  <td><input defaultValue="" {...register("company")} /></td>
              </tr>
              <tr>
                  <input type="submit" />
              </tr>
            </table>
          </form>
          <br></br>
          <br></br>
    
          <button onClick={() => router.push('/accounts')}>
            Get list accounts
          </button>
          <br></br>
          <br></br>
        </div>
    )
}