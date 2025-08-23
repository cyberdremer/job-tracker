import { Prisma } from "@prisma/client";

export interface PaginationOptions {
  limit: number;
  ownerid: number;
  cursor?: number;
  page?: number;
}

export interface PaginationParams {
  limit: number;
  page?: number;
  cursor?: number;
  mode: "cursor" | "offset";
}

export interface PaginatedResults<T> {
  data: T[];
  nextCursor?: string;
  totalCount: number;
}

export interface PaginationStrategyInterface<T> {
  paginate(
    modelDelegate: any,
    options: PaginationOptions
  ): Promise<PaginatedResults<T>>;
}
