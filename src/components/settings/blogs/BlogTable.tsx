'use client';

import Link from 'next/link';
import { Eye, Pencil } from 'lucide-react';
import { BLOG } from '@/server/services/blog';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date-format';
import { Image } from '@/components/common/Image';
import DeleteButton from '@/components/common/DeleteButton';
import { BlogsData } from '@/types/store-settings-interface';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const BlogTable = ({ blogs }: { blogs: BlogsData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Publish Date</TableHead>

          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.data.map(
          ({ id, description, image_url, published_at, slug, title }) => (
            <TableRow key={id}>
              <TableCell>
                <Image
                  src={image_url}
                  alt={title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-contain"
                  wrapperClasses="h-[32px] max-w-max"
                />
              </TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>
                <span className="line-clamp-1">{slug}</span>
              </TableCell>
              <TableCell>{formatDate(published_at ?? '')}</TableCell>

              <TableCell className="flex gap-2 justify-end">
                {/* <Link href={`/settings/blog/${id}`}>
                  <Button variant="white" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link> */}
                <Link href={`/settings/blog/update/${id}`}>
                  <Button variant="white" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>

                <DeleteButton
                  url={`${BLOG.DELETE.BLOG_DELETE}/${id}`}
                  tags={BLOG.GET.BLOGS.TAGS}
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default BlogTable;
