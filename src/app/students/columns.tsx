'use client';

import { students } from '@prisma/client';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<students>[] = [
  {
    accessorKey: 'first_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('is_active');
      // TODO: change to badge
      if (status === true) {
        return (
          <div className="inline-block bg-green-200 text-green-800 rounded-full px-2 py-1 font-medium">
            Active
          </div>
        );
      } else {
        return (
          <div className="inline-block bg-red-200 text-red-800 rounded-full px-2 py-1 font-medium">
            Inactive
          </div>
        );
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
