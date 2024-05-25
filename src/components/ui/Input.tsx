type Props = {
  value: string;
  onChange(value: string): void;
  name?: string;
  label?: string;
};
export const Input = ({ value, onChange, name, label }: Props) => {
  return (
    <div>
      <label>
        {label && <span className="block font-medium">{label}</span>}
        <input
          className="rounded-md border border-gray-400 px-1 focus:border-gray-900 focus:outline-none"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
};
