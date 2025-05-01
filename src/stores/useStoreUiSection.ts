import { Section } from '@/types/store-ui';
import { ulid } from 'ulid';
import { create } from 'zustand';

type Banner = {
  image: string;
  btn_text: string;
  btn_link: string;
  follow_type: 'nofollow' | 'dofollow';
  is_open_new_tab: 1 | 0;
};

export type Banners = {
  [x: string]: any;
  id: string;
  section_type: 'banner';
  banner_type: 'double' | 'triple';
  data: Banner[];
  is_active: 1 | 0;
};

export type Product = {
  id: string;
  section_type: 'product';
  title: string;
  slug: string;
  btn_text: string;
  category_ids: string[];
  brand_ids: string[];
  tag_ids: string[];
  number_of_product: string;
  view_type: 'grid' | 'carousel';
  is_active: 1 | 0;
};

export type Offer = {
  id: string;
  section_type: 'offer';
  title: string;
  slug: string;
  description: string;
  btn_text: string;
  category_ids: string[];
  brand_ids: string[];
  tag_ids: string[];
  number_of_product: string;
  offer_duration: 'fixed' | 'loop';

  start_date?: string;
  end_date?: string;

  counter_type?: 'hour' | 'days';
  counter?: string;

  is_active: 1 | 0;
};
export type Sections = Product | Banners | Offer;

type StoreUISectionDef = {
  sectionList: Sections[];
  //   ;
};
type StoreUISectionActions = {
  addSection: (sectionType: 'product' | 'banner' | 'offer') => void;
  updateSection: (index: number, updates: Sections) => void;
  removeSection: (index: number) => void;
  storeSection: (data: Section[]) => void;
};

/*** Initial values */

export const InitialBanner: Banner = {
  image: '',
  btn_text: '',
  btn_link: '',
  follow_type: 'dofollow',
  is_open_new_tab: 0,
};
const InitialBanners: Banners = {
  id: ulid(),
  section_type: 'banner',
  banner_type: 'double',
  data: [InitialBanner, InitialBanner],
  is_active: 1,
};

const InitialProduct: Product = {
  id: ulid(),
  section_type: 'product',
  title: '',
  btn_text: '',
  category_ids: [],
  brand_ids: [],
  tag_ids: [],
  number_of_product: '8',
  is_active: 1,
  view_type: 'grid',
  slug: '',
};

const InitialOffer: Offer = {
  id: ulid(),
  section_type: 'offer',
  title: '',
  slug: '',
  description: '',
  btn_text: '',
  category_ids: [],
  brand_ids: [],
  tag_ids: [],
  number_of_product: '8',
  offer_duration: 'fixed',

  start_date: '',
  end_date: '',

  counter_type: 'days',
  counter: '1',
  is_active: 1,
};

export const useStoreUISectionState = create<
  StoreUISectionDef & StoreUISectionActions
>((set) => ({
  sectionList: [],

  // addSection: (param) =>
  //   set((state) => {
  //     let newSections;
  //     if (param === 'banner') {
  //       newSections = { ...InitialBanners };
  //     } else if (param === 'offer') {
  //       newSections = { ...InitialOffer };
  //     } else if (param === 'product') {
  //       newSections = { ...InitialProduct };
  //     }

  //     if (!newSections) return { sectionList: [...state.sectionList] };
  //     return { sectionList: [...state.sectionList, newSections] };
  //   }),
  addSection: (param) =>
    set((state) => {
      let newSection;
      if (param === 'banner') {
        newSection = { ...InitialBanners, id: ulid() };
      } else if (param === 'offer') {
        newSection = { ...InitialOffer, id: ulid() };
      } else if (param === 'product') {
        newSection = { ...InitialProduct, id: ulid() };
      }

      if (!newSection) return { sectionList: [...state.sectionList] };
      return { sectionList: [...state.sectionList, newSection] };
    }),
  updateSection: (index, updates) =>
    set((state) => {
      if (state.sectionList.length === 0) return { sectionList: [] };
      return {
        sectionList: state.sectionList.map((section, indx) =>
          indx === index ? { ...section, ...updates } : section,
        ),
      };
    }),
  storeSection: (data) =>
    set((state) => ({
      sectionList: data.map((d) => ({
        ...d,
        ...(d.id ? { id: d.id } : { id: ulid() }),
      })),
    })),

  removeSection: (index: number) =>
    set((state) => ({
      sectionList: state.sectionList.filter((_, indx) => index !== indx),
    })),
}));
