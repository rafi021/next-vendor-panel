'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, Plus, Table2 } from 'lucide-react';
import HeroBannerImageSection from './HeroBannerImageSection';
import SubHeroBannerImageSection from './SubHeroBannerImageSection';
import CategorySection from './CategorySection';
import { ICategory } from '@/types/category-interfaces';
import { useStoreUIState } from '@/stores/useStoreUI';
import { MAX_HERO_BANNERS } from '@/config/data';
import { Switch } from '@/components/ui/switch';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { api } from '@/server/api';
import { HERO_SECTION } from '@/server/services/store-ui';
import { HeroSection } from '@/types/store-ui';
import TopCategorySection from './TopCategorySection';

type storeUiProps = {
  categories: ICategory[];
  data?: HeroSection;
};

const StoreUiHeroWrapper = ({ categories, data }: storeUiProps) => {
  const [isLoading, startTransition] = useTransition();

  const {
    heroBanners,
    addHeroBanner,
    isAddable,
    subHeroBanners,
    selectedCategories,
    is_category_show,
    is_sub_hero_show,
    setCategoryShow,
    setSelectedCategories,
    setSubHeroShow,
    setHeroBanners,
    updateSubHeroBanner,

    setTopCategoryShow,
    setSelectedTopCategories,
    selectedTopCategories,
    is_top_category_show,
  } = useStoreUIState();

  const handleSubmit = async () => {
    startTransition(async () => {
      const payload = {
        hero_section: {
          is_category_show,
          category_ids: selectedCategories.map((cat) => cat.id),
          is_sub_hero_show,
          hero: [...heroBanners],
          sub_hero: [...subHeroBanners],
          // new
          is_top_category_show: is_top_category_show,
          top_category_ids: selectedTopCategories.map((cat) => cat.id),
        },
      };
      // // console.log('payload ->', payload);
      const res = await api.post(
        HERO_SECTION.POST,
        payload,
        HERO_SECTION.GET.TAGS,
      );
      // // console.log('res', res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message ?? 'Something went wrong!');
      }
    });
  };

  useEffect(() => {
    if (data) {
      setCategoryShow(data.is_category_show ?? 1);
      setSelectedCategories(data.categories ?? []);
      setSubHeroShow(data.is_sub_hero_show);
      setHeroBanners(
        data.hero?.map((banner, index) => {
          return {
            id: index,
            btn_link: banner.btn_link,
            btn_text: banner.btn_text,
            follow_type: banner.follow_type,
            image: banner.image,
            is_open_new_tab: banner.is_open_new_tab,
          };
        }),
      );
      data.sub_hero.forEach((subHero, index) => {
        updateSubHeroBanner(index, { ...subHero });
      });

      //  new

      setTopCategoryShow(data.is_category_show ?? 1);
      setSelectedTopCategories(data.top_categories ?? []);
    }
  }, [data]);

  return (
    <div className="space-y-[0.5px]">
      <Card className="p-space16 flex justify-between items-center pb-space16 rounded-t rounded-b-none">
        <div className="flex items-center gap-space12">
          <Button size={'icon'} variant={'white'} className="border">
            <Table2 size="20" />
          </Button>
          <p className="text-md font-semibold">Hero Section</p>
        </div>
      </Card>
      <Card
        className="p-space16 flex justify-between items-center pb-space16 rounded-b rounded-t-none"
        aria-disabled={isLoading}
      >
        <CategorySection categories={categories} />
      </Card>
      <Card
        className="p-space16 flex justify-between items-center pb-space16 rounded-b rounded-t-none"
        aria-disabled={isLoading}
      >
        <TopCategorySection categories={categories} />
      </Card>
      <Card className="p-space16 items-center pb-space16 rounded-none space-y-space24">
        <div className="flex items-center justify-start w-full gap-space8">
          <p className="text-sm font-medium">Hero Banner Image</p>
          <span className="text-gray-500 hover:cursor-pointer border  border-gray-300 rounded-full p-space4 bg-gray-100">
            <Eye size={15} />
          </span>
        </div>
        {heroBanners.map((banner, index) => (
          <HeroBannerImageSection key={index} banner={banner} index={index} />
        ))}

        {MAX_HERO_BANNERS > heroBanners.length && (
          <Button
            variant={'pagination'}
            disabled={!isAddable}
            onClick={addHeroBanner}
          >
            <Plus size={16} />
            Add new banner
          </Button>
        )}
      </Card>
      <Card className="p-space16  justify-between items-center pb-space16 rounded-b rounded-none">
        <div className="flex items-center gap-space8 pb-space12">
          <span className="text-sm font-medium">Sub-Hero Banner Image</span>
          <Switch
            checked={is_sub_hero_show === 1}
            onCheckedChange={(val) => setSubHeroShow(val ? 1 : 0)}
          />
          <span className="text-gray-500 hover:cursor-pointer border border-gray-300 rounded-full p-space4 bg-gray-100">
            <Eye size={15} />
          </span>
        </div>

        {subHeroBanners.map((subBanner) => (
          <SubHeroBannerImageSection key={subBanner.id} banner={subBanner} />
        ))}
      </Card>

      <Card className="p-space16 flex justify-between items-center pb-space16 rounded-b rounded rounded-t-none">
        <Button size={'xxl'} onClick={handleSubmit}>
          Save
        </Button>
      </Card>
    </div>
  );
};

export default StoreUiHeroWrapper;
