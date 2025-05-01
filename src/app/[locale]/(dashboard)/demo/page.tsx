'use client';
import { useI18n } from '@/locales/client';
import React, { useState } from 'react';
import Buttons from '../../change/buttons';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import ImageDropify from '@/components/common/ImageDropify';
import BackButton from '@/components/common/back-button';
import SortAndFilterComponent from '@/components/common/SortAndFilterComponent';
import { useSearchParams } from 'next/navigation';
import { DateSelect } from '@/components/common/DateSelect';
import TextEditor, {
  PreviewEditor,
} from '@/components/common/forms/TextEditor';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/config/data';

// dnd imports

import { Reorder } from 'framer-motion';
import { ulid } from 'ulid';
const DemoPage = () => {
  // const t = await getI18n(); for server side rendering

  const [image, setImage] = useState<string>('');
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const filter = searchParams.get('filter');
  const page = searchParams.get('page');

  // // console.log(search, sort, filter, page);

  const [content, setContent] = useState('');

  // const handleFileUpload = async () => {
  //   const maxSizeInMB = 32; // Limit size in MB
  //   const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  //   // Initialize FormData
  //   const formData = new FormData();
  //   if (!image) {
  //     toast.error('Please select an image to upload');
  //     return;
  //   }
  //   formData.append('file', image);

  //   try {
  //     // Upload file
  //     const res = await api.post('/file/upload', formData);
  //     // console.log(res);
  //     if (res.success) {
  //       setImage(res.url);
  //       toast.success('File uploaded successfully!');
  //     } else {
  //       toast.error('File upload failed');
  //     }
  //   } catch (error) {
  //     // Improved error handling
  //     console.error('File upload error:', error);
  //     toast.error('An error occurred during file upload. Please try again.');
  //   }
  // };

  const t = useI18n();

  /**
      "first_page_url": "https://molymart.codemoly.io/api/v1/coupons?page=1",
      "from": 1,
      "last_page": 1,
      "last_page_url": "https://molymart.codemoly.io/api/v1/coupons?page=1",
      "next_page_url": null,
      "path": "https://molymart.codemoly.io/api/v1/coupons",
      "per_page": 10,
      "prev_page_url": null,
      "to": 3,
      "total": 3
   */

  const [items, setItems] = useState([
    {
      id: ulid(),
      slug: 'deals-of-the-week',
      limit: 20,
      title: 'Deals of the week',
      btn_text: 'See All',
      brand_ids: [9, 12],
      is_active: 1,
      view_type: 'grid',
      category_ids: [],
      section_type: 'product',
    },
    {
      id: ulid(),
      slug: 'offer',
      title: 'offer',
      counter: '1',
      tag_ids: [],
      btn_text: null,
      end_date: null,
      brand_ids: [],
      is_active: 1,
      start_date: null,
      description: null,
      category_ids: ['85'],
      counter_type: 'days',
      section_type: 'offer',
      offer_duration: 'loop',
      number_of_product: '10',
    },
    {
      id: ulid(),
      slug: 'eid-offer',
      title: 'eid offer',
      counter: '1',
      tag_ids: [],
      btn_text: null,
      end_date: null,
      brand_ids: [],
      is_active: 1,
      start_date: null,
      description: null,
      category_ids: ['85'],
      counter_type: 'days',
      section_type: 'offer',
      offer_duration: 'loop',
      number_of_product: '10',
    },
    {
      id: ulid(),
      slug: 'exclusive-offer',
      title: 'exclusive offer',
      counter: '1',
      tag_ids: [],
      btn_text: null,
      end_date: null,
      brand_ids: [],
      is_active: 1,
      start_date: null,
      description: null,
      category_ids: ['85'],
      counter_type: 'days',
      section_type: 'offer',
      offer_duration: 'loop',
      number_of_product: '10',
    },
    {
      id: ulid(),
      slug: 'fsdf',
      title: 'fsdf',
      counter: '1',
      tag_ids: [],
      btn_text: null,
      end_date: null,
      brand_ids: [],
      is_active: 1,
      start_date: null,
      description: null,
      category_ids: ['85'],
      counter_type: 'days',
      section_type: 'offer',
      offer_duration: 'loop',
      number_of_product: '10',
    },
  ]);

  // // console.log('----------------------------');
  // // console.log(items);
  // // console.log('----------------------------');

  return (
    <div className="px-10 py-4">
      <div className="bg-red-500 hover:bg-green-400 duration-300">sdfdsaf</div>
      <div className="text-xl font-semibold">DemoPage</div>
      <div className="container py-3">
        <p>Localization: {t('hello.world', { param: 'bro' })}</p>
        <Buttons />
        ffff
      </div>

      <div className="flex gap-space12">
        <Button>Primary</Button>
        <Button loader={true} disabled>
          Primary
        </Button>
        <Button variant="white">white</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger-outline">danger-outline</Button>
      </div>

      <div className="flex items-center py-4">
        <Switch id="airplane-mode" />
      </div>

      <div className="">
        <ImageDropify image={image} setImage={setImage} />
        {/* <Button onClick={handleFileUpload}>Upload Image</Button> */}
      </div>
      <div>
        <BackButton />
      </div>
      <div className="flex">
        <SortAndFilterComponent
          label="Sort"
          triggerClassName="rounded-r-none"
          fields={SORT_OPTIONS}
          containerClassName="w-54"
        />
        <SortAndFilterComponent
          fields={FILTER_OPTIONS}
          label="Filter"
          triggerClassName="rounded-l-none"
          containerClassName="w-26"
          align="end"
        />
        <DateSelect />
      </div>
      <TextEditor onChange={(value) => setContent(value)} />

      <PreviewEditor>{content}</PreviewEditor>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={(newItems) => {
          // console.log('Reordered items:', newItems);
          setItems(newItems);
        }}
        className="space-y-2"
      >
        {items.map((section) => (
          <Reorder.Item
            key={section.id}
            value={section}
            className="cursor-move bg-red-50 p-4 rounded shadow"
          >
            <div>{section.title}</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default DemoPage;
