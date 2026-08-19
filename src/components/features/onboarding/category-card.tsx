import { Category } from '@/data/categories';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}

export const CategoryCard = ({ category, isSelected, onToggle }: CategoryCardProps) => {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as
    React.ComponentType<{ className?: string }> | undefined;

  return (
    <button
      onClick={onToggle}
      className={`group flex items-start gap-4 rounded-lg border p-6 text-left transition-all ${
        isSelected
          ? 'border-primary bg-primary/5'
          : 'hover:border-primary border-outline-variant bg-surface-container-low'
      }`}
    >
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md transition-colors ${
          isSelected ? 'bg-primary/20' : 'group-hover:bg-primary/20 bg-surface-container-high'
        }`}
      >
        {IconComponent && (
          <IconComponent
            className={`h-6 w-6 transition-colors ${
              isSelected ? 'text-primary' : 'group-hover:text-primary text-on-surface-variant'
            }`}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-on-surface text-lg font-semibold">{category.name}</span>
        <p className="text-base font-normal text-on-surface-variant">{category.description}</p>
      </div>

      <div className={`ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
        <Icons.CheckCircle2 className="text-primary h-6 w-6" />
      </div>
    </button>
  );
};
