import { useState, useCallback } from "react";

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Hook for managing pagination
 */
export function usePagination(initialPageSize: number = 10) {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const setTotal = useCallback((total: number) => {
    setState((prev) => ({
      ...prev,
      total,
      totalPages: Math.ceil(total / prev.pageSize),
    }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setState((prev) => {
      const newPage = Math.max(1, Math.min(page, prev.totalPages || 1));
      return { ...prev, page: newPage };
    });
  }, []);

  const nextPage = useCallback(() => {
    setState((prev) => {
      if (prev.page < prev.totalPages) {
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  }, []);

  const prevPage = useCallback(() => {
    setState((prev) => {
      if (prev.page > 1) {
        return { ...prev, page: prev.page - 1 };
      }
      return prev;
    });
  }, []);

  const changePageSize = useCallback((size: number) => {
    setState((prev) => ({
      ...prev,
      pageSize: size,
      page: 1,
      totalPages: Math.ceil(prev.total / size),
    }));
  }, []);

  const getOffset = useCallback(() => {
    return (state.page - 1) * state.pageSize;
  }, [state.page, state.pageSize]);

  return {
    ...state,
    setTotal,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    getOffset,
    hasNextPage: state.page < state.totalPages,
    hasPrevPage: state.page > 1,
  };
}
