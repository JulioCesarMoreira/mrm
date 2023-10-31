import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import { ReactElement, useEffect, useMemo, useState } from 'react';
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
  const [categoryOptions, setCategoryOptions] = useState<
    (CategoryService & { items: ItemService[] })[]
  >([]);
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

  const onRemoveCategory = (id: string): void =>
    setSelectedCategories((previous) =>
      previous.filter((category) => category.id !== id),
    );

  const onToggleOpen = (open: boolean) => setOpenCategories(open);

  useEffect(() => {
    if (categories && items) {
      const categoriesMap = new Map<
        string,
        CategoryService & { items: ItemService[] }
      >([]);

      for (const category of categories) {
        const categoryItems = [];

        for (const item of items)
          if (item.categoryServiceId === category.id) categoryItems.push(item);

        if (!categoriesMap.has(category.id))
          categoriesMap.set(category.id, { ...category, items: categoryItems });
      }

      setCategoryOptions(Array.from(categoriesMap.values()));
    }
  }, [categories, items]);

  const hasAvailableCategoryOptions = useMemo(
    () =>
      categoryOptions.some(
        (category) =>
          !selectedCategories.some(
            (selectedCategory) => selectedCategory.id === category.id,
          ) && category.items.length > 0,
      ),
    [categoryOptions, selectedCategories],
  );

  return (
    <>
      <SelectOptionDialog
        label="Categorias"
        placeholder="Selecione uma categoria"
        options={categoryOptions
          .filter(
            (category) =>
              category.items.length > 0 &&
              !selectedCategories.some(
                (selectedCategory) => selectedCategory.id === category.id,
              ),
          )
          .map((category) => ({
            name: category.name,
            value: category.id,
          }))}
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
            categoryOptions.length === 0 ||
            !categoryOptions.some((category) => category.items.length > 0)
              ? 'É necessário ter categorias e itens cadastrados para prosseguir.'
              : 'Todas as categorias já estão sendo usadas.'
          }
          position="top"
          disabled={
            categories &&
            items &&
            selectedCategories.length < categoryOptions?.length &&
            hasAvailableCategoryOptions
          }
        >
          <Button
            type="button"
            onClick={
              items &&
              items.length > 0 &&
              categories &&
              selectedCategories.length < categories?.length &&
              hasAvailableCategoryOptions
                ? (): void => setOpenCategories(true)
                : undefined
            }
            variant={'secondary'}
            className={twMerge(
              'flex-center bg-gray-scale-800 hover:bg-gray-scale-700 mt-8 w-full -translate-y-3 gap-4 transition-colors duration-200',
              !items ||
                items.length === 0 ||
                selectedCategories.length === categories?.length ||
                !hasAvailableCategoryOptions
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
