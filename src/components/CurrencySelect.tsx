import { Currencies } from "../hooks/useCurrencies";

interface Props {
  id?: string;
  currencies: Currencies;
  value?: string;
  onChange: (currency: string) => void;
}

export const CurrencySelect = ({ id, currencies, value, onChange }: Props) => (
  <select
    id={id}
    value={value}
    className="select w-full"
    onChange={(e) => onChange(e.target.value)}
  >
    {currencies.map((currency) => (
      <option key={currency.id} value={currency.shortCode}>
        {currency.name} ({currency.shortCode})
      </option>
    ))}
  </select>
);
