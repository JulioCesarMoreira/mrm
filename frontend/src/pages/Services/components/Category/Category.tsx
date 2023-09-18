import { ChevronDown, X } from 'lucide-react';
import { SelectedCategory } from 'pages/Services/types';
import { ReactElement, useState } from 'react';
import ItemTable from './ItemTable';
import { twMerge } from 'tailwind-merge';
import Tooltip from '@components/Tooltip/Tooltip';
import { ItemService } from 'pages/ServiceItems/types';

interface CategoryProperties {
  category: SelectedCategory;
  categoryItems: ItemService[] | undefined;
  onRemoveCategory: (key: string) => void;
}

function CategoryHeader({
  category,
  onRemoveCategory,
  collapsed,
  onToggleCollapse,
}: Omit<CategoryProperties, 'categoryItems'> & {
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
      <Tooltip
        text="Remover categoria da proposta"
        position="top"
        className="-translate-y-2"
      >
        <button
          type="button"
          onClick={(): void => onRemoveCategory(category.id)}
          className="opacity-0 duration-200 group-hover:opacity-100"
        >
          <X size={18} color="white" />
        </button>
      </Tooltip>

      <div
        className="border-gray-scale-300 h-5 w-5 rounded-full border"
        style={{
          backgroundColor: category.color,
        }}
      />
      <span>{category.name}</span>

      <Tooltip
        text={collapsed ? 'Expandir' : 'Retrair'}
        position="top"
        className="-translate-y-2"
      >
        <button type="button" className="ml-auto" onClick={onToggleCollapse}>
          <ChevronDown
            className={twMerge(
              'duration-200',
              collapsed ? 'rotate-0' : 'rotate-180',
            )}
          />
        </button>
      </Tooltip>
    </div>
  );
}

export default function Category({
  category,
  onRemoveCategory,
  categoryItems,
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
        <ItemTable data={category.items} categoryItems={categoryItems} />
      </div>
    </div>
  );
}
