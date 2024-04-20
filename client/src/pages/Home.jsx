import Posts from '../components/Posts'
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import CategoriesNavbar from '../components/CategoriesNavbar';

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;
    const pageSize = parseInt(queryParams.get('pageSize')) || 10;
    console.log(page);
    const navigate = useNavigate();

    const paginatorRef = useRef(null);

    const [fetchedData, setFetchedData] = useState({
        posts: [],
        totalItems: 0,
        totalPages: 0
    });

    // const [paginationData, setPaginationData] = useState({ page: 1, pageSize: 5 });
    useEffect(() => {
        let ignore = false;

        axios.get(`${SERVER_URL}/api/post/all?pageSize=${pageSize}&page=${page}`)
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
    }, [page, pageSize])

    const onPageChange = (event) => {
        navigate(`?page=${event.page + 1}&pageSize=${event.rows}`);
    };


    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        PrevPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple />
                </button>
            );
        },
        NextPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple />
                </button>
            );
        },
        PageLinks: (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });
                return (
                    <span className={className} style={{ userSelect: 'none' }}>
                        ...
                    </span>
                );
            }
            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            );
        },
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 30, value: 30 },
                // { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        CurrentPageReport: (options) => {
            return (
                <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    {/* Go to <InputText size="2" className="ml-1" value={page} tooltip={pageInputTooltip} onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange} /> */}
                </span>
            );
        }
    }

    return (
        <div className='py-5' >
            <div className='d-flex w-full'>
                <CategoriesNavbar />
                {/* <Paginator className='bg-white text-black dark:bg-dark-main dark:text-main' first={first} totalPages={fetchedData.totalPages} totalRecords={fetchedData.totalItems} rowsPerPageOptions={[5, 10, 20, 30, 40]} onPageChange={onPageChange} /> */}
                <Paginator
                    ref={paginatorRef}
                    className='justify-end px-0 pr-1 text-xs w-full bg-white text-black dark:bg-dark-main dark:text-main'
                    first={page * pageSize - pageSize}
                    rows={pageSize}
                    totalRecords={fetchedData.totalItems}
                    onPageChange={onPageChange}
                    template={template1}
                />
            </div>
            <Posts posts={fetchedData.posts} />
        </div >
    )
}