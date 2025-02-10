import { useState } from "react";
import { useCurrencies } from "../hooks/useCurrencies";
import { CurrencySelect } from "./CurrencySelect";
import { useConvertCurrency } from "../hooks/useConvertCurrency";
import { ArrowDownUp, TriangleAlert } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { AmountInput } from "./AmountInput";

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number | null>(1);
  const [from, setFrom] = useState("GBP");
  const [to, setTo] = useState("USD");
  const debouncedAmount = useDebounce(amount, 500);

  const { data: currencies, isLoading: isLoadingCurrencies } = useCurrencies();
  const {
    data: conversion,
    isFetching: isFetchingConversion,
    isError: isConversionError,
  } = useConvertCurrency({
    from,
    to,
    amount: debouncedAmount || 0,
  });

  if (isLoadingCurrencies)
    return <span className="loading loading-spinner loading-xl mx-auto my-6" />;

  if (!currencies)
    return (
      <div role="alert" className="alert">
        <TriangleAlert size={20} />
        <span>No currencies could be loaded</span>
      </div>
    );

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const currenciesArray = currencies.response || [];

  const getCurrencyFromShortCode = (shortCode: string) =>
    currenciesArray.find((currency) => currency.shortCode === shortCode);

  const fromCurrency = getCurrencyFromShortCode(from);
  const toCurrency = getCurrencyFromShortCode(to);
  const conversionText = conversion
    ? `${conversion.value.toFixed(2)} ${toCurrency?.name}`
    : null;

  return (
    <div>
      <div className="py-10 flex flex-col gap-2">
        <div>
          {amount || 0} {fromCurrency?.name} equals
        </div>
        <div className="text-2xl font-semibold flex gap-x-2">
          <span>
            {isConversionError ? "Error converting currency" : conversionText}
          </span>
          {isFetchingConversion ? (
            <span className="loading loading-spinner loading-xl" />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <label htmlFor="amount" className="label block min-w-14 text-right">
            Amount
          </label>
          <AmountInput
            id="amount"
            value={amount}
            symbol={fromCurrency?.symbol}
            onChange={setAmount}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="from" className="label block min-w-14 text-right">
              From
            </label>
            <CurrencySelect
              id="from"
              currencies={currenciesArray}
              value={from}
              onChange={setFrom}
            />
          </div>
          <button
            className="w-10 flex justify-center ml-auto py-2"
            aria-label="Swap currencies"
            type="button"
            onClick={handleSwap}
          >
            <ArrowDownUp size={20} />
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="to" className="label block min-w-14 text-right">
              To
            </label>
            <CurrencySelect
              id="to"
              currencies={currenciesArray}
              value={to}
              onChange={setTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
