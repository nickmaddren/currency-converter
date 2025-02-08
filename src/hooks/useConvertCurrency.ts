import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Params {
  from: string;
  to: string;
  amount: number;
}

interface Conversion {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}

interface Response extends Conversion {
  meta: {
    code: number;
    disclaimer: string;
  };
  response: Conversion;
}

const getConvertCurrencies = async (params: Params): Promise<Response> => {
  const res = await fetch(
    `https://api.currencybeacon.com/v1/convert?${new URLSearchParams({
      ...params,
      amount: params.amount.toString(),
      api_key: import.meta.env.VITE_CURRENCY_BEACON_API_KEY,
    })}`
  );

  const data = res.json();

  return data;
};

export const useConvertCurrency = (params: Params) => {
  const queryClient = useQueryClient();

  if (params.amount === 0) {
    queryClient.removeQueries({
      queryKey: "convert-currency",
    });
  }

  return useQuery<Response>({
    queryKey: ["convert-currency", params.from, params.to, params.amount],
    queryFn: () => getConvertCurrencies(params),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60, // 1 minute
  });
};
