import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { SelectedCategory } from 'pages/Services/types';
import { ReactElement, useState } from 'react';
import ItemTable from './ItemTable';
import { twMerge } from 'tailwind-merge';

interface CategoryProperties {
  category: SelectedCategory;
  onRemoveCategory: (key: string) => void;
}

function CategoryHeader({
  category,
  onRemoveCategory,
  collapsed,
  onToggleCollapse,
}: CategoryProperties & {
  collapsed: boolean;
  onToggleCollapse: () => void;
}): ReactElement {
  return (
    <div
      className={twMerge(
        'bg-dark-blue group flex w-full gap-2 px-4 py-3 text-white',
        collapsed ? 'rounded-[8px]' : 'rounded-t-[8px]',
      )}
    >
      <button
        type="button"
        onClick={(): void => onRemoveCategory(category.key)}
        className="opacity-0 duration-200 group-hover:opacity-100"
      >
        <X size={18} color="white" />
      </button>
      <div
        className="border-gray-scale-300 h-5 w-5 rounded-full border"
        style={{
          backgroundColor: category.color,
        }}
      />
      <span>oi</span>

      <button type="button" className="ml-auto" onClick={onToggleCollapse}>
        <ChevronDown
          className={twMerge(
            'duration-200',
            collapsed ? 'rotate-0' : 'rotate-180',
          )}
        />
      </button>
    </div>
  );
}

export default function Category({
  category,
  onRemoveCategory,
}: CategoryProperties): ReactElement {
  const [collapsed, setCollapsed] = useState(false);

  const onToggleCollapse = (): void => setCollapsed((previous) => !previous);

  return (
    <div
      className={twMerge(
        'border-gray-scale-800 my-4 w-full rounded-[8px] border',
        collapsed ? 'h-10' : 'h-fit',
      )}
    >
      <CategoryHeader
        collapsed={collapsed}
        category={category}
        onRemoveCategory={onRemoveCategory}
        onToggleCollapse={onToggleCollapse}
      />

      <div
        className={twMerge(
          'duration-200',
          collapsed
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-100',
        )}
      >
        <ItemTable data={category.items} />
      </div>
    </div>
  );
}