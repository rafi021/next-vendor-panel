import { Badge } from '@/components/ui/badge';
import { GripVertical, X } from 'lucide-react';

function CategoryItem({
  id,
  name,
  selected,
  onSelect,
  type = 'select',
}: {
  id: number;
  name: string;
  selected: boolean;
  onSelect: () => void;
  type?: 'select' | 'reorder';
}) {
  return (
    <Badge
      variant={'outline'}
      className={`bg-white ${
        selected && 'border border-blue-500 text-blue-500 bg-blue-50'
      } ${type === 'reorder' ? 'hover:cursor-grab' : 'hover:cursor-pointer'}`}
      onClick={onSelect}
    >
      {name}
      {selected && (
        <span className="text-blue-500 pl-2">
          {type === 'select' ? <X size={12} /> : <GripVertical size={12} />}
        </span>
      )}
    </Badge>
  );
}

export default CategoryItem;
