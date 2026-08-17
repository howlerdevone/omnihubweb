'use client';
import { Banner } from '@/components';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomHttpHeaders } from '@/lib/http/http.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Cpu, EyeOff, KeyRound, Mail, Share2, User, UserLock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/login/api', {
        method: 'POST',
        headers: CustomHttpHeaders(),
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        // TODO: Handle successful login (redirect, set auth token, etc.)
        console.log('Login successful:', result);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

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
          Initiate Session
        </h1>
        <p className="text-muted-foreground font-sans text-sm">
          Verify credentials to access to your profile.
        </p>
      </div>

      {/* Encrypted Notice Banner Component */}
      <Banner
        icon={<UserLock className="text-tertiary h-7 w-7" />}
        title="End-to-End Encrypted"
        description="Connection secured via quantum key distribution."
      />

      {/* Form Fields */}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
          >
            Email
          </Label>
          <div className="relative">
            <User className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider"
            >
              Password
            </Label>
            <Link
              href="#"
              className="text-primary font-mono text-[11px] tracking-wide hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
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
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            className="border-border data-[state=checked]:bg-primary"
            {...register('rememberMe')}
          />
          <Label
            htmlFor="rememberMe"
            className="text-muted-foreground cursor-pointer select-none font-sans text-xs"
          >
            Keep me logged in for 30 days (on this device).
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground flex h-11 w-full items-center justify-center gap-2 font-sans text-sm font-medium hover:brightness-110 disabled:opacity-50"
        >
          {isLoading ? 'Authorizing...' : 'Authorize Deployment'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Alternative Authentication */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border/60 w-full border-t" />
          </div>
          <span className="bg-background text-muted-foreground relative px-3 font-mono text-[10px] uppercase tracking-wider">
            Or Authenticate Via
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
        Access is restricted to authorized personnel only.
        <br />
        Activity is monitored and logged by Central Command.
      </p>
    </>
  );
}
