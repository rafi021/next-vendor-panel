import { ILandingPageProps } from './../components/landing-ui/AddLandingPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const LandingPageSchema = z.object({
  product_id: z.string().min(1, 'Product is required'),
  landing_page: z.object({
    color_code: z.string({ required_error: 'Theme color is required' }),
    top: z.object({
      title: z.string(),
      link: z.string(),
    }),
    hero_section: z
      .object({
        title: z.string(),
        btn_text: z.string(),
        btn_link: z.string(),
        logo: z.string(),
        gallery: z.array(z.string()),
      })
      .optional(),
    related_section: z
      .array(
        z.object({
          title: z.string(),
          btn_tax: z.string(),
          btn_link: z.string(),
          gallery: z.array(z.string()),
        }),
      )
      .optional(),
    list: z
      .object({
        title: z.string(),
        des: z.string(),
        btn_tax: z.string(),
        btn_link: z.string(),
      })
      .optional(),
    video_section: z
      .object({
        title: z.string(),
        video_link: z.string(),
      })
      .optional(),
    review_section: z
      .object({
        title: z.string().optional(),
        gallery: z.array(z.string()).optional(),
      })
      .optional(),
    offer_section: z
      .object({
        offer_type: z.string().optional(),
        type: z.string().optional(),
        duration: z.string().optional(),
        start_date: z.string().optional(),
        end_date: z.string().optional(),
      })
      .optional(),

    // new

    title: z.string({ required_error: 'Title is required' }),
    action_url: z.string({ required_error: 'Action url is required' }),
  }),
});

export type LandingPageSchemaDef = z.infer<typeof LandingPageSchema>;

export const LandingPageForm = (data?: ILandingPageProps['data']) => {
  const form = useForm<LandingPageSchemaDef>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues: {
      product_id: String(data?.product_id ?? '') || '',
      landing_page: {
        color_code: data?.landing_page?.color_code || '',
        top: {
          title: data?.landing_page?.top?.title || '',
          link: data?.landing_page?.top?.link || '',
        },
        hero_section: {
          title: data?.landing_page?.hero_section?.title || '',
          btn_text: data?.landing_page?.hero_section?.btn_text || '',
          btn_link: data?.landing_page?.hero_section?.btn_link || '',
          logo: data?.landing_page?.hero_section?.logo || '',
          gallery: data?.landing_page?.hero_section?.gallery || [],
        },
        related_section: data?.landing_page?.related_section || [],
        list: {
          title: data?.landing_page?.list?.title || '',
          des: data?.landing_page?.list?.des || '',
          btn_tax: data?.landing_page?.list?.btn_tax || '',
          btn_link: data?.landing_page?.list?.btn_link || '',
        },
        video_section: {
          title: data?.landing_page?.video_section?.title || '',
          video_link: data?.landing_page?.video_section?.video_link || '',
        },
        review_section: {
          title: data?.landing_page?.review_section?.title || '',
          gallery: data?.landing_page?.review_section?.gallery || [],
        },
        offer_section: {
          type: data?.landing_page?.offer_section?.type || '',
          duration: String(data?.landing_page?.offer_section?.duration ?? ''),
          offer_type: data?.landing_page?.offer_section?.offer_type || 'loop',
          start_date: data?.landing_page?.offer_section?.start_date || '',
          end_date: data?.landing_page?.offer_section?.end_date || '',
        },
        // new
        title: data?.landing_page?.title || '',
        action_url: data?.landing_page?.action_url || '',
      },
    },
  });

  const handleReset = () => {
    form.setValue('product_id', data?.product_id || '');
    form.setValue(
      'landing_page.color_code',
      data?.landing_page?.color_code || '',
    );
    form.setValue(
      'landing_page.top.title',
      data?.landing_page?.top?.title || '',
    );
    form.setValue('landing_page.top.link', data?.landing_page?.top?.link || '');
    form.setValue(
      'landing_page.hero_section.title',
      data?.landing_page?.hero_section?.title || '',
    );
    form.setValue(
      'landing_page.hero_section.btn_text',
      data?.landing_page?.hero_section?.btn_text || '',
    );
    form.setValue(
      'landing_page.hero_section.btn_link',
      data?.landing_page?.hero_section?.btn_link || '',
    );
    form.setValue(
      'landing_page.hero_section.logo',
      data?.landing_page?.hero_section?.logo || '',
    );
    form.setValue(
      'landing_page.hero_section.gallery',
      data?.landing_page?.hero_section?.gallery || [],
    );
    form.setValue(
      'landing_page.related_section',
      data?.landing_page?.related_section?.map((section) => ({
        btn_link: section.btn_link || '',
        gallery: section.gallery || [],
        title: section.title || '',
        btn_tax: section.btn_tax || '',
      })) || [],
    );
    form.setValue(
      'landing_page.list.title',
      data?.landing_page?.list?.title || '',
    );
    form.setValue('landing_page.list.des', data?.landing_page?.list?.des || '');
    form.setValue(
      'landing_page.list.btn_tax',
      data?.landing_page?.list?.btn_tax || '',
    );
    form.setValue(
      'landing_page.list.btn_link',
      data?.landing_page?.list?.btn_link || '',
    );
    form.setValue(
      'landing_page.video_section.title',
      data?.landing_page?.video_section?.title || '',
    );
    form.setValue(
      'landing_page.video_section.video_link',
      data?.landing_page?.video_section?.video_link || '',
    );
    form.setValue(
      'landing_page.review_section.title',
      data?.landing_page?.review_section?.title || '',
    );
    form.setValue(
      'landing_page.review_section.gallery',
      data?.landing_page?.review_section?.gallery || [],
    );
    form.setValue(
      'landing_page.offer_section.type',
      data?.landing_page?.offer_section?.type || '',
    );
    form.setValue(
      'landing_page.offer_section.duration',
      String(data?.landing_page?.offer_section?.duration ?? ''),
    );
    form.setValue(
      'landing_page.offer_section.start_date',
      data?.landing_page?.offer_section?.start_date || '',
    );
    form.setValue(
      'landing_page.offer_section.end_date',
      data?.landing_page?.offer_section?.end_date || '',
    );
  };

  const isActiveAction = (): boolean => {
    const landingPage = form.watch('landing_page');
    const productId = form.watch('product_id');

    return (
      // productId?.length > 0 &&
      landingPage.color_code?.length > 0 &&
      landingPage.title?.length > 0 &&
      landingPage.action_url?.length > 0
    );
  };

  return { form, handleReset, isActiveAction };
};
