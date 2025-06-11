import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { updateStepTwoValues } from '@/features/employees/step2';
import type { EmployeeType } from '../types';

const formSchema = z.object({
  employeeid: z.string().min(1, { message: 'Employee ID is required.' }),
  userName: z.string().min(1, { message: 'User Name is required.' }),
  employeeType: z.string().min(1, { message: 'Please select employee type.' }),
  department: z.string().min(1, { message: 'Please select department.' }),
  designation: z.string().min(1, { message: 'Please select designation.' }),
  workDays: z.string().min(1, { message: 'Please select work type.' }),
  joiningDate: z.string().min(1, { message: 'Joining date is required.' }),
  workLocation: z.string().min(1, { message: 'Please select work location.' }),
  emailAddress: z.string().email({ message: 'Invalid email address.' }),
});

type FormValues = z.infer<typeof formSchema>;

const StepTwo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step2Values = useSelector((state: EmployeeType) => state.StepTwo);
  console.log(step2Values);
  
  const [open, setOpen] = useState(false);
  const [, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: step2Values,
  });

  const onSubmit = (values: FormValues) => {
    dispatch(updateStepTwoValues(values));
    navigate('/employees/add/step-three');
  };

  const handlePrevious = () => {
    navigate('/employees/add');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="employeeid"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input inputSize="lg" placeholder="Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input inputSize="lg" placeholder="User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeType"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                  <FormControl>
                    <SelectTrigger size="lg">
                      <SelectValue placeholder="Select Employee Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input inputSize="lg" placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                  <FormControl>
                    <SelectTrigger size="lg">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="pm">Project Management</SelectItem>
                    <SelectItem value="ba">Business Analysis</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input inputSize="lg" placeholder="Enter Designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workDays"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                  <FormControl>
                    <SelectTrigger size="lg">
                      <SelectValue placeholder="Select Working Days" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-5 days">1-5 days</SelectItem>
                    <SelectItem value="5-10 days">5-10 days</SelectItem>
                    <SelectItem value="10-30 days">10-30 days</SelectItem>
                    <SelectItem value="1-2 month">1-2 month</SelectItem>
                    <SelectItem value="2-3 month">2-3 month</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joiningDate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative w-full">
                        <Input
                          inputSize="lg"
                          {...field}
                          readOnly
                          placeholder="Select Joining Date"
                          className={`pr-10 cursor-pointer ${fieldState.invalid ? 'border-red-500' : ''}`}
                          value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                          onClick={() => setOpen(true)}
                        />
                        <CalendarIcon className="w-5 h-5 text-dark absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          field.onChange(date?.toISOString().split('T')[0] ?? '');
                          setOpen(false);
                        }}
                        initialFocus
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="workLocation"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                    <FormControl>
                      <SelectTrigger size="lg">
                        <SelectValue placeholder="Select Work Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-6">
          <Button onClick={handlePrevious} type="button" variant="outline">
            Prev
          </Button>
          <Button
            type="submit"
            className="bg-primary-color w-fit hover:bg-primary-color/90"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwo;