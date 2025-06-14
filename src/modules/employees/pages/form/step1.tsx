import ConfirmLeaveModal from '@/components/confirm-leave-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setDeleteAvatar, setImageFile, setImagePreview, updateStepOne } from '@/features/employees/step1';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Camera, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import type { EmployeeType } from '../../types';

const formSchema = z.object({
  firstName: z.string().min(3, { message: 'First name must be at least 3 characters.' }),
  lastName: z.string().min(3, { message: 'Last name must be at least 3 characters.' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 digits.' })
    .regex(/^\+?\d+$/, { message: 'Mobile number must contain only digits.' }),
  emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Sana YYYY-MM-DD formatida bo‘lishi kerak')
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: 'Yaroqli sana kiriting',
    }),
  maritalStatus: z.string().min(1, { message: 'Please select marital status.' }),
  gender: z.string().min(1, { message: 'Please select gender.' }),
  nationality: z.string().min(1, { message: 'Please select nationality.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(1, { message: 'Please select city.' }),
  state: z.string().min(1, { message: 'Please select state.' }),
  zipCode: z.string().min(1, { message: 'Please enter ZIP code.' }),
});

type FormValues = z.infer<typeof formSchema>;

const StepOne = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step1Values = useSelector((state: EmployeeType) => state.StepOne);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: step1Values.stepOne || {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      emailAddress: '',
      dateOfBirth: '',
      maritalStatus: '',
      gender: '',
      nationality: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        form.setError('root', { message: 'Only JPEG and PNG images are allowed.' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        form.setError('root', { message: 'Image size must be less than 5MB.' });
        return;
      }
      console.log(file);
      
      dispatch(setImageFile(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImagePreview(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    dispatch(setImagePreview(null));
    dispatch(setImageFile(null));
    dispatch(setDeleteAvatar())
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLeave = () => {
    navigate('/employees');
  };

  const onSubmit = (values: FormValues) => {
    dispatch(updateStepOne(values));
    
    navigate('/employees/add/step-two');
  };

  return (
    <div className="min-h-screen p-4">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload */}
            <div className="flex gap-2">
              {step1Values.stepOne.imagePath || step1Values.stepOne.imageFile ? (
                <div className="relative">
                  <Avatar className="w-[100px] h-[100px] rounded-2xl border border-gray-200">
                    <AvatarImage src={step1Values.stepOne.imagePath ? `http://localhost:5000${step1Values.stepOne.imagePath as string}` : step1Values.stepOne.imagePreview as string} alt="Profile preview" />
                    <AvatarFallback className="bg-gray-200 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    aria-label="Remove profile image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Avatar className="w-[100px] h-[100px] rounded-2xl">
                    <AvatarFallback className="bg-gray-200 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </label>
              )}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload profile image"
              />
            </div>
            {form.formState.errors.root && (
              <p className="text-red-600 text-sm">{form.formState.errors.root.message}</p>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        inputSize="lg"
                        placeholder="First Name"
                        {...field}
                        aria-label="First Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        inputSize="lg"
                        placeholder="Last Name"
                        {...field}
                        aria-label="Last Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        inputSize="lg"
                        placeholder="Mobile Number"
                        type="tel"
                        {...field}
                        aria-label="Mobile Number"
                      />
                    </FormControl>
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
                      <Input
                        inputSize="lg"
                        placeholder="Email Address"
                        type="email"
                        {...field}
                        aria-label="Email Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
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
                              placeholder="Select Date of Birth"
                              className={`pr-10 cursor-pointer ${fieldState.invalid ? 'border-red-500' : ''
                                }`}
                              value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                              onClick={() => setOpen(true)}
                              aria-label="Select Date of Birth"
                            />
                            <CalendarIcon className="w-5 h-5 text-gray-800 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => {
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
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger size="lg" aria-label="Select marital status">
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger size="lg" aria-label="Select gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger size="lg" aria-label="Select nationality">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="uzbek">Uzbek</SelectItem>
                        <SelectItem value="russian">Russian</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputSize="lg"
                      placeholder="Full Address"
                      {...field}
                      aria-label="Full Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger size="lg" aria-label="Select city">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tashkent">Tashkent</SelectItem>
                        <SelectItem value="samarkand">Samarkand</SelectItem>
                        <SelectItem value="bukhara">Bukhara</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger size="lg" aria-label="Select state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tashkent">Tashkent Region</SelectItem>
                        <SelectItem value="samarkand">Samarkand Region</SelectItem>
                        <SelectItem value="bukhara">Bukhara Region</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {field.value === 'other' ? (
                        <Input
                          inputSize="lg"
                          placeholder="Enter ZIP code"
                          {...field}
                          aria-label="ZIP Code"
                        />
                      ) : (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger size="lg" aria-label="Select ZIP code">
                              <SelectValue placeholder="Select ZIP code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="100000">100000</SelectItem>
                            <SelectItem value="100001">100001</SelectItem>
                            <SelectItem value="100002">100002</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                onClick={() => setShowModal(true)}
                type="button"
                variant="outline"
                aria-label="Cancel and return to employees list"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary-color hover:bg-primary-color/90 text-white w-fit"
                aria-label="Proceed to next step"
              >
                Next
              </Button>
            </div>
          </form>
          <ConfirmLeaveModal open={showModal} setOpen={setShowModal} onConfirm={handleLeave} title='Leave Without Saving?' desc="Are you sure you don't want to add the employee?" />
        </Form>
      </div>
    </div>
  );
};

export default StepOne;