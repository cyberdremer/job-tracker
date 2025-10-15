import { useMutation, useQuery } from "@tanstack/react-query";
import backendUrl from "@/utils/backendurl";

type HttpMethod = "POST" | "PUT" | "DELETE" | "GET" | "PATCH";

interface RequestOptions {
  url: string;
  options: RequestInit;
  body?: BodyInit | Record<string, any> | null;
}

const genericRequest = async <T>({
  url,
  options,
  body,
}: RequestOptions): Promise<T> => {
  let processedBody: BodyInit | undefined;
  if (
    options.headers["content-type"] === "application/x-www-form-urlencoded" &&
    body &&
    typeof body === "object"
  ) {
    processedBody = new URLSearchParams(body as Record<string, any>).toString();
  } else if (body instanceof FormData) {
    processedBody = body;
  } else if (body && typeof body === "object") {
    processedBody = JSON.stringify(body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  } else {
    processedBody = body as BodyInit;
  }

  const response = await fetch(`${backendUrl}${url}`, {
    method: options.method,
    headers: options.headers,
    body: processedBody,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: T = await response.json();
  return data;
};

export function useRequestQuery<T = any>(
  requestOptions: RequestOptions,
  queryKey: string | any[]
) {
  return useQuery<T, Error>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => genericRequest<T>(requestOptions),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useRequestMutation<T = any>(
  options?: Omit<Parameters<typeof useMutation>[0], "mutationFn">
) {
  return useMutation<T, Error, RequestOptions>({
    mutationFn: genericRequest,
    ...options,
  });
}
