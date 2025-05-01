'use client';
import React, { useState } from 'react';
import FooterMenuTable from './FooterMenuTable';
import StoreFooterMenu from './StoreFooterMenu';
import { heads } from '@/schemas/settings/footer-menus';
import EmptyTableData from '@/components/common/EmptyTableData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FooterMenus } from '@/types/store-settings-interface';

const FooterMenuWrapper = ({ data }: { data: FooterMenus }) => {
  const [activeTab, setActiveTab] = useState(heads[0]);

  const pagesLength = data[heads[0]]?.length >= 5 ? heads[0] : '';
  const informationLength = data[heads[1]]?.length >= 5 ? heads[1] : '';
  const othersLength = data[heads[2]]?.length >= 5 ? heads[2] : '';

  const disableActions = [pagesLength, informationLength, othersLength];

  return (
    <Tabs value={activeTab} onValueChange={(active) => setActiveTab(active)}>
      <TabsList className="flex bg-transparent">
        {heads.map((head) => (
          <TabsTrigger key={head} value={head} className="max-w-[160px] w-full">
            {head.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>

      <Card className="p-space16">
        <CardHeader className="p-0 pb-space12 border-b border-gray-200">
          <div className="flex items-center justify-between gap-space16">
            <article>
              <CardTitle>{activeTab.toUpperCase()}</CardTitle>
              <CardDescription className="text-xs">
                Manage Other sections
              </CardDescription>
            </article>

            <StoreFooterMenu disableAction={disableActions}>
              <Button disabled={disableActions.includes(activeTab)}>
                <Plus className="w-4 h-4" />
                Add Menus
              </Button>
            </StoreFooterMenu>
          </div>
        </CardHeader>

        <CardContent className="!p-0">
          <TabsContent value={activeTab} className="mt-space12">
            {data[activeTab]?.length > 0 ? (
              <FooterMenuTable data={data[activeTab]} />
            ) : (
              <EmptyTableData
                title="There is no Pages created here yet!"
                description="Add Pages to your shop and adjust them as you wish. You will be able to add, update and delete whenever you want, whenever you wish"
                action={<StoreFooterMenu />}
              />
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default FooterMenuWrapper;
