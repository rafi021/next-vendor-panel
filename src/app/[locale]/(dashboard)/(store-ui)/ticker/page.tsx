import StoreUiTickerWrapper from '@/components/store-ui/ticker/StoreUiTickerWrapper';
import { api } from '@/server/api';
import { TICKERS } from '@/server/services/store-ui';
import { Ticker } from '@/stores/useStoreUI';

const TickerPage = async ({}: {}) => {
  const data = await api.get<
    ApiResponse<{
      ticker: Ticker[];
    }>
  >(TICKERS.GET.URL, TICKERS.GET.TAGS);
  // // console.log('data of ticker ', data);
  return <StoreUiTickerWrapper tickersList={data.data.ticker ?? []} />;
};

export default TickerPage;
