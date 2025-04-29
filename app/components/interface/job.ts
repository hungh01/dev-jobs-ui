export type JobItem = {
    id: number;
    img: string;
    title: string;
    companyName: string;
    city: string;
    salary: string;
    exp: string;
    url: string;
};

export type JobValue = {
    keyword?: string;
    location?: string;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: JobItem[];
};
