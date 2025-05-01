'use client';
import { toast } from 'sonner';
import { api } from '@/server/api';
import { CircleX, PenTool } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import StoreBasicForm from './StoreBasicForm';
import { useRouter } from 'next-nprogress-bar';
import { Button } from '@/components/ui/button';
// import StoreOthersForm from './StoreOthersForm';
import { PRODUCT } from '@/server/services/product';
import React, { useTransition, useEffect } from 'react';
import BackButton from '@/components/common/back-button';
// import StoreProductTypeForm from './StoreProductTypeForm';
import { IProductData } from '@/types/product-interface';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DeleteButton from '@/components/common/DeleteButton';
import ImageDropify from '../common/ImageDropify';
import { Input } from '../ui/input';
import TextEditor from '../common/forms/TextEditor';
import OfferForm from './OfferForm';
import { ILandingPageData } from '@/types/landing-ui-interface';
import { LandingPageForm, LandingPageSchemaDef } from '@/schemas/landing-ui';
import { LANDING_PAGES } from '@/server/services/landing-ui';
import SelectorWithSearch from '../common/forms/SelectorWithSearch';
import { slugify } from '@/utils/string';
import { Image } from '@/components/common/Image';

export interface ILandingPageProps {
  products?: IProductData;
  data?: ILandingPageData;
}

const AddLandingPageForm = ({ products, data }: ILandingPageProps) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const { form, handleReset, isActiveAction } = LandingPageForm(data);

  // Move the form initialization to useEffect to avoid state updates during render
  useEffect(() => {
    if (!form.getValues('landing_page.related_section')?.length) {
      form.setValue('landing_page.related_section', [
        {
          title: '',
          btn_tax: '',
          btn_link: '',
          gallery: [''],
        },
      ]);
    }
  }, [form]);

  function onSubmit(formData: LandingPageSchemaDef) {
    startTransition(async () => {
      if (data) {
        const res = await api.put(
          `${LANDING_PAGES.PUT.UPDATE_LANDING_PAGE}/${data?.id}`,
          formData,
          LANDING_PAGES.GET.TAGS,
        );

        if (res.success) {
          // form.reset();
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await api.post(
          LANDING_PAGES.POST,
          formData,
          LANDING_PAGES.GET.TAGS,
        );

        if (res.success) {
          form.reset();
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      }
    });
  }
  const handleRemoveImage = (index: number) => {
    const currentGallery =
      form.getValues('landing_page.hero_section.gallery') || [];
    const filteredImage = currentGallery.filter(
      (_: any, idx: number) => idx !== index,
    );

    form.setValue('landing_page.hero_section.gallery', filteredImage);
  };

  const handleRemoveRelatedImage = (index: number) => {
    const currentGallery =
      form.getValues(`landing_page.related_section.${index}.gallery`) || [];
    const filteredImage = currentGallery.filter(
      (_: any, idx: number) => idx !== index,
    );

    form.setValue(
      `landing_page.related_section.${index}.gallery`,
      filteredImage,
    );
  };

  const colors = [
    { value: '#000000', label: 'Black' },
    { value: '#EF4444', label: 'Red' },
    { value: '#F97316', label: 'Orange' },
    { value: '#10B981', label: 'Green' },
    { value: '#3B82F6', label: 'Blue' },
    { value: '#C2410C', label: 'Dark Orange' },
    { value: '#EAB308', label: 'Yellow' },
  ];

  return (
    <div className="pb-space16">
      <Card>
        <CardHeader className="p-space16 lg:p-space24 border-b border-gray-300">
          <div className="flex items-center justify-between gap-space16">
            <div className="flex  items-start gap-space16">
              <div className="p-2 border-[1px] rounded-lg bg-primary/10">
                <PenTool className="w-6 h-6 text-gray-500" />
                {/* <Layers className="w-6 h-6 text-gray-500" /> */}
              </div>
              <div className="">
                <h1 className="text-2xl font-semibold">
                  {data ? 'Update' : 'Create'} Page
                </h1>
                <p className=" text-gray-500">
                  {data ? 'Update ' : 'Create '}
                  your page in less than 5 minutes.
                </p>
              </div>
            </div>
            <BackButton />
          </div>
        </CardHeader>
        <CardContent className="lg:p-space24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="border border-gray-200 rounded-md p-space16 flex items-center gap-space16">
                <FormField
                  control={form.control}
                  name="landing_page.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter page title"
                          onChange={(evt) => {
                            form.setValue(
                              'landing_page.title',
                              evt.target.value,
                            );
                            form.setValue(
                              'landing_page.action_url',
                              slugify(evt.target.value),
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.action_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page action url</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="page action url"
                          value={form.watch('landing_page.action_url') ?? ''}
                          disabled
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Select Product
                </div>
                <FormField
                  control={form.control}
                  name="product_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Products <span className="text-error-500">*</span>
                      </FormLabel>
                      <SelectorWithSearch
                        options={
                          products?.data?.map((product) => ({
                            label: product.name,
                            value: String(product.id),
                          })) || []
                        }
                        // onChange={(val) => {
                        //   updateSection(index, { ...section, brand: val });
                        // }}
                        onChange={(val) => field.onChange(val)}
                        value={field.value}
                        // Icon={ChevronDown}
                        placeholder="Select product"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Theme Color Selection */}
              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Select Theme Color
                </div>
                <div className="flex gap-2">
                  {colors?.map((color) => (
                    <Button
                      key={color.value}
                      type="button"
                      className={`w-10 h-10 rounded-md p-0 cursor-pointer ring-offset-2 ring-offset-background transition-all hover:scale-110 focus:ring-2 
                        ${form.watch('landing_page.color_code') === color.value ? 'ring-2 ring-primary' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() =>
                        form.setValue('landing_page.color_code', color.value)
                      }
                      aria-label={`Select ${color.label} theme`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Top Scrolling Text Banner
                </div>

                <FormField
                  control={form.control}
                  name="landing_page.top.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Text</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter banner text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.top.link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Link</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter banner link URL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Hero Section
                </div>
                <FormField
                  control={form.control}
                  name="landing_page.hero_section.logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Logo</FormLabel>
                      <FormControl>
                        <ImageDropify
                          image={field.value}
                          setImage={(img) => field.onChange(img)}
                          id="logo"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.hero_section.title"
                  render={({ field }) => (
                    <FormItem className="text-editor">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <TextEditor
                          height="100px"
                          defaultValue={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.hero_section.gallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Banners</FormLabel>
                      <ImageDropify
                        image={''}
                        setImage={(img) => {
                          form.setValue(
                            'landing_page.hero_section.gallery',
                            field.value ? [...field.value, img] : [img],
                          );
                        }}
                      />
                      {field.value && (
                        <div className="flex gap-space12 flex-wrap py-space12">
                          {field.value.map((img: string, index: number) => (
                            <div className="relative" key={img}>
                              <Image
                                alt=""
                                src={img}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-full object-contain"
                                wrapperClasses="max-h-[74px] h-[74px] w-[150px] border border-gray-200 rounded-lg overflow-hidden"
                              />

                              <Button
                                size={'icon'}
                                type="button"
                                variant={'transparent'}
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-space6 -right-space6 rounded-full h-auto w-auto bg-white"
                              >
                                <CircleX />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landing_page.hero_section.btn_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter button text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="landing_page.hero_section.btn_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter button link URL"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Featured Video
                </div>
                <FormField
                  control={form.control}
                  name="landing_page.video_section.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter video title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.video_section.video_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Link</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter video URL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  List
                </div>
                <FormField
                  control={form.control}
                  name="landing_page.list.title"
                  render={({ field }) => (
                    <FormItem className="text-editor">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <TextEditor
                          height="100px"
                          defaultValue={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.list.des"
                  render={({ field }) => (
                    <FormItem className="text-editor">
                      <FormLabel>List Item</FormLabel>
                      <FormControl>
                        <TextEditor
                          height="100px"
                          defaultValue={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landing_page.list.btn_tax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter button text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="landing_page.list.btn_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter button link URL"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Related Images
                </div>
                <FormField
                  control={form.control}
                  name="landing_page.related_section"
                  render={({ field: relatedField }) => {
                    return (
                      <>
                        {(relatedField.value || []).map((section, index) => (
                          <div
                            key={index}
                            className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                          >
                            <FormField
                              control={form.control}
                              name={`landing_page.related_section.${index}.gallery`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Upload Images</FormLabel>
                                  <ImageDropify
                                    image={''}
                                    setImage={(img) => {
                                      form.setValue(
                                        `landing_page.related_section.${index}.gallery`,
                                        field.value
                                          ? [...field.value, img]
                                          : [img],
                                      );
                                    }}
                                  />
                                  {field.value && (
                                    <div className="flex gap-space12 flex-wrap py-space12">
                                      {field.value.map(
                                        (img: string, index: number) => (
                                          <div className="relative" key={img}>
                                            <Image
                                              alt=""
                                              src={img}
                                              width={0}
                                              height={0}
                                              sizes="100vw"
                                              className="w-full h-full object-contain"
                                              wrapperClasses="max-h-[74px] h-[74px] w-[150px] border border-gray-200 rounded-lg overflow-hidden"
                                            />

                                            <Button
                                              size={'icon'}
                                              type="button"
                                              variant={'transparent'}
                                              onClick={() =>
                                                handleRemoveRelatedImage(index)
                                              }
                                              className="absolute -top-space6 -right-space6 rounded-full h-auto w-auto bg-white"
                                            >
                                              <CircleX />
                                            </Button>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* <div className="mb-4">
                              <FormLabel>Upload Images</FormLabel>
                              <div className="mt-2">
                                <ImageDropify
                                  image={section.gallery?.[0] || ''}
                                  setImage={(img) => {
                                    const updatedSections = [
                                      ...(relatedField.value || []),
                                    ];
                                    updatedSections[index] = {
                                      ...updatedSections[index],
                                      gallery: [img],
                                    };
                                    relatedField.onChange(updatedSections);
                                  }}
                                  id={`gallery-${index}`}
                                />
                              </div>
                            </div> */}

                            <FormField
                              control={form.control}
                              name={`landing_page.related_section.${index}.title`}
                              render={({ field }) => (
                                <FormItem className="mb-4">
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Write a few words about the page..."
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`landing_page.related_section.${index}.btn_tax`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Button Text</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter button text..."
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`landing_page.related_section.${index}.btn_link`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Button Link</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="https://"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {index > 0 && (
                              <Button
                                type="button"
                                variant="danger-outline"
                                className="mt-4"
                                onClick={() => {
                                  const updatedSections = [
                                    ...(relatedField.value || []),
                                  ];
                                  updatedSections.splice(index, 1);
                                  relatedField.onChange(updatedSections);
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="white"
                          className="mt-4"
                          onClick={() => {
                            const newSection = {
                              title: '',
                              btn_tax: '',
                              btn_link: '',
                              gallery: [''],
                            };
                            relatedField.onChange([
                              ...(relatedField.value || []),
                              newSection,
                            ]);
                          }}
                        >
                          + Add Another
                        </Button>
                      </>
                    );
                  }}
                />
              </div>
              <OfferForm form={form} />
              <div className="space-y-space12 border border-gray-200 rounded-md p-space16">
                <div className="border-b border-gray-200 text-black font-semibold text-md pb-space8">
                  Customer Review
                </div>
                <FormField
                  control={form.control}
                  name="landing_page.review_section.gallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Images</FormLabel>
                      <FormControl>
                        <ImageDropify
                          image={field.value?.[0] || ''}
                          setImage={(img) =>
                            field.onChange([...(field.value || []), img])
                          }
                          id="review_images"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landing_page.review_section.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter review section title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-space16 justify-between">
                <div className="flex gap-space16 w-full sm:max-w-[400px]">
                  <Button
                    type="button"
                    variant="white"
                    className="w-full"
                    onClick={handleReset}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    loader={isLoading}
                    disabled={!isActiveAction() || isLoading}
                  >
                    {data ? 'Save Changes' : 'Create Landing Page'}
                  </Button>
                </div>

                <div className="hidden sm:block">
                  {/* {product && ( */}
                  <DeleteButton
                    tags={PRODUCT.GET.PRODUCTS.TAGS}
                    url={`${PRODUCT.DELETE.PRODUCT_DELETE}`}
                    handleReset={() => router.back()}
                  />
                  {/* )} */}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLandingPageForm;
