import Posts from "../components/Posts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import CategoriesNavbar from "../components/CategoriesNavbar";
import { useUserInfo } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

// const initialFetched = {
//   posts: [],
//   totalItems: 0,
//   totalPages: 0,
// };
export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;
  const pageSize = parseInt(queryParams.get("pageSize")) || 10;
  const category = queryParams.get("category") || "";
  const { isAuthenticated } = useUserInfo();
  const navigate = useNavigate();
  const paginatorRef = useRef(null);

  const fetchPosts = async () => {
    toast.dismiss();
    const response = await axios.get(
      `${SERVER_URL}/api/post/all?pageSize=${pageSize}&page=${page}&category=${category}`
    );
    if (response.status === 200) {
      return response.data;
    }
  };

  const fetchedResult = useQuery({
    queryKey: ["posts", page, pageSize, category],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });


  // const [paginationData, setPaginationData] = useState({ page: 1, pageSize: 5 });
  useEffect(() => {
    window.scrollTo({ top: 0 });
    toast.dismiss();
    if (fetchedResult.error) {
      toast.error("Posts not found");
    }
  }, [page, pageSize, category, fetchedResult.error]);



  const onPageChange = (event) => {
    navigate(
      `?page=${event.page + 1}&pageSize=${event.rows}&category=${category}`
    );
  };

  const template1 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round")}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });
        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
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

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          {/* Go to <InputText size="2" className="ml-1" value={page} tooltip={pageInputTooltip} onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange} /> */}
        </span>
      );
    },
  };

  return (
    <div className="pb-5">
      <div className="d-flex w-full mb-10">
        {isAuthenticated && (
          <CategoriesNavbar
            page={page}
            pageSize={pageSize}
            selectedCategory={category}
          />
        )}
        <Paginator
          ref={paginatorRef}
          className="justify-end theme-switch-transition px-0 pr-1 text-xs w-full bg-inherit text-black dark:text-main"
          first={page * pageSize - pageSize}
          rows={pageSize}
          totalRecords={fetchedResult.data?.totalItems}
          onPageChange={onPageChange}
          template={template1}
        />
      </div>
      <Posts posts={fetchedResult.data?.posts} isFetched={!fetchedResult.isLoading} />

      {fetchedResult.data?.totalItems > 0 && (
        <Paginator
          ref={paginatorRef}
          className="justify-end mt-10 theme-switch-transition px-0 pr-1 text-xs w-full bg-inherit text-black dark:text-main"
          first={page * pageSize - pageSize}
          rows={pageSize}
          totalRecords={fetchedResult.data?.totalItems}
          onPageChange={onPageChange}
          template={template1}
        />
      )}
    </div>
  );
}
