import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IDashboardData } from '@/types/dashboard-interface';
import { Image } from '../common/Image';

export default function TopLists({
  topListData,
}: {
  topListData: IDashboardData;
}) {
  // Function to format currency in Bangladeshi Taka
  const formatCurrency = (amount: number): string => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-4">
      {/* Top Customers Card */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Top Customers</CardTitle>
          <p className="text-xs text-gray-500">Top Customers In This Month</p>
        </CardHeader>
        <CardContent className="p-0">
          <div>
            {topListData?.top_customers?.slice(0, 7).map((customer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden">
                    <Image
                      src={customer?.image || '/avatar.webp'}
                      alt={customer?.name}
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{customer?.name}</p>
                    <p className="text-xs text-gray-500">{customer?.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(customer?.total_spent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Product Card */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Top Product</CardTitle>
          <p className="text-xs text-gray-500">Top Product In This Month</p>
        </CardHeader>
        <CardContent className="p-0">
          <div>
            {topListData?.top_products?.slice(0, 7).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    <Image
                      src={product?.image}
                      alt={product?.product_name}
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {product?.product_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product?.category_names}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(product?.total_order_amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Category Card */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Top Category</CardTitle>
          <p className="text-xs text-gray-500">Top Category In This Month</p>
        </CardHeader>
        <CardContent className="p-0">
          <div>
            {topListData?.top_categories?.slice(0, 7).map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center">
                    <Image
                      src={category?.image || '/avatar.png'}
                      alt={category?.name}
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{category?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-sm font-medium">
                    {formatCurrency(category?.total_sale_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
