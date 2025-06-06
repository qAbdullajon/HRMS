import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormValues = z.infer<typeof formSchema>;
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  slackId: z.string().min(1, { message: "Slack ID is required." }),
  skypeId: z.string().min(1, { message: "Skype ID is required." }),
  githubId: z.string().min(1, { message: "GitHub ID is required." }),
});

const StepFour = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      slackId: "",
      skypeId: "",
      githubId: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
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
            name="slackId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input inputSize="lg" placeholder="Slack ID" {...field} />
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
                <FormControl>
                  <Input inputSize="lg" placeholder="Skype ID" {...field} />
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
                <FormControl>
                  <Input inputSize="lg" placeholder="GitHub ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary-color w-fit hover:bg-primary-color/90">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepFour;
