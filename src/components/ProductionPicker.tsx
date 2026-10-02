interface ProductionPickerProps {
  value: string;
  productions: string[];
  onChange: (value: string) => void;
}

export function ProductionPicker({ value, productions, onChange }: ProductionPickerProps) {
  return (
    <label className="production-picker">
      <span>Production</span>
      <input
        list="production-list"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nom de la production"
        aria-label="Nom de la production"
      />
      <datalist id="production-list">
        {productions.map((production) => (
          <option key={production} value={production} />
        ))}
      </datalist>
    </label>
  );
}
