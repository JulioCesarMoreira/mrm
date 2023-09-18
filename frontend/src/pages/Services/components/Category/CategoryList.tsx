import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { SelectedCategory, directions } from '../../types';
import Category from './Category';
import { ScrollArea } from '@components/ui/scroll-area';
import { CategoryService, ItemService } from 'pages/ServiceItems/types';
import Tooltip from '@components/Tooltip/Tooltip';
import { twMerge } from 'tailwind-merge';
import SelectOptionDialog from '../SelectOptionDialog';
import { Option } from 'types';

interface CategoryListProperties {
  direction: directions;
  categories: CategoryService[] | undefined;
  items: ItemService[] | undefined;
}

export default function CategoryList({
  direction,
  categories,
  items,
}: CategoryListProperties): ReactElement {
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([]);

  function onAddCategory(categoryOption: Option): void {
    setSelectedCategories((previous) => [
      ...previous,
      {
        color: '#3A9ED4',
        direction,
        items: [],
        name: categoryOption.name,
        id: categoryOption.value,
      },
    ]);
    setOpenCategories(false);
  }

  function onRemoveCategory(id: string): void {
    setSelectedCategories((previous) =>
      previous.filter((category) => category.id !== id),
    );
  }

  const onToggleOpen = (open: boolean) => setOpenCategories(open);

  return (
    <>
      <SelectOptionDialog
        label="Categorias"
        placeholder="Selecione uma categoria"
        options={
          categories
            ? categories.map((category) => ({
                name: category.name,
                value: category.id,
              }))
            : []
        }
        onSelectOption={onAddCategory}
        onToggleOpen={onToggleOpen}
        open={openCategories}
      />
      <ScrollArea
        className="h-full w-1/2 p-4"
        style={{ height: 'calc(100vh - 100px)' }}
      >
        {selectedCategories.map((category) => (
          <Category
            key={category.id}
            category={category}
            categoryItems={items?.filter(
              (item) => item.categoryServiceId === category.id,
            )}
            onRemoveCategory={onRemoveCategory}
          />
        ))}

        <Tooltip
          text="É necessário ter categorias e itens cadastrados para prosseguir"
          position="bottom"
          disabled={items && items.length > 0}
        >
          <Button
            type="button"
            onClick={
              items && items.length > 0
                ? (): void => setOpenCategories(true)
                : undefined
            }
            variant={'secondary'}
            className={twMerge(
              'flex-center bg-gray-scale-800 hover:bg-gray-scale-700 mt-8 w-full -translate-y-3 gap-4 transition-colors duration-200',
              !items || items.length === 0
                ? '!bg-gray-scale-700 text-gray-scale-400 cursor-not-allowed'
                : '',
            )}
          >
            <Plus size={18} />
            Categoria de serviço
          </Button>
        </Tooltip>
      </ScrollArea>
    </>
  );
}
