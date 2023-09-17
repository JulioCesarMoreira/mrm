import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { ReactElement, useState } from 'react';
import { SelectedCategory, directions } from '../types';
import Category from './Category/Category';
import { ScrollArea } from '@components/ui/scroll-area';

interface CategoryListProperties {
  direction: directions;
}

export default function CategoryList({
  direction,
}: CategoryListProperties): ReactElement {
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([]);

  function onAddCategory(): void {
    setSelectedCategories((previous) => [
      ...previous,
      {
        color: '#3A9ED4',
        direction,
        items: [
          {
            key: nanoid(),
            name: 'nome',
            quantity: '1',
            unitPrice: '2000',
            unity: 'UN',
          },
        ],
        name: '',
        key: nanoid(),
      },
    ]);
  }

  function onRemoveCategory(key: string): void {
    setSelectedCategories((previous) =>
      previous.filter((category) => category.key !== key),
    );
  }

  return (
    <ScrollArea
      className="h-full w-1/2 p-4"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {selectedCategories.map((category) => (
        <Category
          key={category.key}
          category={category}
          onRemoveCategory={onRemoveCategory}
        />
      ))}

      <Button
        type="button"
        onClick={onAddCategory}
        variant={'secondary'}
        className="flex-center bg-gray-scale-800 hover:bg-gray-scale-700 mt-8 w-full -translate-y-3 gap-4 transition-colors duration-200"
      >
        <Plus size={18} />
        Categoria de serviço
      </Button>
    </ScrollArea>
  );
}
