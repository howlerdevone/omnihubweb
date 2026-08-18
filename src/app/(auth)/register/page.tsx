'use client';
import { Banner } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/custom';
import { HTTP_STATUS } from '@/lib/http/http-status';
import { CustomHttpHeaders } from '@/lib/http/http.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Cpu, EyeOff, KeyRound, Mail, Share2, User, UserLock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstname: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must not exceed 50 characters'),
    lastname: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must not exceed 50 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface ErrorDetail {
  message: string;
  code: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
  });

  const getErrorMessage = (status: number, detail: unknown): string => {
    if (typeof detail === 'object' && detail !== null && 'message' in detail) {
      return (detail as ErrorDetail).message;
    }

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        return 'The provided email or password is incorrect';
      case HTTP_STATUS.CONFLICT:
        return 'A user with this email already exists.';
      case HTTP_STATUS.INTERNAL_ERROR:
        return 'Registration failed. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const response = await fetch('/register/api', {
      method: 'POST',
      headers: CustomHttpHeaders(),
      body: JSON.stringify({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = getErrorMessage(result.status, result.detail || result.error);
      showToast(errorMessage, 'error');
      setIsLoading(false);
      return;
    }

    if (result.success) {
      showToast('Account created! Check your email for confirmation.', 'success', 4000);
      reset();

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <>
      {/* Brand Header */}
      <div className="mb-8 flex items-center gap-2">
        <div className="border-primary/40 bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded border">
          <Cpu className="h-5 w-5" />
        </div>
        <span className="text-foreground font-sans text-lg font-semibold tracking-tight">
          Omnihub
        </span>
      </div>

      {/* Title */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-foreground font-sans text-2xl font-semibold tracking-tight">
          Create Account
        </h1>
        <p className="text-muted-foreground font-sans text-sm">
          Join Omnihub to get started with your secure workspace.
        </p>
      </div>

      {/* Encrypted Notice Banner Component */}
      <Banner
        icon={<UserLock className="text-tertiary h-7 w-7" />}
        title="End-to-End Encrypted"
        description="Your data is protected with quantum key distribution."
      />

      {/* Form Fields */}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
          >
            Email
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="border-border bg-input focus-visible:ring-ring h-11 pl-10"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </div>

        {/* First & Last Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="firstname"
              className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
            >
              First Name
            </Label>
            <div className="relative">
              <User className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                id="firstname"
                type="text"
                placeholder="John"
                className="border-border bg-input focus-visible:ring-ring h-11 pl-10"
                {...register('firstname')}
              />
            </div>
            {errors.firstname && (
              <p className="text-destructive text-xs">{errors.firstname.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="lastname"
              className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
            >
              Last Name
            </Label>
            <div className="relative">
              <User className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                id="lastname"
                type="text"
                placeholder="Doe"
                className="border-border bg-input focus-visible:ring-ring h-11 pl-10"
                {...register('lastname')}
              />
            </div>
            {errors.lastname && (
              <p className="text-destructive text-xs">{errors.lastname.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
          >
            Password
          </Label>
          <div className="relative">
            <KeyRound className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              className="border-border bg-input focus-visible:ring-ring h-11 pl-10 pr-10"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <User className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
          <p className="text-muted-foreground font-sans text-xs">
            At least 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="confirmPassword"
            className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <KeyRound className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              className="border-border bg-input focus-visible:ring-ring h-11 pl-10 pr-10"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <User className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-xs">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground flex h-11 w-full items-center justify-center gap-2 font-sans text-sm font-medium hover:brightness-110 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground font-sans text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Alternative Authentication */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border/60 w-full border-t" />
          </div>
          <span className="bg-background text-muted-foreground relative px-3 font-mono text-[10px] uppercase tracking-wider">
            Or Register With
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="hover:bg-accent border-border flex h-10 items-center justify-center gap-2 bg-transparent font-sans text-xs"
          >
            <Share2 className="text-muted-foreground h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="hover:bg-accent border-border flex h-10 items-center justify-center gap-2 bg-transparent font-sans text-xs"
          >
            <Mail className="text-muted-foreground h-4 w-4" />
            Google
          </Button>
        </div>
      </div>

      {/* Security Disclaimer Footer */}
      <p className="text-muted-foreground mt-12 text-center font-sans text-[11px] leading-relaxed">
        By creating an account, you agree to our terms of service.
        <br />
        Your account activity will be monitored and logged.
      </p>
    </>
  );
}
