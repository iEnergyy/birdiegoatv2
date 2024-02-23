'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { Switch } from '@/components/ui/switch';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const studentFormSchema = z.object({
  first_name: z.string({ required_error: 'Please add a first name.' }),
  last_name: z.string({ required_error: 'Please add a last name.' }),
  email: z.string({ required_error: 'Please add an email.' }).email(),
  identification_number: z.coerce
    .number({ required_error: 'Please add a valid identification number' })
    .refine(
      (value) => {
        const stringValue = String(value);
        return stringValue.length === 11 && /^\d+$/.test(stringValue);
      },
      {
        message: 'Identification number must be a number with 11 digits.',
      },
    ),

  mobile_number: z.coerce.number().refine(
    (value) => {
      const stringValue = String(value);
      return stringValue.length === 10 && /^\d+$/.test(stringValue);
    },
    {
      message: 'Mobile number must be a number with 10 digits.',
    },
  ),
  alias: z.string().optional().or(z.literal('')),
  date_of_birth: z.coerce.date({
    required_error: 'Please add a date of birth.',
  }),
  date_of_join: z.coerce.date({ required_error: 'Please add a date of join.' }),
  has_medical_conditions: z.boolean(),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

const defaultValues: Partial<StudentFormValues> = {
  alias: '',
  date_of_join: new Date(),
  has_medical_conditions: false,
};

export function AddStudentDialog() {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { formState } = form;

  function handleCancel() {
    form.reset();
  }

  function onSubmit(data: StudentFormValues) {
    form.reset();
    console.log(data);
  }

  return (
    <Form {...form}>
      <Dialog onOpenChange={handleCancel}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Student</Button>
        </DialogTrigger>
        <ScrollArea>
          <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Student</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="first_name"
                          placeholder="First name"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="last_name"
                          placeholder="Last name"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Email"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="identification_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Number</FormLabel>
                      <FormControl>
                        <Input
                          id="identification_number"
                          placeholder="00100101010"
                          className="col-span-3"
                          maxLength={11}
                          // type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          id="identification_number"
                          placeholder="8097771010"
                          className="col-span-3"
                          maxLength={10}
                          // type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alias"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alias</FormLabel>
                      <FormControl>
                        <Input
                          id="alias"
                          placeholder="Alias"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date_of_join"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Join</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="has_medical_conditions"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormLabel>Has medical condition?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" disabled={!formState.isValid}>
                    Add
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </ScrollArea>
      </Dialog>
    </Form>
  );
}
