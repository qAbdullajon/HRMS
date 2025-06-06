import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import { UploadCloud } from 'lucide-react'

const formSchema = z.object({
  appointmentLetter: z
    .any()
    .refine((files) => files?.length > 0, "Appointment letter is required"),
  relivingLetter: z
    .any()
    .refine((files) => files?.length > 0, "Reliving letter is required"),
  salarySlips: z
    .any()
    .refine((files) => files?.length > 0, "Salary slips are required"),
  experienceLetter: z
    .any()
    .refine((files) => files?.length > 0, "Experience letter is required"),
})

const StepThree = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointmentLetter: undefined,
      relivingLetter: undefined,
      salarySlips: undefined,
      experienceLetter: undefined,
    },
  })

  const [dragActive, setDragActive] = useState(false)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const handleDrag = useCallback((e: React.DragEvent, isActive: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(isActive)
  }, [])

  const FileUploadField = ({
    name,
    label,
    control,
  }: {
    name: 'appointmentLetter' | 'relivingLetter' | 'salarySlips' | 'experienceLetter'
    label: string
    control: any
  }) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">{label}</label>
            <FormControl>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  dragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleDrag(e, false)
                  if (e.dataTransfer.files) {
                    field.onChange(e.dataTransfer.files)
                  }
                }}
                onClick={() => document.getElementById(name)?.click()}
              >
                <input
                  id={name}
                  type="file"
                  accept=".pdf,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => field.onChange(e.target.files)}
                />
                <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 font-medium">Drag & Drop or choose file to upload</p>
                <p className="text-sm text-gray-500">Supported formats: Jpeg, pdf</p>
                {field.value?.[0]?.name && (
                  <p className="mt-2 text-sm text-primary font-medium">
                    Selected: {field.value[0].name}
                  </p>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <FileUploadField
            name="appointmentLetter"
            label="Upload Appointment Letter"
            control={form.control}
          />

          <FileUploadField
            name="relivingLetter"
            label="Upload Reliving Letter"
            control={form.control}
          />

          <FileUploadField
            name="salarySlips"
            label="Upload Salary Slips"
            control={form.control}
          />

          <FileUploadField
            name="experienceLetter"
            label="Upload Experience Letter"
            control={form.control}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary-color w-fit hover:bg-primary-color/90">
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default StepThree