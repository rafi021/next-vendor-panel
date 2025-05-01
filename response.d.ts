declare global {
  type ApiResponse<Data, Meta = null> = {
    success: boolean;
    status_code: number;
    message: string;
    data: Data;
    metadata?: Meta | null;
    errors?: string;
  };

  type PaginateType<Data> = {
    current_page: number;
    data: Data;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export {}; // Ensures this file is treated as a module
