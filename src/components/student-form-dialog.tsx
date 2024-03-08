'use client';
import { Button } from '@/components/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { toast } from 'sonner';
import {
  StudentFormValues,
  studentFormSchema,
} from '@/server/schema/students.schema';
import { trpc } from '@/app/_trpc/client';
import { useContext } from 'react';
import { UpdateStudentsContext } from '@/app/students/students-table';

export interface StudentFormDialogProps {
  editMode: boolean;
  studentToEdit?: StudentFormValues;
}

const defaultValues: Partial<StudentFormValues> = {
  email: '',
  first_name: '',
  last_name: '',
  identification_number: '',
  mobile_number: '',
  date_of_join: new Date(),
  is_active: true,
  alias: '',
  has_medical_condition: false,
};

export function StudentFormDialog({
  editMode,
  studentToEdit,
}: Readonly<StudentFormDialogProps>) {
  const updateStudentsContext = useContext(UpdateStudentsContext);
  const isEditMode = editMode && studentToEdit;

  const { mutate: addStudentMutation } = trpc.createStudent.useMutation({
    onSuccess: () => {
      updateStudentsContext.handleStudentRefetch();
    },
    onError: (err) => {
      console.log('error', err);
    },
  });
  const { mutate: updateStudentMutation } = trpc.updateStudent.useMutation({
    onSuccess: () => {
      updateStudentsContext.handleStudentRefetch();
    },
    onError: (err) => {
      console.log('error', err);
    },
  });

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: isEditMode ? studentToEdit : defaultValues,
    mode: 'onChange',
  });

  const { formState } = form;

  const handleCancel = () => {
    form.reset();
  };

  const onSubmit: SubmitHandler<StudentFormValues> = (student) => {
    try {
      if (isEditMode) {
        updateStudentMutation(student);
      } else {
        addStudentMutation(student);
      }
      toast.success(
        `Student ${student.first_name} ${student.last_name} added successfully`,
      );
      form.reset();
    } catch (e) {
      console.error(e);
      toast.error('An error occurred');
    }
  };

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          {isEditMode ? (
            <Button variant="ghost">
              <Pencil2Icon />
            </Button>
          ) : (
            <Button variant="outline">Add Student</Button>
          )}
        </DialogTrigger>
        <ScrollArea>
          <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? 'Edit Student' : 'Add Student'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  name="date_of_birthday"
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
                  name="has_medical_condition"
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
                    {isEditMode ? 'Save' : 'Add'}
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
