import { useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

interface Currency {
  code: string;
  decimalMark: string;
  id: number;
  name: string;
  precision: number;
  shortCode: string;
  subunit: number;
  symbol: string;
  symbolFirst: boolean;
  thousandsSeparator: string;
}

export type Currencies = Currency[];

interface Response {
  [id: number]: Currency;
  meta: {
    code: number;
    disclaimer: string;
  };
  response: Currencies;
}

const getCurrencies = async (): Promise<Response> => {
  const res = await fetch(
    `https://api.currencybeacon.com/v1/currencies?api_key=${
      import.meta.env.VITE_CURRENCY_BEACON_API_KEY
    }`
  );

  const data = await res.json();

  return camelcaseKeys(data, {
    deep: true,
  });
};

export const useCurrencies = () =>
  useQuery<Response>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
