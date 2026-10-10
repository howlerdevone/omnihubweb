import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchInput = ({
  placeholder = 'Search commands...',
  value = '',
  onChange,
}: SearchInputProps) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-on-surface-variant" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border-outline-variant/30 text-caption focus:border-primary/50 text-on-surface w-64 rounded-full border bg-surface-container-low py-1.5 pl-10 pr-4 transition-all placeholder:text-on-surface-variant focus:outline-none"
      />
    </div>
  );
};
