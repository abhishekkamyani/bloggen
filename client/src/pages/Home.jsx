import Posts from '../components/Posts'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { Paginator } from 'primereact/paginator';
import "primereact/resources/themes/nova/theme.css";
import { useLocation } from "react-router-dom";



export default function Home() {
    const location = useLocation();
    // const queryParams = new URLSearchParams(location.search)
    // const page = queryParams.get('page');
    // const pageSize = queryParams.get('pageSize');

    // console.log(page, pageSize);

    const [fetchedData, setFetchedData] = useState({
        posts: [],
        totalItems: 0,
        totalPages: 0
    });

    const [paginationData, setPaginationData] = useState({page: 1, pageSize: 5});


    useEffect(() => {
        let ignore = false;

        axios.get(`${SERVER_URL}/api/post/all?pageSize=${paginationData.pageSize}&page=${paginationData.page}`)
            .then(response => {
                if (response.status === 200 && !ignore) {
                    console.log(response.data);
                    setFetchedData(response.data);
                }
            })
            .catch(e => {
                console.log(e);
                console.log(e.response?.data?.error);
            });

        return () => {
            ignore = true;
        }
    }, [paginationData.page, paginationData.pageSize])

    const onPageChange = (event) => {
        setPaginationData({ page: event.page + 1, pageSize: event.rows })
    };
    return (
        <div className='py-5'>
            <div className='d-flex lg:w-1/2 ms-auto'>
                {/* <Paginator className='bg-white text-black dark:bg-dark-main dark:text-main' first={first} totalPages={fetchedData.totalPages} totalRecords={fetchedData.totalItems} rowsPerPageOptions={[5, 10, 20, 30, 40]} onPageChange={onPageChange} /> */}
                <Paginator
                    className='bg-white text-black dark:bg-dark-main dark:text-main'
                    first={paginationData.page * paginationData.pageSize - paginationData.pageSize}
                    rows={paginationData.pageSize}
                    totalRecords={fetchedData.totalItems}
                    rowsPerPageOptions={[5, 10, 20, 30, 40]}
                    onPageChange={onPageChange} />
            </div>
            <Posts posts={fetchedData.posts} />
        </div>
    )
}