'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import DeleteButton from '@/components/common/DeleteButton';
import Link from 'next/link';
import { LANDING_PAGES } from '@/server/services/landing-ui';
import { ILandingPagesData } from '@/types/landing-ui-interface';
import StatusUpdate from '../common/StatusUpdate';
import { Image } from '../common/Image';
import CopyComponent from '../common/CopyComponent';

const LandingPageTable = ({
  landingPages,
  activePage,
  perPage,
  store_domain_url,
}: {
  landingPages: ILandingPagesData;
  activePage: number;
  perPage: number;
  store_domain_url: string | null;
}) => {
  const landingPageSerial = (index: number) => {
    return (activePage - 1) * perPage + index + 1;
  };

  const merged_url = (slug: string) => {
    return store_domain_url
      ? `${store_domain_url}/offer/${slug}`
      : `/offer/${slug}`;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>URL Link</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {landingPages?.data?.map(
            ({ id, product, landing_page, is_active }, index) => (
              <TableRow key={id}>
                <TableCell>{landingPageSerial(index)}</TableCell>
                <TableCell>{landing_page.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-space12">
                    <Image
                      src={product.thump_image}
                      alt={product.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-contain"
                      wrapperClasses="h-[36px] max-w-max"
                    />
                    <div className="line-clamp-1">{product.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-space8">
                    <CopyComponent
                      value={merged_url(landing_page?.action_url)}
                      iconSize={14}
                    >
                      <div className="text-blue-500 underline hover:cursor-copy">
                        {store_domain_url ? (
                          <Link
                            href={merged_url(landing_page?.action_url)}
                            target="_blank"
                          >
                            {merged_url(landing_page?.action_url)}
                          </Link>
                        ) : (
                          merged_url(landing_page?.action_url)
                        )}
                      </div>
                    </CopyComponent>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusUpdate
                    isActive={is_active == 1 ? true : false}
                    url={`${LANDING_PAGES.PUT.STATUS_UPDATE}/${id}`}
                    tags={LANDING_PAGES.GET.TAGS}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Link href={`/landing-ui/update/${id}`}>
                    <Button variant="white" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton
                    url={`${LANDING_PAGES.DELETE}/${id}`}
                    tags={LANDING_PAGES.GET.TAGS}
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default LandingPageTable;
