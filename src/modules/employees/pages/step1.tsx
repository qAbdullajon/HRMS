import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Camera, X } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  firstName: z.string().min(3, { message: "First name must be at least 3 characters." }),
  lastName: z.string().min(3, { message: "Last name must be at least 3 characters." }),
  mobileNumber: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
  emailAddress: z.string().email({ message: "Please enter a valid email address." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),
  maritalStatus: z.string().min(1, { message: "Please select marital status." }),
  gender: z.string().min(1, { message: "Please select gender." }),
  nationality: z.string().min(1, { message: "Please select nationality." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(1, { message: "Please select city." }),
  state: z.string().min(1, { message: "Please select state." }),
  zipCode: z.string().min(1, { message: "Please select ZIP code." }),
});
type FormValues = z.infer<typeof formSchema>;

const StepOne = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      emailAddress: "",
      dateOfBirth: "",
      maritalStatus: "",
      gender: "",
      nationality: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    },
  });
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div className="flex gap-2">
          {imagePreview ? (
            <div className="relative">
              <Avatar className="w-[100px] h-[100px] rounded-2xl border border-gray-200">
                <AvatarImage src={imagePreview} alt="Profile" />
                <AvatarFallback className="bg-gray-200 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input inputSize='lg' placeholder="First Name" {...field} />
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
                  <Input inputSize='lg' placeholder="Last Name" {...field} />
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
                  <Input inputSize='lg' placeholder="Mobile Number" {...field} />
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
                  <Input inputSize='lg' placeholder="Email Address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            rules={{ required: "Date of Birth is required" }} // required qo‘shildi
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
                          className={`pr-10 cursor-pointer ${fieldState.invalid ? "border-red-500" : ""}`}
                          value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
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
                          field.onChange(date?.toISOString().split("T")[0] ?? "");
                          setOpen(false);
                        }}
                        initialFocus
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
                    <SelectTrigger size='lg'>
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
                    <SelectTrigger size='lg'>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                    <SelectTrigger size='lg'>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="uzbek">Uzbek</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="british">British</SelectItem>
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
                <Input inputSize='lg' placeholder="Full Address" {...field} />
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
                    <SelectTrigger size='lg'>
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
                    <SelectTrigger size='lg'>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger size='lg'>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            className="bg-primary-color w-fit hover:bg-primary-color/90"
            type='submit'
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default StepOne