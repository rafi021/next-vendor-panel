import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { Fragment, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICategory } from '@/types/category-interfaces';
import { CATEGORIES } from '@/server/services/category';
import StatusUpdate from '@/components/common/StatusUpdate';
import DeleteButton from '@/components/common/DeleteButton';
  
interface ICategoryProps {
  categories: ICategory[];
}

const CategoryTable = ({ categories }: ICategoryProps) => {
  const renderCategoryRow = (
    category: ICategory,
    level: number = 0,
  ): ReactNode => {
    const {
      id,
      image,
      name,
      slug,
      products_count,
      is_active,
      children_recursive,
    } = category;

    return (
      <Fragment key={id}>
        <TableRow>
          <TableCell>
            <Image
              src={image}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full object-contain"
              wrapperClasses="h-[32px] max-w-max"
            />
          </TableCell>
          <TableCell>
            <div style={{ marginLeft: `${level * 20}px` }}>
              {level > 0 && '— '.repeat(level)}
              {name}
            </div>
          </TableCell>
          <TableCell>{slug}</TableCell>
          <TableCell className="text-center">{products_count || 0}</TableCell>
          <TableCell>
            <StatusUpdate
              isActive={is_active == 1 ? true : false}
              url={`${CATEGORIES.PUT.CATEGORY_STATUS_UPDATE}/${id}`}
              tags={CATEGORIES.GET.CATEGORIES.TAGS}
            />
          </TableCell>
          <TableCell className="flex gap-2 justify-end">
            <Button variant="white" size="icon">
              <Link href={`/category/${id}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <DeleteButton
              url={`${CATEGORIES.DELETE.CATEGORY_DELETE}/${id}`}
              tags={CATEGORIES.GET.CATEGORIES.TAGS}
            />
          </TableCell>
        </TableRow>
        {children_recursive?.map((child) =>
          renderCategoryRow(child as ICategory, level + 1),
        )}
      </Fragment>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t border-gray-200">
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center">Product Count</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => renderCategoryRow(category))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
