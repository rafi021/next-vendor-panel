import ImageDropify from '@/components/common/ImageDropify';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useStoreUIState } from '@/stores/useStoreUI';
import { Info } from 'lucide-react';

type HeroBanner = {
  id: number;
  btn_text: string;
  btn_link: string;
  is_open_new_tab: 0 | 1;
  follow_type: 'nofollow' | 'dofollow';
  image: string;
};

const HeroBannerImageSection = ({
  banner,
  index,
}: {
  banner: HeroBanner;
  index: number;
}) => {
  const { removeHeroBanner, updateHeroBanner, heroBanners } = useStoreUIState();

  return (
    <div className="space-y-space8 !w-full pb-space16 border-b border-gray-200">
      <div className="space-y-space12">
        <ImageDropify
          image={banner.image}
          setImage={(image) => {
            updateHeroBanner(banner.id, {
              ...banner,
              image,
            });
          }}
          remove={heroBanners.length > 1}
          handleRemove={() => {
            removeHeroBanner(banner.id);
          }}
          id={`"hero-banner"+${index}`}
        />
      </div>
      <div className="md:flex w-full items-center justify-center gap-space16">
        <div className="w-full space-y-space6">
          <Label>Button Text</Label>
          <Input
            placeholder="Buy Now"
            value={banner.btn_text ?? ''}
            onChange={(evt) => {
              updateHeroBanner(banner.id, {
                ...banner,
                btn_text: evt.target.value,
              });
            }}
          />
        </div>
        <div className="w-full space-y-space6">
          <Label>Button Link</Label>
          <Input
            placeholder="http//:"
            type="url"
            value={banner.btn_link ?? ''}
            onChange={(evt) => {
              updateHeroBanner(banner.id, {
                ...banner,
                btn_link: evt.target.value,
              });
            }}
          />
        </div>
        <div className="w-full flex gap-space32">
          <div className="flex flex-col pt-space24 gap-[2px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label className="flex items-center gap-space6">
                    <span className="text-black text-sm font-medium">Tab</span>
                    <Info
                      className="text-gray-500 hover:cursor-context-menu"
                      size={16}
                    />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This will open the link in new tab</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="space-x-space6 flex items-center">
              <Checkbox
                checked={banner.is_open_new_tab === 1}
                onCheckedChange={(checked: boolean) => {
                  updateHeroBanner(banner.id, {
                    ...banner,
                    is_open_new_tab: checked ? 1 : 0,
                  });
                }}
              />
              <span className="font-medium text-sm text-gray-600">
                Open in new tab
              </span>
            </div>
          </div>
          <div className="flex flex-col pt-space24 gap-[2px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label className="flex items-center gap-space6">
                    <span className="text-black text-sm font-medium">
                      No Follow
                    </span>
                    <Info
                      className="text-gray-500 hover:cursor-context-menu"
                      size={16}
                    />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tells search engines to not follow this link.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="space-x-space6 flex items-center">
              <Checkbox
                checked={banner.follow_type === 'nofollow'}
                onCheckedChange={(checked: boolean) => {
                  updateHeroBanner(banner.id, {
                    ...banner,
                    follow_type: checked ? 'nofollow' : 'dofollow',
                  });
                }}
              />
              <span className="font-medium text-sm text-gray-600">
                {`Add "nofollow" to link`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerImageSection;
