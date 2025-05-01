import { create } from 'zustand';

export type SubTicker = {
  content: string;
  link: string;
  is_open_new_tab: 1 | 0;
  follow_type: 'nofollow' | 'dofollow';
};

export type Ticker = {
  name: string;
  is_active: 1 | 0;
  sub_tickers: SubTicker[];
};

type SubHeroBanner = {
  id: number;
  image: string;
  btn_link: string;
  follow_type: 'nofollow' | 'dofollow';
  is_open_new_tab: 1 | 0;
};
type HeroBanner = SubHeroBanner & { btn_text: string };

type StoreUiState = {
  tickers: Ticker[];
  heroBanners: HeroBanner[];
  subHeroBanners: SubHeroBanner[];
};

type Category = {
  id: number;
  name: string;
};

type GlobalActions = {
  setTickers: (tickers: Ticker[]) => void;
  addTicker: () => void;
  removeTicker: (tickerIndex: number) => void;
  addSubTicker: (tickerIndex: number) => void;
  removeSubTicker: (tickerIndex: number, subTickerIndex: number) => void;
  updateTickerOrSubTicker: (
    tickerIndex: number,
    updates: Partial<Ticker>,
    subTickerIndex?: number,
    subUpdates?: Partial<SubTicker>,
  ) => void;

  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  is_category_show: 1 | 0;
  setCategoryShow: (value: 1 | 0) => void;

  heroBanners: HeroBanner[];
  isAddable: boolean;
  addHeroBanner: () => void;
  setHeroBanners: (params: HeroBanner[]) => void;
  updateHeroBanner: (id: number, updates: Partial<HeroBanner>) => void;
  removeHeroBanner: (id: number) => void;

  is_sub_hero_show: 1 | 0;
  setSubHeroShow: (value: 1 | 0) => void;
  subHeroBanners: SubHeroBanner[];
  updateSubHeroBanner: (id: number, updates: Partial<SubHeroBanner>) => void;

  // new
  selectedTopCategories: Category[];
  setSelectedTopCategories: (categories: Category[]) => void;
  is_top_category_show: 1 | 0;
  setTopCategoryShow: (value: 1 | 0) => void;

  // section (product, banner, offer)
};

const initialSubTicker: SubTicker = {
  content: '',
  link: '',
  is_open_new_tab: 0,
  follow_type: 'dofollow',
};

const initialTicker: Ticker = {
  name: 'New Ticker',
  is_active: 1,
  sub_tickers: [initialSubTicker],
};

const initialHeroBanner: HeroBanner = {
  id: 0,
  btn_text: '',
  btn_link: '',
  is_open_new_tab: 0,
  follow_type: 'dofollow',
  image: '',
};

const initialSubHeroBanner: SubHeroBanner[] = [
  {
    id: 0,
    btn_link: '',
    is_open_new_tab: 0,
    follow_type: 'dofollow',
    image: '',
  },
  {
    id: 1,
    btn_link: '',
    is_open_new_tab: 0,
    follow_type: 'dofollow',
    image: '',
  },
  {
    id: 2,
    btn_link: '',
    is_open_new_tab: 0,
    follow_type: 'dofollow',
    image: '',
  },
];

export const useStoreUIState = create<StoreUiState & GlobalActions>((set) => ({
  tickers: [],

  setTickers: (tickers) => set({ tickers }),

  addTicker: () =>
    set((state) => ({
      tickers: [
        ...state.tickers,
        {
          ...initialTicker,
          name: 'New Ticker ' + (state.tickers.length + 1),
        },
      ],
    })),

  addSubTicker: (tickerIndex) =>
    set((state) => ({
      tickers: state.tickers.map((ticker, indx) =>
        indx === tickerIndex
          ? {
              ...ticker,
              sub_tickers: [...ticker.sub_tickers, { ...initialSubTicker }],
            }
          : ticker,
      ),
    })),

  removeTicker: (tickerIndex) =>
    set((state) => ({
      tickers: state.tickers.filter((ticker, index) => index !== tickerIndex),
    })),

  removeSubTicker: (tickerIndex, subTickerIndex) =>
    set((state) => ({
      tickers: state.tickers.map((ticker, index) =>
        tickerIndex === index
          ? {
              ...ticker,
              sub_tickers: ticker.sub_tickers.filter(
                (_, idx) => idx !== subTickerIndex,
              ),
            }
          : ticker,
      ),
    })),

  updateTickerOrSubTicker: (tickerIndex, updates, subIndex, subUpdates) =>
    set((state) => ({
      tickers: state.tickers.map((ticker, indx) => {
        if (indx === tickerIndex) {
          if (subIndex !== undefined && subUpdates) {
            return {
              ...ticker,
              sub_tickers: ticker.sub_tickers.map((sub, idx) =>
                idx === subIndex ? { ...sub, ...subUpdates } : sub,
              ),
            };
          }
          return { ...ticker, ...updates };
        }
        return ticker;
      }),
    })),

  // Category Actions
  is_category_show: 1,
  setCategoryShow: (value) => set({ is_category_show: value }),
  selectedCategories: [],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),

  // Hero Banner Actions

  heroBanners: [initialHeroBanner],
  isAddable: false,

  addHeroBanner: () =>
    set((state) => {
      const updatedBanners = [
        ...state.heroBanners,
        { ...initialHeroBanner, id: state.heroBanners.length },
      ];
      return {
        heroBanners: updatedBanners,
        isAddable: updatedBanners.every((banner) => banner.image !== ''),
      };
    }),
  setHeroBanners: (params) =>
    set((state) => {
      return {
        heroBanners: params,
        isAddable: params.every((banner) => banner.image !== ''),
      };
    }),
  updateHeroBanner: (id, updates) =>
    set((state) => {
      const updatedBanners = state.heroBanners.map((banner) =>
        banner.id === id ? { ...banner, ...updates } : banner,
      );
      return {
        heroBanners: updatedBanners,
        isAddable: updatedBanners.every((banner) => banner.image !== ''),
      };
    }),

  removeHeroBanner: (id) =>
    set((state) => {
      const updatedBanners = state.heroBanners.filter(
        (banner) => banner.id !== id,
      );
      return {
        heroBanners: updatedBanners,
        isAddable: updatedBanners.every((banner) => banner.image !== ''),
      };
    }),

  // Sub Hero Banner Actions
  is_sub_hero_show: 1,
  setSubHeroShow: (value) => set({ is_sub_hero_show: value }),
  subHeroBanners: initialSubHeroBanner,
  updateSubHeroBanner: (id, updates) =>
    set((state) => ({
      subHeroBanners: state.subHeroBanners.map((banner) =>
        banner.id === id ? { ...banner, ...updates } : banner,
      ),
    })),

  // Top Category Actions
  is_top_category_show: 1,
  setTopCategoryShow: (value) => set({ is_top_category_show: value }),
  selectedTopCategories: [],
  setSelectedTopCategories: (categories) =>
    set({ selectedTopCategories: categories }),
}));
