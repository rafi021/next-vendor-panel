import React from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { IPurchase, ProductsPurchase } from '@/types/purchase-interface';

interface InvoicePreviewProps {
  purchase: IPurchase;
}

const InvoicePreview = ({ purchase }: InvoicePreviewProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="transparent" className="!p-0">
            <Eye className="h-4 w-4" />
            {purchase?.reference}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Purchase Invoice: #{purchase?.reference}</DialogTitle>
          </DialogHeader>

          <div className="p-6 relative">
            <h2 className="text-xl font-semibold mb-6">
              Purchase Invoice: #{purchase?.reference}
            </h2>

            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-sm font-medium border-b">
                    <th className="p-3 text-left w-2/8">Product</th>
                    <th className="p-3 text-left w-1/8">Cost</th>
                    <th className="p-3 text-left w-1/8">Pre.Qty</th>
                    <th className="p-3 text-left w-1/8">Ret.Qty</th>
                    <th className="p-3 text-left w-2/8">Net Ord.Qty</th>
                    <th className="p-3 text-left w-1/8">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {purchase?.products_purchase?.map((item: ProductsPurchase) => (
                    <tr key={item?.id} className="text-sm">
                      <td className="p-3 flex items-center gap-2">
                        {item?.product?.thump_image && (
                          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item?.product?.thump_image}
                              alt={item?.product?.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 line-clamp-2">
                            {item?.product?.name}
                          </p>
                          {item?.product?.sku && (
                            <p className="text-xs text-gray-500">
                              SKU: {item?.product?.sku}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        {item?.purchase_price?.toLocaleString()}
                      </td>
                      <td className="p-3">0</td>
                      <td className="p-3">0</td>
                      <td className="p-3">{item?.quantity}</td>
                      <td className="p-3 font-medium">
                        {item?.sub_total?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 text-sm font-medium border-t">
                    <td colSpan={5} className="p-3 text-right">
                      Total
                    </td>
                    <td className="p-3">
                      {purchase?.grand_total?.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 px-3">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-600">Discount:</span>
                    <span>{purchase?.discount?.toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-600">Paid:</span>
                    <span>{purchase?.paid_amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-600">Due:</span>
                    <span>
                      {(
                        purchase?.grand_total - purchase?.paid_amount
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 font-bold">
                    <span>Grand Total:</span>
                    <span>{purchase?.grand_total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="bg-gray-50 p-4 border-t">
            <DialogTrigger asChild>
              <Button type="button" variant="white">
                Close
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicePreview;
