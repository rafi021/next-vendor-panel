'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Direct URL approach without any imports that might use hooks internally
const API_ENDPOINT =
  'https://molymart.codemoly.io/api/v1/stocks-report-download';

const StockReportExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    // try {
    //   setIsExporting(true);

    //   // Get the token from cookies directly
    //   const accessToken = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('access_token='))
    //     ?.split('=')[1];

    //   // Call the API endpoint to generate the PDF
    //   const response = await fetch(API_ENDPOINT, {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/pdf',
    //       Authorization: accessToken ? `Bearer ${accessToken}` : '',
    //     },
    //     credentials: 'include',
    //   });

    //   if (!response.ok) {
    //     throw new Error(`API request failed with status ${response.status}`);
    //   }

    //   // Get the blob from the response
    //   const blob = await response.blob();

    //   // Create a URL for the blob
    //   const url = window.URL.createObjectURL(blob);

    //   // Create a temporary anchor element
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute(
    //     'download',
    //     `stock-report-${new Date().toISOString().split('T')[0]}.pdf`,
    //   );

    //   // Append to the document, click it, and remove it
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);

    //   // Clean up the URL object
    //   window.URL.revokeObjectURL(url);

    //   toast.success('Stock report downloaded successfully');
    // } catch (error) {
    //   console.error('Error exporting stock report:', error);
    //   toast.error('Failed to download stock report');
    // } finally {
    //   setIsExporting(false);
    // }
  };

  return (
    <div>
      <button
        className="border p-2 px-4 flex gap-2 rounded-lg items-center justify-center"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 9L13 9.8C13 10.9201 13 11.4802 12.782 11.908C12.5903 12.2843 12.2843 12.5903 11.908 12.782C11.4802 13 10.9201 13 9.8 13L4.2 13C3.07989 13 2.51984 13 2.09202 12.782C1.71569 12.5903 1.40973 12.2843 1.21799 11.908C0.999998 11.4802 0.999998 10.9201 0.999998 9.8L0.999999 9M10.3333 5.66667L7 9M7 9L3.66667 5.66667M7 9L7 1"
              stroke="#717680"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isExporting ? 'Exporting...' : 'Export'}
      </button>
    </div>
  );
};

export default StockReportExport;
