import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { directions } from '../../types';
import Category from './Category';
import { ScrollArea } from '@components/ui/scroll-area';
import { CategoryService, ItemService } from 'pages/ServiceItems/types';
import Tooltip from '@components/Tooltip/Tooltip';
import { twMerge } from 'tailwind-merge';
import SelectOptionDialog from '../SelectOptionDialog';
import { Option } from 'types';
import useServiceContext from 'pages/Services/context/useServiceContext';

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
  const { selectedCategories, setSelectedCategories } = useServiceContext();
  const thisSideCategories = selectedCategories.filter(
    (category) => category.direction === direction,
  );

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
            ? categories
                .filter(
                  (category) =>
                    !selectedCategories.some(
                      (selectedCategory) => selectedCategory.id === category.id,
                    ),
                )
                .map((category) => ({
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
        style={{ height: 'calc(100vh - 174px)' }}
      >
        {thisSideCategories.map((category) => (
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
          text={
            (items && items.length === 0) ||
            (categories && categories.length === 0)
              ? 'É necessário ter categorias e itens cadastrados para prosseguir.'
              : 'Todas as categorias já estão sendo usadas.'
          }
          position="top"
          disabled={
            categories &&
            selectedCategories.length < categories?.length &&
            items &&
            items.length > 0
          }
        >
          <Button
            type="button"
            onClick={
              items &&
              items.length > 0 &&
              categories &&
              selectedCategories.length < categories?.length
                ? (): void => setOpenCategories(true)
                : undefined
            }
            variant={'secondary'}
            className={twMerge(
              'flex-center bg-gray-scale-800 hover:bg-gray-scale-700 mt-8 w-full -translate-y-3 gap-4 transition-colors duration-200',
              !items ||
                items.length === 0 ||
                selectedCategories.length === categories?.length
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
