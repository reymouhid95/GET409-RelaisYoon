interface ProductionPickerProps {
  value: string;
  productions: string[];
  onChange: (value: string) => void;
  count: number;
  total: number;
}

export function ProductionPicker({
  value,
  productions,
  onChange,
  count,
  total,
}: ProductionPickerProps) {
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="production-picker">
      <label>
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
      <div
        className="production-progress"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Avancement de ${value}`}
      >
        <span className="progress-track">
          <span className="progress-fill" style={{ width: `${percent}%` }} />
        </span>
        <span className="progress-label">
          {count} / {total} {total > 1 ? "prises" : "prise"}
        </span>
      </div>
    </div>
  );
}
