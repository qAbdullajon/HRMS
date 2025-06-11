import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetStepOne } from '@/features/employees/step1';
import { resetStepTwo } from '@/features/employees/step2';
import { resetDocuments } from '@/features/employees/step3'; // Updated to use resetDocuments
import { resetStepFour, updateStepFourValues } from '@/features/employees/step4';
import { useEmployeeCreate, useUpdateEmployee } from '../hooks/useEmployee';
import type { EmployeeType } from '../types';

const formSchema = z.object({
  email: z.string().email({ message: 'Noto‘g‘ri email manzili.' }),
  slackId: z.string().min(1, { message: 'Slack ID talab qilinadi.' }),
  skypeId: z.string().min(1, { message: 'Skype ID talab qilinadi.' }),
  githubId: z.string().min(1, { message: 'GitHub ID talab qilinadi.' }),
});

type FormValues = z.infer<typeof formSchema>;

const StepFour = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { StepOne: stepOne, StepTwo: stepTwo, StepThree: stepThree, StepFour: stepFour } = useSelector(
    (state: EmployeeType) => state
  );
  const isEditMode = stepOne.isEditing;

  const { mutate: createEmployee, isPending: isCreating, error: createError } = useEmployeeCreate();
  const { mutate: updateEmployee, isPending: isUpdating, error: updateError } = useUpdateEmployee();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: stepFour,
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    dispatch(updateStepFourValues(values));

    const formData = new FormData();

    // Step 1: Handle avatar image
    if (stepOne.stepOne.imageFile) {
      formData.append('avatarImage', stepOne.stepOne.imageFile);
    }
    if (isEditMode && stepOne.isDeleteAvatar) {
      formData.append('isDeleteAvatar', 'true');
    }

    // Step 1: Prepare stepOne data
    const stepOneData = { ...stepOne.stepOne, isDeleteAvatar: stepOne.isDeleteAvatar, imageFile: "", imagePreview: "" };

    formData.append('stepOne', JSON.stringify(stepOneData));

    // Step 2: Prepare stepTwo data
    formData.append('stepTwo', JSON.stringify(stepTwo));

    const stepThreeData = {
      view: {
        appointmentLetter: stepThree.view.appointmentLetter.filter((doc: any) => doc.url.slice(0, 4) === '/fil' && ({
          id: doc.id,
          name: doc.name,
          url: doc.url,
          isExisting: doc.isExisting,
        })),
        relivingLetter: stepThree.view.relivingLetter.filter((doc: any) => doc.url.slice(0, 4) === '/fil' && ({
          id: doc.id,
          name: doc.name,
          url: doc.url,
          isExisting: doc.isExisting,
        })),
        salarySlips: stepThree.view.salarySlips.filter((doc: any) => doc.url.slice(0, 4) === '/fil' && ({
          id: doc.id,
          name: doc.name,
          url: doc.url,
          isExisting: doc.isExisting,
        })),
        experienceLetter: stepThree.view.experienceLetter.filter((doc: any) => doc.url.slice(0, 4) === '/fil' && ({
          id: doc.id,
          name: doc.name,
          url: doc.url,
          isExisting: doc.isExisting,
        })),
      },
      delete: {
        appointmentLetter: stepThree.delete.appointmentLetter,
        relivingLetter: stepThree.delete.relivingLetter,
        salarySlips: stepThree.delete.salarySlips,
        experienceLetter: stepThree.delete.experienceLetter,
      },
    };
    console.log(stepThree);

    formData.append('stepThree', JSON.stringify(stepThreeData));

    // Append new files from stepThree.files
    stepThree.files.appointmentLetter.forEach((file) => {
      if (file.file) formData.append('appointmentLetter', file.file);
    });
    stepThree.files.relivingLetter.forEach((file) => {
      if (file.file) formData.append('relivingLetter', file.file);
    });
    stepThree.files.salarySlips.forEach((file) => {
      if (file.file) formData.append('salarySlips', file.file);
    });
    stepThree.files.experienceLetter.forEach((file) => {
      if (file.file) formData.append('experienceLetter', file.file);
    });

    // Step 4: Append stepFour data
    formData.append('stepFour', JSON.stringify(values));

    const options = {
      onSuccess: () => {
        dispatch(resetStepOne());
        dispatch(resetStepTwo());
        dispatch(resetDocuments());
        dispatch(resetStepFour());
        navigate('/employees');
      },
      onError: (error: any) => {
        console.error('Failed to submit employee data:', error.message);
        form.setError('root', { message: 'Yuborish muvaffaqiyatsiz bo‘ldi. Iltimos, qayta urinib ko‘ring.' });
      },
    };

    if (isEditMode) {
      updateEmployee({ id: stepOne.stepOne.employeeId as string, formData }, options);
    } else {
      createEmployee(formData, options);
    }
  };

  const handlePrevious = () => {
    navigate('/employees/add/step-three');
  };

  return (
    <div className="min-h-screen p-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {form.formState.errors.root && (
            <div className="bg-red-100 border border-red-400 text-red-600 p-4 rounded-md">
              {form.formState.errors.root.message}
            </div>
          )}
          {(createError || updateError) && (
            <div className="bg-red-600 text-white p-4 rounded-md">
              Xato: {(createError || updateError)?.message || 'Xato yuz berdi.'}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email manzili</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="lg"
                      placeholder="Email manzilini kiriting"
                      type="email"
                      {...field}
                      aria-label="Email manzili"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slackId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slack ID</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="lg"
                      placeholder="Slack IDni kiriting"
                      {...field}
                      aria-label="Slack ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skype ID</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="lg"
                      placeholder="Skype IDni kiriting"
                      {...field}
                      aria-label="Skype ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub ID</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="lg"
                      placeholder="GitHub IDni kiriting"
                      {...field}
                      aria-label="GitHub ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              aria-label="Oldingi qadamga o‘tish"
            >
              Oldingi
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-fit"
              disabled={isCreating || isUpdating}
              aria-label={isEditMode ? 'Xodim ma‘lumotlarini yangilash' : 'Xodim ma‘lumotlarini yuborish'}
            >
              {isCreating || isUpdating ? 'Yuborilmoqda...' : isEditMode ? 'Yangilash' : 'Yuborish'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepFour;