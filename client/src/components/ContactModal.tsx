import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const mutation = useCreateInquiry();
  
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-sm border-none shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-serif text-navy">Contact The Institute</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please fill out the form below. Our team will respond to your inquiry shortly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy font-semibold">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="rounded-sm border-gray-200 focus:border-navy focus:ring-navy/10" />
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
                  <FormLabel className="text-navy font-semibold">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@organization.org" {...field} className="rounded-sm border-gray-200 focus:border-navy focus:ring-navy/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy font-semibold">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Inquiry about..." {...field} className="rounded-sm border-gray-200 focus:border-navy focus:ring-navy/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-navy font-semibold">Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How can we assist you?" 
                      className="min-h-[120px] rounded-sm border-gray-200 focus:border-navy focus:ring-navy/10" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="bg-navy hover:bg-navy/90 text-white rounded-sm px-8"
              >
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mutation.isPending ? "Sending..." : "Submit Inquiry"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
