import { JobEntry, Resume, ResumeJobFeedback } from "@prisma/client";
import {
  PaginationStrategyInterface,
  PaginatedResults,
  PaginationOptions,
} from "../interfaces/pagination";

export class OffsetPagination<T> implements PaginationStrategyInterface<T> {
  async paginate<
    Select extends object | undefined = undefined,
    Include extends object | undefined = undefined
  >(
    modelDelegate: any,
    options: PaginationOptions<Select, Include>
  ): Promise<PaginatedResults<T>> {
    const { page = 1, limit, ownerid, select, include } = options;
    const skip = (page - 1) * limit;
    const [queryResults, totalCount] = await Promise.all([
      modelDelegate.findMany({
        skip: skip,
        take: limit,
        select: select,
        include: include,
        where: {
          ownerid: ownerid,
        },
      }),
      modelDelegate.count({
        where: {
          ownerid: ownerid,
        },
      }),
    ]);

    const paginatedResults: PaginatedResults<T> = {
      data: queryResults,
      offset: totalCount,
    };

    return paginatedResults;
  }
}

export class CursorPagination<T> implements PaginationStrategyInterface<T> {
  private encodeCursor(cursor: number): string {
    return Buffer.from(JSON.stringify(cursor)).toString("base64");
  }

  async paginate<
    Select extends object | undefined = undefined,
    Include extends object | undefined = undefined
  >(
    modelDelegate: any,
    options: PaginationOptions<Select, Include>
  ): Promise<PaginatedResults<T>> {
    const { cursor, limit, ownerid, select, include } = options;

    const queryResults = await modelDelegate.findMany({
      take: limit,
      where: {
        ownerid: ownerid,
      },
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
      select: select,
      include: include,
    });

    const paginatedResults: PaginatedResults<T> = {
      data: queryResults,
      offset: queryResults.length,
      nextCursor:
        queryResults.length > 0
          ? this.encodeCursor(queryResults[queryResults.length - 1].id)
          : undefined,
    };

    return paginatedResults;
  }
}

export class PaginationContext<T> {
  private strategy: PaginationStrategyInterface<T>;

  constructor(strategy: PaginationStrategyInterface<T>) {
    this.strategy = strategy;
  }

  async paginate<
    Select extends object | undefined = undefined,
    Include extends object | undefined = undefined
  >(
    modelDelegate: any,
    options: PaginationOptions<Select, Include>
  ): Promise<PaginatedResults<T>> {
    return this.strategy.paginate(modelDelegate, options);
  }
}

export function createPaginationContext<T>(
  mode: "cursor" | "offset" = "offset"
) {
  switch (mode) {
    case "cursor":
      return new PaginationContext(new CursorPagination<T>());
    case "offset":
      return new PaginationContext(new OffsetPagination<T>());
    default:
      return new PaginationContext(new OffsetPagination<T>());
  }
}

export const resumePagination = createPaginationContext<Resume>("cursor");
export const jobEntryPagination = createPaginationContext<JobEntry>("cursor");
export const feedbackPagination =
  createPaginationContext<ResumeJobFeedback>("cursor");
