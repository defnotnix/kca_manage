"use client";

import React, { useEffect, useReducer } from "react";
//next

//mantine
import {} from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

//mantine
import { useDebouncedState } from "@mantine/hooks";
//icons

//styles

//components
import { autoSearch } from "@vframework/core";
//type
import { PropListHandler } from "./ListHandler.type";

//context
import { Context } from "./ListHandler.context";

// * Reducer

const initialState = {
  page: 1,
  pageSize: 20,
  totalPages: 0,
  //search
  selectedRecords: [],
  //filter
  filters: [],
  //tabs
  tabActive: 0,
};

function reducer(state: typeof initialState, action: any): any {
  switch (action.type) {
    case "SET_TOTAL_RECORDS":
      return {
        ...state,
        totalPages: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_PAGE_SIZE":
      return {
        ...state,
        pageSize: action.payload,
      };
    case "SET_PAGE_DATA":
      return {
        ...state,
        pageSize: action.payload.pageSize,
        page: action.payload.page,
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    case "SET_SELECTED_RECORDS":
      return {
        ...state,
        selectedRecords: action.payload,
      };

    case "SET_TAB_ACTIVE":
      return {
        ...state,
        tabActive: action.payload,
      };
    case "ADD_FILTER":
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        filters: state.filters.filter(
          (item: any) => item.accessor !== action.payload
        ),
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: [],
      };
    default:
      return state;
  }
}

export function ListHandler({
  endpoint = "",
  moduleKey = ["vframework", "default"],
  //api
  getRecords,
  getParams,
  dataKey,
  //server
  enableServerSearch = false,
  enableServerPagination = false,
  //
  children,
}: PropListHandler) {
  // * DEFINITIONS

  // * CONTEXT

  // * STATE

  const [state, dispatch] = useReducer(reducer, initialState);
  const { page, pageSize, selectedRecords, filters, totalPages } = state;

  const [searchVal, setSearchVal] = useDebouncedState(
    "",
    enableServerPagination ? 1000 : 300
  );

  // * FUNCTIONS

  const { data, isLoading, isLoadingError, refetch, isFetching } = useQuery({
    queryKey: moduleKey,
    queryFn: async () => {
      console.log("Initiating Get");
      const res: any = await getRecords({
        endpoint: endpoint,
        searchValue: searchVal,
        page: page,
        pageSize: pageSize,
        params: {
          ...(getParams || {}),
        },
      });
      console.log(res);
      const _data = enableServerSearch
        ? res.results
        : dataKey
          ? res?.[dataKey]
          : res;

      if (enableServerPagination) {
        dispatch({
          type: "SET_TOTAL_RECORDS",
          payload: res?.pagination?.total_pages || 1,
        });
      }

      if (!Array.isArray(_data)) {
        console.log("Warning: _data is not an array", _data);
        return [];
      }

      return _data;
    },
    initialData: [],
  });

  useEffect(() => {
    if (enableServerPagination) {
      refetch();
    }
  }, [searchVal]);

  const getSelectiveData = (records: any) => {
    try {
      if (enableServerSearch) {
        // if (searchVal.length > 0) {
        //   await handleServerSearch();
        // }
        if (enableServerPagination) {
          return records;
        } else {
          return records.slice(page - 1 * pageSize, page * pageSize);
        }
      } else {
        return autoSearch(records, searchVal).slice(
          (page - 1) * pageSize,
          page * pageSize
        );
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // * COMPONENTS

  // * ANIMATIONS

  return (
    <>
      <Context.Provider
        value={{
          state,
          dispatch,
          //table
          data: getSelectiveData(data),
          isLoading,
          isFetching,
          refetch,
          isLoadingError,
          //search
          searchVal,
          setSearchVal,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}
