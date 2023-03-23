export interface IPagination {
    page: number;
    itemsPerPage: number;
  }

export interface ISearch {
    searchTerm: string | undefined | null;
    pagination: IPagination;
}