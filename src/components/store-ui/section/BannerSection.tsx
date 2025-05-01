'use state';
import ImageDropify from '@/components/common/ImageDropify';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Banners,
  InitialBanner,
  useStoreUISectionState,
} from '@/stores/useStoreUiSection';
import { ChevronDown, Eye, GripVertical, Info, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';

type SectionProps = {
  section: Banners;
  index: number;
};

const BannerSection = ({ index, section }: SectionProps) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { removeSection, updateSection } = useStoreUISectionState();

  return (
    <div className="border bg-white border-gray-200 rounded-sm px-space12 py-space8">
      <div className="flex items-center justify-between py-space8">
        <div
          className="flex w-full items-center justify-start gap-space12 px-space4 hover:cursor-pointer hover:text-black"
          onClick={() => setShow((prev) => !prev)}
        >
          <span
            className={`hover:cursor-grab overflow-hidden duration-500 ${!show ? 'w-[16px]' : 'w-0'}`}
          >
            <GripVertical size={18} />
          </span>
          <span>Banner</span>
          <span className={`${show ? 'rotate-180' : ''} duration-300`}>
            <ChevronDown size={20} className="text-gray-500" />
          </span>
        </div>
        <span className="flex items-center gap-space6">
          <Switch
            checked={section.is_active === 1}
            onCheckedChange={(val) =>
              updateSection(index, { ...section, is_active: val ? 1 : 0 })
            }
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size={'sm'} variant={'transparent'}>
                <X className="text-gray-500 hover:text-red-500 hover:cursor-pointer" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="h-[48px] w-[48px] rounded-full p-space6 bg-error-50 mb-space16">
                  <div className="h-full w-full rounded-full bg-error-100 flex justify-center items-center text-error-500">
                    <Trash2 />
                  </div>
                </div>

                <DialogTitle>Banner</DialogTitle>
                <DialogDescription className="pb-space12">
                  {`Are you sure you want to delete this section? This action cannot be undone.`}
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="white" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    variant={'danger'}
                    onClick={() => removeSection(index)}
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
      </div>

      <motion.div
        layout
        initial={false}
        animate={{ height: show ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="border-t border-gray-200 pt-space16 mt-space16">
          <div>
            <div className="pb-space12">
              <Label>Banner Type</Label>
              <RadioGroup
                value={section.banner_type}
                className="flex py-space16 gap-space24 px-space6"
                onValueChange={(val) => {
                  updateSection(index, {
                    ...section,
                    banner_type: val === 'double' ? 'double' : 'triple',
                    data:
                      val === 'double'
                        ? [...section.data.slice(0, 2)]
                        : [...section.data.slice(0, 2), InitialBanner],
                  });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="double" id={'double' + index} />
                  <Label htmlFor={'double' + index} className="capitalize">
                    double banner
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triple" id={'triple' + index} />
                  <Label htmlFor={'triple' + index} className="capitalize">
                    triple banner
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-space12">
            {section.data?.map((banner, parentId) => (
              <div
                key={parentId}
                className={`space-y-space8 !w-full gap-space16 py-space16 px-space4 ${parentId !== 0 && 'border-t border-gray-200'}`}
              >
                <p className="text-black font-semibold flex items-center gap-space8">
                  <span>Banner Image</span>
                  <span>
                    <Eye className="border rounded-full p-space4 text-gray-500 bg-gray-100 hover:cursor-pointer" />
                  </span>
                </p>
                <div className="space-y-space12">
                  <ImageDropify
                    image={banner.image}
                    setImage={(image) => {
                      updateSection(index, {
                        ...section,
                        data: section.data?.map((ban, idx) =>
                          idx === parentId ? { ...ban, image } : ban,
                        ),
                      });
                    }}
                    // remove={heroBanners.length > 1}
                    handleRemove={() => {
                      //   removeHeroBanner(banner.id);
                    }}
                    id={`banner-${parentId}-${banner.image}`}
                  />
                </div>
                <div className="md:flex w-full items-center justify-center gap-space16">
                  <div className="w-full space-y-space6">
                    <Label>Button Text</Label>
                    <Input
                      placeholder="Buy Now"
                      value={banner.btn_text ?? ''}
                      onChange={(evt) => {
                        updateSection(index, {
                          ...section,
                          data: section.data?.map((ban, idx) =>
                            idx === parentId
                              ? {
                                  ...ban,
                                  btn_text: evt.target.value,
                                }
                              : ban,
                          ),
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
                        updateSection(index, {
                          ...section,
                          data: section.data?.map((ban, idx) =>
                            idx === parentId
                              ? {
                                  ...ban,
                                  btn_link: evt.target.value,
                                }
                              : ban,
                          ),
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
                              <span className="text-black text-sm font-medium">
                                Tab
                              </span>
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
                          onCheckedChange={(checked) => {
                            updateSection(index, {
                              ...section,
                              data: section.data?.map((ban, id) =>
                                id === parentId
                                  ? {
                                      ...ban,
                                      is_open_new_tab: checked ? 1 : 0,
                                    }
                                  : ban,
                              ),
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
                            <p>
                              This tells search engines to not follow this link.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="space-x-space6 flex items-center">
                        <Checkbox
                          checked={banner.follow_type === 'nofollow'}
                          onCheckedChange={(checked) => {
                            updateSection(index, {
                              ...section,
                              data: section.data?.map((ban, id) =>
                                id === parentId
                                  ? {
                                      ...ban,
                                      follow_type: checked
                                        ? 'nofollow'
                                        : 'dofollow',
                                    }
                                  : ban,
                              ),
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
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerSection;
