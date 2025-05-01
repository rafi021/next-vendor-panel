import { api } from '@/server/api';
import { NEWS_LETTER } from '@/server/services/news-letter';
import { NewsLetterData } from '@/types/store-settings-interface';
import NewsLetterPageWrapper from '@/components/settings/news-letter/NewsLetterPageWrapper';

const NewsLetterPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string; search: string }>;
}) => {
  const queryParams = await searchParams;
  const newsLetter = await api.get<ApiResponse<NewsLetterData>>(
    `${NEWS_LETTER.GET.NEWS_LETTERS.URL}?per_page=${15}&page=${queryParams?.page ?? ''}&search=${queryParams?.search ?? ''}`,
    NEWS_LETTER.GET.NEWS_LETTERS.TAGS,
  );

  return <NewsLetterPageWrapper data={newsLetter?.data} />;
};

export default NewsLetterPage;
