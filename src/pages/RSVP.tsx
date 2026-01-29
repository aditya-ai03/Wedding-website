import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import WeddingHeader from '@/components/WeddingHeader';
import WeddingFooter from '@/components/WeddingFooter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import background1 from '@/assets/background_1.png';
import background2 from '@/assets/background_2.png';
import envelopeFlap from '@/assets/envelope_flap.png';
import ganeshIcon from '@/assets/ganesh_icon.png';
import MobilePageWrapper from '@/components/MobilePageWrapper';
import { useIsMobile } from '@/hooks/use-mobile';
import belowSubmit from '@/assets/below-sub.png';

const rsvpSchema = z.object({
  attendance: z.enum(['accept', 'decline'], {
    required_error: 'Please select your attendance',
  }),
  numberOfGuests: z.string().min(1, 'Please enter number of guests').regex(/^\d+$/, 'Must be a number'),
  names: z.string().min(1, 'Please enter name(s)').max(200),
  dietaryRequirements: z.string().max(500).optional(),
  contactName: z.string().min(1, 'Please enter your name').max(100),
  phone: z.string().min(1, 'Please enter phone number').max(20),
  email: z.string().email('Please enter a valid email').max(255),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const RSVPPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: 'accept',
      numberOfGuests: '',
      names: '',
      dietaryRequirements: '',
      contactName: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare request payload
      const payload = {
        name: data.contactName,
        email: data.email,
        phone: data.phone,
        attendance: data.attendance,
        numberOfGuests: data.numberOfGuests,
        dietaryRequirements: data.dietaryRequirements || undefined,
        names: data.names || undefined,
      };

      // Send RSVP to API
      const response = await fetch('/api/send-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.details || 'Failed to submit RSVP');
      }

      // Success - show success toast
      toast({
        title: 'RSVP Submitted Successfully!',
        description: data.attendance === 'accept' 
          ? "We can't wait to celebrate with you!" 
          : "We're sorry you can't make it. You'll be missed!",
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      // Error - show error toast
      console.error('RSVP submission error:', error);
      toast({
        title: 'Failed to Submit RSVP',
        description: error instanceof Error 
          ? error.message 
          : 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobilePageWrapper>
        <motion.div
          className="w-[95%] max-w-md overflow-hidden rounded-t-[150px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header Section */}
          <WeddingHeader activeNav="RSVP" useTopLogo={true}/>

          {/* RSVP Title */}
          <section className="text-center px-4 md:px-8 py-6 mt-1 mb-1">
            <h1 className="font-cormorant text-4xl md:text-6xl text-primary tracking-[0.3em] mb-2 md:font-bold">
              R.S.V.P
            </h1>
         
          </section>

          {/* Form Card */}
          <div className="px-4 md:px-8 pb-8 md:mt-20">
            <div className="relative">
              {/* Envelope Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    <path d="M12 3v5M9 5l3-2 3 2" />
                  </svg>
                </div>
              </div>

              {/* Pink Border Card */}
              <div className="bg-blush rounded-2xl p-4 md:p-6 border-4 border-blush">
                {/* Inner Cream Card */}
                 <p className="font-lora text-sm md:text-xl text-primary text-center">
  Please respond before March 31<sup>st</sup>, 2026.
</p>
                <div className="bg-cream/90 rounded-xl p-6 md:p-8 border border-blush/50">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Attendance Selection */}
                      <FormField
                        control={form.control}
                        name="attendance"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-wrap justify-center gap-6 md:gap-10"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="accept" id="accept" className="border-primary" />
                                  <Label htmlFor="accept" className="flex items-center gap-1 font-cormorant text-sm md:text-base text-primary tracking-wider cursor-pointer">
                                    <Heart className="w-4 h-4 fill-primary text-primary" />
                                    JOYFULLY ACCEPT
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="decline" id="decline" className="border-primary" />
                                  <Label htmlFor="decline" className="flex items-center gap-1 font-cormorant text-sm md:text-base text-primary tracking-wider cursor-pointer">
                                    <Heart className="w-4 h-4 text-primary" />
                                    REGRETFULLY DECLINE
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Number of Guests */}
                      <FormField
                        control={form.control}
                        name="numberOfGuests"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-4">
                              <FormLabel className="font-cormorant text-sm md:text-base text-primary tracking-wider whitespace-nowrap">
                                NUMBER OF GUESTS
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  min="1"
                                  className="w-16 h-8 bg-white border-muted-foreground/30 text-center"
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Names */}
                      <FormField
                        control={form.control}
                        name="names"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-cormorant text-sm md:text-base text-primary tracking-wider">
                              NAME(S)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder=""
                                className="bg-white border-muted-foreground/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Dietary Requirements */}
                      <FormField
                        control={form.control}
                        name="dietaryRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-cormorant text-sm md:text-base text-primary tracking-wider">
                              DIETARY REQUIREMENTS:
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder=""
                                className="bg-white border-muted-foreground/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Contact Info */}
                      <div className="space-y-3">
                        <h3 className="font-cormorant text-sm md:text-base text-primary tracking-wider">
                          CONTACT INFO
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="NAME"
                                  className="bg-white border-muted-foreground/30 placeholder:text-muted-foreground/50 placeholder:font-cormorant placeholder:tracking-wider"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="PHONE"
                                  className="bg-white border-muted-foreground/30 placeholder:text-muted-foreground/50 placeholder:font-cormorant placeholder:tracking-wider"
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
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="email"
                                  placeholder="EMAIL"
                                  className="bg-white border-muted-foreground/30 placeholder:text-muted-foreground/50 placeholder:font-cormorant placeholder:tracking-wider"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-4">
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-cormorant tracking-[0.2em] px-10 py-2"
                        >
                          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                        </Button>
                      </div>
                    </form>
                  </Form>

                  {/* Decorative Element */}
                  <div className="flex justify-center mt-6">
                    <img 
                      src={belowSubmit} 
                      alt="" 
                      className="w-12 h-12 object-contain opacity-40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <WeddingFooter />
        </motion.div>
      </MobilePageWrapper>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="min-h-screen flex flex-col items-center py-4 px-4 md:px-8">
        {/* Envelope Flap at Top */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* <img 
            src={envelopeFlap} 
            alt="" 
            className="w-full h-auto object-contain"
            style={{ marginBottom: '-2px' }}
          /> */}
        </motion.div>

        {/* Main Card Container */}
        <motion.div
          className="w-[90%] max-w-md mx-auto rounded-t-[150px] overflow-hidden md:w-full md:max-w-none md:rounded-none md:mt-0 md:pt-10 md:clip-none"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            backgroundImage: `url(${background2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          {/* Header Section */}
          <WeddingHeader activeNav="RSVP" useTopLogo={true}/>

              {/* RSVP Title */}
              <section className="text-center px-4 md:px-8 py-6">
                <h1 className="font-cormorant text-4xl md:text-[145px] text-primary tracking-[0.1em] mb-2 font-semibold">
                  R.S.V.P
                </h1>
               
              </section>

              {/* Form Card */}
              <div className="px-4 md:px-8 pb-8 md:mt-20">
                <div className="relative">
                  
                  {/* Envelope Icon */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        <path d="M12 3v5M9 5l3-2 3 2" />
                      </svg>
                    </div>
                  </div>
                  

                  {/* Pink Border Card */}
                  <div className="bg-blush rounded-2xl p-4 md:p-6 border-4 border-blush">
                     <p className="font-lora text-xl text-primary text-center">
  Please respond before March 31<sup>st</sup>, 2026.
</p>

                    {/* Inner Cream Card */}
                    <div className="bg-cream/90 rounded-xl p-6 md:p-8 border border-blush/50">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {/* Attendance Selection */}
                          <FormField
                            control={form.control}
                            name="attendance"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-wrap justify-center gap-6 md:gap-10"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="accept" id="accept" className="border-primary" />
                                      <Label htmlFor="accept" className="flex items-center gap-1 font-cormorant text-sm md:text-base text-primary tracking-wider cursor-pointer">
                                        <Heart className="w-4 h-4 fill-primary text-primary" />
                                        JOYFULLY ACCEPT
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="decline" id="decline" className="border-primary" />
                                      <Label htmlFor="decline" className="flex items-center gap-1 font-cormorant text-sm md:text-base text-primary tracking-wider cursor-pointer">
                                        <Heart className="w-4 h-4 text-primary" />
                                        REGRETFULLY DECLINE
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Number of Guests */}
                          <FormField
                            control={form.control}
                            name="numberOfGuests"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-4">
                                  <FormLabel className="font-cormorant text-sm md:text-base text-primary tracking-wider whitespace-nowrap">
                                    NUMBER OF GUESTS
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      type="number" 
                                      min="1"
                                      className="w-16 h-8 bg-white border-muted-foreground/30 text-center"
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Names */}
                          <FormField
                            control={form.control}
                            name="names"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-cormorant text-sm md:text-base text-primary tracking-wider">
                                  NAME(S)
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder=""
                                    className="bg-white border-muted-foreground/30"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Dietary Requirements */}
                          <FormField
                            control={form.control}
                            name="dietaryRequirements"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-cormorant text-sm md:text-base text-primary tracking-wider">
                                  DIETARY REQUIREMENTS:
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder=""
                                    className="bg-white border-muted-foreground/30"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Contact Info */}
                          <div className="space-y-3">
                            <h3 className="font-cormorant text-sm md:text-base text-primary tracking-wider">
                              CONTACT INFO
                            </h3>

                            <FormField
                              control={form.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="NAME"
                                      className="bg-white border-muted-foreground/30 placeholder:text-muted-foreground/50 placeholder:font-cormorant placeholder:tracking-wider"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      placeholder="PHONE"
                                      className="bg-white border-muted-foreground/30 placeholder:text-muted-foreground/50 placeholder:font-cormorant placeholder:tracking-wider"
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
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      type="email"
                                      placeholder="EMAIL"
                                      className="bg-white border-muted-foreground/30 placeholder:text-muted-foreground/50 placeholder:font-cormorant placeholder:tracking-wider"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Submit Button */}
                          <div className="flex justify-center pt-4">
                            <Button 
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-cormorant tracking-[0.2em] px-10 py-2"
                            >
                              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                            </Button>
                          </div>
                        </form>
                      </Form>

                      {/* Decorative Element */}
                      <div className="flex justify-center mt-6">
                        <img 
                          src={belowSubmit} 
                          alt="" 
                          className="md:w-24 md:h-24 object-contain opacity-35"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          {/* Footer */}
          <WeddingFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default RSVPPage;
