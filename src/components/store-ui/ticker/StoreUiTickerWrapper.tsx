'use client';

import TextEditor from '@/components/common/forms/TextEditor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { api } from '@/server/api';
import { TICKERS } from '@/server/services/store-ui';
import { Ticker, useStoreUIState } from '@/stores/useStoreUI';
import {
  Info,
  Plus,
  Tag,
  X,
  ChevronDown,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Reorder } from 'framer-motion';
import { motion } from 'framer-motion';

const StoreUiTickerWrapper = ({ tickersList }: { tickersList: Ticker[] }) => {
  const { tickers, setTickers, addTicker } = useStoreUIState();

  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      const payload = {
        ticker: [...tickers],
      };
      // // console.log('payload ->', payload);
      const res = await api.post(TICKERS.POST, payload, TICKERS.GET.TAGS);
      // // console.log('res', res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message ?? 'Something went wrong!');
      }
    });
  };

  useEffect(() => {
    if (tickersList.length > 0) {
      setTickers(tickersList);
    }
  }, [tickersList]);

  return (
    <div className="bg-white space-y-[0.5px]">
      {/* Header */}
      <div className="p-space16 flex justify-between items-start pb-space16 border-b-2 border-gray-200">
        <div className="flex items-center gap-space12">
          <Button size={'icon'} variant={'white'} className="border">
            <Tag size="20" />
          </Button>
          <p className="text-md font-semibold">Ticker</p>
        </div>
      </div>

      {/* Ticker List */}
      <Reorder.Group
        axis="y"
        values={tickers}
        onReorder={(newItems) => setTickers(newItems)}
        className="space-y-2"
      >
        <div className="p-space16 items-center pb-space16 rounded-none space-y-space24">
          {tickers.length === 0 && (
            <div className="flex items-center justify-center">No ticker</div>
          )}
          {tickers.map((ticker, tickerIndex) => (
            <Reorder.Item
              key={ticker.name + tickerIndex}
              value={ticker}
              layout
              className="cursor-move shadow-sm"
            >
              <motion.div layout>
                <div>
                  <TickerItem ticker={ticker} tickerIndex={tickerIndex} />
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </div>
      </Reorder.Group>

      {/* Add New Ticker Button */}
      <div className="p-space16 flex items-center pb-space16 rounded-b rounded-t-none gap-space12">
        <Button
          variant={'white'}
          className="bg-gray-200 text-gray-700"
          onClick={() => {
            addTicker();
          }}
        >
          <Plus size={16} />
          Add new ticker
        </Button>
        <Button className="min-w-[120px]" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

const TickerItem = ({
  ticker,
  tickerIndex,
}: {
  ticker: Ticker;

  tickerIndex: number;
}) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    addSubTicker,
    removeTicker,
    removeSubTicker,
    updateTickerOrSubTicker,
  } = useStoreUIState();

  return (
    <div className="bg-white p-space6 rounded-md flex flex-col gap-space12 pt-space12 border">
      {/* Ticker Header */}
      <div className="flex items-center justify-between font-semibold text-md px-space8">
        <div className="flex items-center gap-space12">
          <span className={'cursor-grab'}>
            <GripVertical size={18} />
          </span>
          <Input
            className="font-semibold text-md w-2/3"
            value={ticker.name ?? ''}
            onChange={(e) =>
              updateTickerOrSubTicker(tickerIndex, {
                name: e.target.value,
              })
            }
          />
          <Button
            variant={'transparent'}
            className={`${show ? 'rotate-180' : ''} duration-300`}
            onClick={() => setShow((prev) => !prev)}
          >
            <ChevronDown size={20} />
          </Button>
        </div>

        <div>
          <Switch
            checked={ticker.is_active === 1}
            onCheckedChange={(checked) =>
              updateTickerOrSubTicker(tickerIndex, {
                is_active: checked ? 1 : 0,
              })
            }
          />

          {/* dialog for confirmation */}
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

                <DialogTitle>Remove ticker?</DialogTitle>
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
                    onClick={() => {
                      removeTicker(tickerIndex);
                    }}
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sub-Tickers */}
      <motion.div
        layout
        initial={false}
        animate={{
          height: show ? 'auto' : 0,
        }}
        className="overflow-hidden"
      >
        <div className="px-space32 flex flex-col gap-space12">
          {ticker.sub_tickers.map((sub, subIndex) => (
            <div
              className="border rounded-md shadow-sm relative p-space8"
              key={subIndex}
            >
              <p className="pb-space12">Content</p>
              <TextEditor
                placeholder="Write a few words about the page..."
                height="80px"
                defaultValue={sub.content ?? ''}
                name={sub.content + subIndex}
                onChange={(val) =>
                  updateTickerOrSubTicker(tickerIndex, {}, subIndex, {
                    content: val,
                  })
                }
              />
              <div className="flex items-center gap-space16">
                <div className="w-2/5">
                  <Label>Link</Label>
                  <Input
                    placeholder="https://"
                    value={sub.link ?? ''}
                    onChange={(e) =>
                      updateTickerOrSubTicker(tickerIndex, {}, subIndex, {
                        link: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-space32">
                  <div className="flex flex-col pt-space24 gap-[2px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-space6">
                            <span className="text-black text-sm font-medium">
                              Tab
                            </span>
                            <Info
                              className="text-gray-500 hover:cursor-context-menu"
                              size={16}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open in new tab</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="space-x-space6 flex items-center">
                      <Checkbox
                        checked={sub.is_open_new_tab === 1}
                        onCheckedChange={(checked) =>
                          updateTickerOrSubTicker(tickerIndex, {}, subIndex, {
                            is_open_new_tab: checked ? 1 : 0,
                          })
                        }
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
                          <div className="flex items-center gap-space6">
                            <span className="text-black text-sm font-medium">
                              No Follow
                            </span>
                            <Info
                              className="text-gray-500 hover:cursor-context-menu"
                              size={16}
                            />
                          </div>
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
                        checked={sub.follow_type === 'nofollow'}
                        onCheckedChange={(checked) =>
                          updateTickerOrSubTicker(tickerIndex, {}, subIndex, {
                            follow_type: checked ? 'nofollow' : 'dofollow',
                          })
                        }
                      />
                      <span className="font-medium text-sm text-gray-600">
                        {`Add "nofollow" to link`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Remove Sub-Ticker Button */}
              {ticker.sub_tickers.length > 1 && (
                <Button
                  size="icon"
                  variant="danger-outline"
                  className="absolute top-2 rounded-full right-4 h-[24px] w-[24px]"
                  onClick={() => removeSubTicker(tickerIndex, subIndex)}
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          ))}
        </div>
        {/* <div className="px-space32 flex flex-col gap-space12">
                      xdajsdajsdj
                    </div> */}
      </motion.div>

      {/* Add Sub-Ticker Button */}
      {show && (
        <div className="border-t !py-space16">
          <Button
            variant={'pagination'}
            onClick={() => addSubTicker(tickerIndex)}
          >
            <Plus size={16} />
            Add new sub-ticker
          </Button>
        </div>
      )}
    </div>
  );
};

export default StoreUiTickerWrapper;
