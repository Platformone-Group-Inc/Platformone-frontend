import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  // identifier
  // question
  // guidance
  // category
  // sub category
  // relationships

  identifier: z.string(),
  question: z.string(),
  guidance: z.string(),
  category: z.string(),
  subCategory: z.string(),
  relationship: z.string(),
  // identifier:z.string(),
  // identifier:z.string(),
});

// might not need this
interface Props {
  onCreate?: () => void;
  onClose?: () => void;
}

const AssessmentQuestionForm: React.FC<Props> = ({
  onCreate = () => {},
  onClose = () => {},
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      question: "",
      guidance: "",
      category: "",
      subCategory: "",
      relationship: "",
      // category:"",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onCreate();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white"
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Unique Identifer (Upto 12 alphanumeric) for this question
              </FormLabel>
              <FormControl>
                <Input placeholder="SA-03" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Lorem ipsum dolor sit amet consectetur. Lectus vulputate scelerisque pellentesque suspendisse."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guidance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guidance</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Lorem ipsum dolor sit amet consectetur. Lectus vulputate scelerisque pellentesque suspendisse."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Unique Identifer (Upto 12 alphanumeric) for this question
              </FormLabel>
              <FormControl>
                <Input placeholder="SA-03" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Sub Category" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          <Button variant={"secondary"} type="button" onClick={onClose}>
            Close
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
};

export default AssessmentQuestionForm;
