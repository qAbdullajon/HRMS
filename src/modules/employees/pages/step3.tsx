import { useCallback, useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, UploadCloud, X } from 'lucide-react';
import { addDocuments, removeDocument } from '@/features/employees/step3';
import type { TypeEmployee, FileWithMeta } from '../types';

type DocumentField = 'appointmentLetter' | 'relivingLetter' | 'salarySlips' | 'experienceLetter';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

const StepThree = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step3State = useSelector((state: TypeEmployee) => state.StepThree.view);
  const [dragActive, setDragActive] = useState(false);
  
  const formSchema = useMemo(() => {
    return z.object({
      appointmentLetter: z
        .instanceof(FileList)
        .optional()
        .refine(
          (files) => (files && files.length > 0) || (step3State.appointmentLetter?.length ?? 0) > 0,
          'Tayinlash xati talab qilinadi'
        ),
      relivingLetter: z
        .instanceof(FileList)
        .optional()
        .refine(
          (files) => (files && files.length > 0) || (step3State.relivingLetter?.length ?? 0) > 0,
          'Ishdan bo‘shatish xati talab qilinadi'
        ),
      salarySlips: z
        .instanceof(FileList)
        .optional()
        .refine(
          (files) => (files && files.length > 0) || (step3State.salarySlips?.length ?? 0) > 0,
          'Oylik maosh varaqalari talab qilinadi'
        ),
      experienceLetter: z
        .instanceof(FileList)
        .optional()
        .refine(
          (files) => (files && files.length > 0) || (step3State.experienceLetter?.length ?? 0) > 0,
          'Tajriba xati talab qilinadi'
        ),
    });
  }, [step3State]);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointmentLetter: undefined,
      relivingLetter: undefined,
      salarySlips: undefined,
      experienceLetter: undefined,
    },
  });

  const validateFile = (file: File) => ACCEPTED_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: { onChange: (files: FileList | null) => void }, name: DocumentField) => {
      if (e.target.files && e.target.files.length > 0) {
        const validFiles = Array.from(e.target.files)
          .filter(validateFile)
          .slice(0, 5 - (step3State[name]?.length || 0));
        if (validFiles.length > 0) {
          const filesWithMeta = validFiles.map(file => ({
            id: uuidv4(),
            name: file.name,
            file,
            isExisting: false,
          }));
          field.onChange(e.target.files);
          dispatch(addDocuments({ field: name, files: filesWithMeta }));
        } else {
          form.setError(name, {
            message: 'Noto‘g‘ri fayl: faqat PDF, JPEG, JPG yoki PNG, maksimal 5MB',
          });
        }
      }
    },
    [dispatch, form, step3State]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, field: { onChange: (files: FileList | null) => void }, name: DocumentField) => {
      e.preventDefault();
      handleDrag(e, false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const validFiles = Array.from(e.dataTransfer.files)
          .filter(validateFile)
          .slice(0, 5 - (step3State[name]?.length || 0));
        if (validFiles.length > 0) {
          const filesWithMeta = validFiles.map(file => ({
            id: uuidv4(),
            name: file.name,
            file,
            isExisting: false,
          }));
          field.onChange(e.dataTransfer.files);
          dispatch(addDocuments({ field: name, files: filesWithMeta }));
        } else {
          form.setError(name, {
            message: 'Noto‘g‘ri fayl: faqat PDF, JPEG, JPG yoki PNG, maksimal 5MB',
          });
        }
      }
    },
    [dispatch, form, step3State]
  );

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent, field: DocumentField, id: string) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(removeDocument({ field, id }));
      form.trigger();
    },
    [dispatch, form]
  );

  const handleDrag = useCallback((e: React.DragEvent, isActive: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(isActive);
  }, []);

  const handleView = (e: React.MouseEvent<HTMLButtonElement>, file: FileWithMeta) => {
    e.preventDefault();
    e.stopPropagation();
    if (file.url) {
      window.open(`http://localhost:5000${file.url}`, '_blank');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = useCallback(() => {
    navigate('/employees/add/step-four');
  }, [navigate]);

  const FileUploadField = ({ name, label }: { name: DocumentField; label: string }) => {
    const files = step3State[name] || [];

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, field, name)}
                onClick={() => document.getElementById(name)?.click()}
              >
                <input
                  id={name}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="hidden"
                  onChange={(e) => handleChange(e, field, name)}
                  aria-label={`Upload ${label.toLowerCase()}`}
                />
                <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm font-medium">Fayllarni sudrab olib keling yoki tanlang</p>
                <p className="text-sm text-gray-500">Qo‘llab-quvvatlanadigan formatlar: JPEG, PDF (maksimal 5 ta fayl, har biri 5MB)</p>
                {files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {files.map((file: FileWithMeta) => (
                      <div key={file.id} className="flex items-center justify-between text-sm">
                        <span className="text-blue-600 font-medium truncate max-w-[200px]">{file.name}</span>
                        <div className='flex items-center'>
                          {file.url?.slice(0, 4) === '/fil' && (
                            <button
                              type="button"
                              {...({ target: '_blank' } as any)}
                              onClick={(e) => handleView(e, file)}
                              className='mr-2 cursor-pointer'
                            >
                              <Eye className='w-5 h-5' />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => handleRemoveFile(e, name, file.id)}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="min-h-screen p-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadField name="appointmentLetter" label="Tayinlash xati" />
            <FileUploadField name="relivingLetter" label="Ishdan bo‘shatish xati" />
            <FileUploadField name="salarySlips" label="Oylik maosh varaqalari" />
            <FileUploadField name="experienceLetter" label="Tajriba xati" />
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employees/add/step-two')}
              aria-label="Oldingi qadamga qaytish"
            >
              Oldingi
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-fit text-white"
              aria-label="Keyingi qadamga o‘tish"
            >
              Keyingi
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepThree;