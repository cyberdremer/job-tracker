import { Prisma } from "@prisma/client";

export interface PaginationOptions<
  Select extends object | undefined = undefined,
  Include extends object | undefined = undefined
> {
  limit: number;
  ownerid: number;
  cursor?: number;
  page?: number;

  select?: Select;
  include?: Include;
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
  offset: number;
}

export interface PaginationStrategyInterface<T> {
  paginate<
    Select extends object | undefined = undefined,
    Include extends object | undefined = undefined
  >(
    modelDelegate: any,
    options: PaginationOptions<Select, Include>
  ): Promise<PaginatedResults<T>>;
}
