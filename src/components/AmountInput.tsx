interface Props {
  id?: string;
  value: number | null;
  symbol?: string;
  onChange: (value: number | null) => void;
}

export const AmountInput = ({ id, value, symbol, onChange }: Props) => (
  <div className="input w-full">
    <span>{symbol}</span>
    <input
      id={id}
      type="number"
      value={value ?? ""}
      onChange={(e) =>
        onChange(
          Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
        )
      }
    />
  </div>
);
