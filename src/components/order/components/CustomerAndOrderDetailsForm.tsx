'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { OrderSchemaDef } from '@/schemas/order/order-schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCallback, useEffect, useState, useTransition } from 'react';

import UserSearchAndSelect from './UserSearchAndSelect';
import { Customer } from '@/types/accounts-interface';
import { AddressSuggestion, Area, City, Zone } from '@/types/address-types';
import SelectorWithSearch from '@/components/common/forms/SelectorWithSearch';
import { api } from '@/server/api';
import { ADDRESS } from '@/server/services/address';
import { useProductStore } from '@/stores/useProductStore';
import { MapPinHouse, X } from 'lucide-react';
import { Image } from '@/components/common/Image';
import { Button } from '@/components/ui/button';
import { addressParser } from '@/server/actions/customerSuccessRate';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Customer_info, DeliveryFeeType } from '@/types/order-interface';
import { CustomerInfoWithSummary } from './CustomerInfoWithSummary';

interface IProps {
  form: UseFormReturn<OrderSchemaDef>;
  customers?: Customer[] | [];
  cityList: City[];
  customer?: Customer;
  city_id?: number | null;
  zone_id?: number | null;
  area_id?: number | null;
  deliveryFee: DeliveryFeeType;
  customer_info?: Customer_info;
}

const CustomerAndOrderDetailsForm = ({
  form,
  customers,
  cityList,
  customer,
  city_id,
  zone_id,
  area_id,
  deliveryFee,
  customer_info,
}: IProps) => {
  const { customerAddress, setCustomerAddress } = useProductStore();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    customer ? { ...customer, customer_id: String(customer.id) } : null,
  );

  const [selectedCustomerInfo, setSelectedCustomerInfo] =
    useState<Customer_info | null>(customer_info ? { ...customer_info } : null);

  const [addressParseLoading, startTransition] = useTransition();

  const [zoneList, setZoneList] = useState<Zone[]>([]);
  const [areaList, setAreaList] = useState<Area[]>([]);

  const [loading, setLoading] = useState({
    city: false,
    zone: false,
    area: false,
  });

  const handleAddressParseClick = () => {
    startTransition(async () => {
      try {
        const address: AddressSuggestion = await addressParser(
          form.getValues('address'),
        );

        if (address.code === 200) {
          setCustomerAddress({
            city: {
              id: address.data.district_id ?? '',
              val: address.data.district_name ?? '',
            },
            zone: {
              id: address.data.zone_id ?? '',
              val: address.data.zone_name ?? '',
            },
            area: {
              id: address.data.area_id ?? '',
              val: address.data.area_name ?? '',
            },
          });
          toast.success('Address parsed successfully');
        } else {
          toast.error('Failed to parse address');
        }
      } catch (error) {
        toast.error('Error parsing address');
      }
    });
  };

  useEffect(() => {
    if (!selectedCustomer) return;

    form.setValue('customer_id', String(selectedCustomer.id ?? ''));
    form.setValue('name', selectedCustomer.name ?? '');
    form.setValue('phone', selectedCustomer.phone ?? '');
    form.setValue(
      'address',
      customer?.address ??
        selectedCustomer?.orders?.[0]?.shipping_address ??
        '',
    );
  }, [selectedCustomer]);

  const fetchZonesAndAreas = useCallback(async () => {
    if (!customerAddress.city?.id) return;

    setLoading((prev) => ({ ...prev, zone: true }));

    try {
      const zoneData = await api.get<Zone[]>(
        `${ADDRESS.GET.ZONES.URL}/${customerAddress.city.id}`,
        ADDRESS.GET.ZONES.TAGS,
      );

      setZoneList(Array.isArray(zoneData) ? zoneData : []);

      const selectedZone = zoneData.find(
        (zone) => zone.zone_id === Number(zone_id),
      );

      if (selectedZone) {
        setCustomerAddress((prev) => ({
          ...prev,
          zone: {
            id: selectedZone.zone_id,
            val: selectedZone.zone_name,
          },
        }));
      }
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, zone: false }));
    }
  }, [customerAddress.city?.id, zone_id]);

  const fetchAreas = useCallback(async () => {
    if (!customerAddress.zone?.id) return;

    setLoading((prev) => ({ ...prev, area: true }));

    try {
      const areaData = await api.get<Area[]>(
        `${ADDRESS.GET.AREA.URL}/${customerAddress.zone.id}`,
        ADDRESS.GET.AREA.TAGS,
      );

      setAreaList(Array.isArray(areaData) ? areaData : []);

      const selectedArea = areaData.find((area) => area.area_id === area_id);

      if (selectedArea) {
        setCustomerAddress((prev) => ({
          ...prev,
          area: {
            id: selectedArea.area_id,
            val: `${selectedArea.area_id}_${selectedArea.area_name}`,
          },
        }));
      }
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, area: false }));
    }
  }, [customerAddress.zone?.id, area_id]);

  useEffect(() => {
    if (city_id || zone_id || area_id) {
      const selectedCity = cityList.find((city) => city.city_id === city_id);
      const selectedZone = zoneList.find((zone) => zone.zone_id === zone_id);
      const selectedArea = areaList.find((area) => area.area_id === area_id);

      setCustomerAddress((prev) => ({
        ...prev,
        city: {
          id: String(city_id) ?? '',
          val: selectedCity?.city_name ?? '',
        },
        zone: {
          id: String(zone_id) ?? '',
          val: selectedZone?.zone_name ?? '',
        },
        area: {
          id: String(area_id) ?? '',
          val: selectedArea?.area_name ?? '',
        },
      }));
    }
  }, [city_id, zone_id, area_id, cityList, zoneList, areaList]);

  useEffect(() => {
    fetchZonesAndAreas();
  }, [customerAddress.city?.id]);

  useEffect(() => {
    fetchAreas();
  }, [customerAddress.zone?.id]);

  console.log('selected customer info', selectedCustomerInfo);

  return (
    <Card className="px-0 flex-grow  border-0 rounded-none border-r">
      <CardHeader className="p-space12">
        <CardTitle className="border-b pb-space12 border-gray-200 flex justify-between items-center">
          <p className="text-md font-semibold">Add Order Details</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-space12 max-h-[calc(100vh-220px)] overflow-y-auto">
        <div className="space-y-space12">
          <div className="border border-gray-200 rounded-sm p-space12 space-y-space8">
            <div className="border-b border-gray-200 rounded-sm pb-space12">
              {selectedCustomer ? (
                <div className="duration-500 ease-out">
                  <Card className="bg-gray-50 flex !p-space8 border-none">
                    <div className="flex items-center gap-space8 ">
                      <Image
                        src={selectedCustomer?.image}
                        height={36}
                        width={36}
                        alt={selectedCustomer?.name ?? 'Image of customer'}
                      />
                      <article className="space-y-[2px] text-xs">
                        <p className="text-gray-700 font-semibold text-sm">
                          {selectedCustomer?.name}
                        </p>
                        <p className="text-gray-500">
                          {selectedCustomer?.phone} ,{' '}
                          <span>#ID: {selectedCustomer?.id}</span>
                        </p>
                      </article>
                    </div>
                    <X
                      className="ml-auto hover:text-black text-gray-500 hover:cursor-pointer"
                      size={18}
                      onClick={() => {
                        setSelectedCustomer(null);
                        setSelectedCustomerInfo(null);
                        form.setValue('customer_id', undefined);
                        form.setValue('name', '');
                        form.setValue('phone', '');
                        form.setValue('address', '');
                      }}
                    />
                  </Card>
                </div>
              ) : (
                <UserSearchAndSelect
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  setSelectedCustomerInfo={setSelectedCustomerInfo}
                  customers={customers}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex text-sm font-medium items-center gap-space6">
              Contact Number
              <CustomerInfoWithSummary
                customer={selectedCustomer}
                customer_info={selectedCustomerInfo}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g. 0123456789"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-space8">
                      <Input
                        placeholder="Enter Address"
                        {...field}
                        value={field.value ?? ''}
                      />
                      <Button
                        type="button"
                        onClick={handleAddressParseClick}
                        className="bg-gray-100 text-black hover:bg-gray-200 rounded-full p-2"
                        disabled={
                          !field.value ||
                          loading.city ||
                          loading.zone ||
                          loading.area ||
                          addressParseLoading
                        }
                        loader={
                          loading.city ||
                          loading.zone ||
                          loading.area ||
                          addressParseLoading
                        }
                      >
                        <MapPinHouse />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-space4 pb-space16 flex flex-col gap-space12 space-y-space4 text-gray-800 text-sm font-medium">
              <div className="space-y-space8 flex flex-col">
                <FormField
                  control={form.control}
                  name="location_type"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Location Type</FormLabel>
                        <Select
                          onValueChange={(val) => {
                            const [location, price] = val.split('/');
                            form.setValue('location_type', val);
                            form.setValue('delivery_fee', price);
                            field.onChange(val);
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              {/* No defaultValue */}
                              <SelectValue placeholder="Select a location type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {deliveryFee?.shipping_costs?.map((val) => {
                              return (
                                <SelectItem
                                  key={`${val.key}/${val.value}`}
                                  value={`${val.key}/${val.value}`}
                                  className="capitalize"
                                >
                                  {val.key} - {val.value}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="space-y-space8 flex flex-col">
                <p className="text-sm font-medium">City</p>
                <SelectorWithSearch
                  options={cityList.map((city) => ({
                    label: city.city_name,
                    value: `${city.city_id}_${city.city_name.toLowerCase()}`,
                  }))}
                  value={
                    customerAddress.city?.id && customerAddress.city?.val
                      ? `${customerAddress.city.id}_${customerAddress.city.val.toLowerCase()}`
                      : ''
                  }
                  onChange={(val) => {
                    const [id, label] = val.split('_');
                    setCustomerAddress({
                      ...customerAddress,
                      city: {
                        id,
                        val: label,
                      },
                      zone: { id: '', val: '' },
                      area: { id: '', val: '' },
                    });
                  }}
                  placeholder="Select City"
                  loading={loading.city}
                  disable={loading.city || loading.zone || loading.area}
                  containerClass="w-[100vw] max-w-[400px]"
                />
              </div>

              <div className="space-y-space8 flex flex-col">
                <p className="text-sm font-medium">Zone</p>
                <SelectorWithSearch
                  options={
                    zoneList?.map((zone) => ({
                      label: zone.zone_name,
                      value: `${zone.zone_id}_${zone.zone_name.toLowerCase()}`,
                    })) ?? []
                  }
                  value={
                    customerAddress.zone?.id && customerAddress.zone?.val
                      ? `${customerAddress.zone.id}_${customerAddress.zone.val.toLowerCase()}`
                      : ''
                  }
                  onChange={(val) => {
                    const [id, label] = val.split('_');
                    setCustomerAddress({
                      ...customerAddress,
                      zone: {
                        id,
                        val: label,
                      },
                      area: { id: '', val: '' },
                    });
                  }}
                  placeholder="Select Zone"
                  loading={loading.zone}
                  disable={loading.city || loading.zone || loading.area}
                  containerClass="w-[100vw] max-w-[400px]"
                />
              </div>

              <div className="space-y-space8 flex flex-col">
                <p className="text-sm font-medium">Area</p>
                <SelectorWithSearch
                  options={
                    areaList?.map((area) => ({
                      label: area.area_name,
                      value: `${area.area_id}_${area.area_name.toLowerCase()}`,
                    })) ?? []
                  }
                  value={
                    customerAddress.area?.id && customerAddress.area?.val
                      ? `${customerAddress.area.id}_${customerAddress.area.val.toLowerCase()}`
                      : ''
                  }
                  onChange={(val) => {
                    const [id, label] = val.split('_');
                    setCustomerAddress({
                      ...customerAddress,
                      area: {
                        id,
                        val: label,
                      },
                    });
                  }}
                  placeholder="Select Area"
                  loading={loading.area}
                  disable={loading.city || loading.zone || loading.area}
                  containerClass="w-[100vw] max-w-[400px]"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-sm p-space12">
            <p className="py-space4 mb-space12 border-b">Add Discount</p>
            <FormField
              control={form.control}
              name="discount_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? 'fixed'}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="state-[selected]:text-black">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch('discount_type') == 'percentage'
                      ? 'Discount Percentage'
                      : 'Discount Amount'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.watch('discount_type') == 'fixed'
                          ? 'Enter discount amount in number'
                          : 'Enter discount amount in %'
                      }
                      {...field}
                      value={field.value ?? 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="border space-y-space6 border-gray-200 rounded-sm p-space12 mt-space12">
          <FormField
            control={form.control}
            name="staff_note"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Staff Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter note"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="No note found"
                    {...field}
                    value={field.value ?? ''}
                    readOnly
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerAndOrderDetailsForm;
