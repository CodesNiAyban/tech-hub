'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './pricing.module.css';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Logo } from '../_components/logo';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  discountPrice: string | Record<string, string>;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
}

export const frequencies: PricingTierFrequency[] = [
  { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
  { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' },
];

export const tiers: PricingTier[] = [
  {
    name: 'Basic',
    id: '0',
    href: '/subscribe',
    price: { '1': '$29.99', '2': '$299.99' },
    discountPrice: { '1': '', '2': '$269.99' },
    description: `Access basic tech courses, AI-generated quizzes, and video courses with chapters.`,
    features: [
      `Access to Basic Courses`,
      `AI-Generated Quizzes`,
      `Video Courses with Chapters`,
      `Basic Student Access`,
    ],
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: `Subscribe`,
  },
  {
    name: 'Pro',
    id: '1',
    href: '/subscribe',
    price: { '1': '$79.99', '2': '$799.99' },
    discountPrice: { '1': '', '2': '$749.99' },
    description: `Includes all features of the Basic plan plus more advanced courses and teacher mode.`,
    features: [
      `All in the Basic Plan`,
      `Advanced Tech Courses`,
      `Teacher Mode`,
      `Upload and Edit Courses`,
      `Manage Students`,
    ],
    featured: false,
    highlighted: true,
    soldOut: false,
    cta: `Get started`,
  },
  {
    name: 'Lifetime',
    id: '2',
    href: '/contact-us',
    price: { '1': '$1499.99', '2': '$1499.99' },
    discountPrice: { '1': '', '2': '' },
    description: `Lifetime access to all current and future courses, with priority support and enterprise-grade security.`,
    features: [
      `All in the Pro Plan`,
      `Priority Support`,
      `Enterprise-Grade Security`,
      `Lifetime Access to All Courses`,
    ],
    featured: true,
    highlighted: true,
    soldOut: false,
    cta: `Get started`,
  },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export function PricingCards() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionBasic = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/subscription`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const subscriptionPro = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/subscription/pro`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const subscriptionLifetime = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/subscription/lifetime`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bannerText = `
  We're excited to offer exclusive annual plans that provide you with significant savings compared to our monthly subscriptions.
  `;

  return (
    <div className={cn('flex flex-col w-full items-center', styles.fancyOverlay)}>
      <div className="w-full flex flex-col items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
          <div className="w-full lg:w-auto mx-auto max-w-4xl lg:text-center">
            <h1 className=" w-full items-center justify-center lg:w-auto flex text-[hsl(var(--foreground))] text-4xl font-semibold max-w-xs sm:max-w-none md:text-6xl !leading-tight">
              <Logo />
              {/* <span className="flex-column ml-6">Pricing</span> */}
            </h1>
            <p className="text-[hsl(var(--foreground))] mt-6 md:text-xl lg:text-center max-w-prose">
              Choose the plan that suits your learning or teaching needs. TechHub offers a variety of plans to fit every budget and requirement.
            </p>
          </div>

          {bannerText ? (
            <div className="w-full lg:w-auto flex justify-center my-4">
              <p className="w-full px-4 py-3 text-xs bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] rounded-xl">
                {bannerText}
              </p>
            </div>
          ) : null}

          {frequencies.length > 1 ? (
            <div className="mt-16 flex justify-center">
              <RadioGroup
                defaultValue={frequency.value}
                onValueChange={(value: string) => {
                  setFrequency(frequencies.find((f) => f.value === value)!);
                }}
                className="grid gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-[hsl(var(--card))] ring-1 ring-inset ring-[hsl(var(--border))]"
                style={{
                  gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
                }}
              >
                <Label className="sr-only">Payment frequency</Label>
                {frequencies.map((option) => (
                  <Label
                    className={cn(
                      frequency.value === option.value
                        ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                        : 'bg-transparent text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]',
                      'cursor-pointer rounded-full px-2.5 py-2 transition-all',
                    )}
                    key={option.value}
                    htmlFor={option.value}
                  >
                    {option.label}

                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="hidden"
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="mt-12" aria-hidden="true"></div>
          )}

          <div
            className={cn(
              'isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none',
              tiers.length === 2 ? 'lg:grid-cols-2' : '',
              tiers.length === 3 ? 'lg:grid-cols-3' : '',
            )}
          >
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  tier.featured
                    ? 'bg-[hsl(var(--foreground))] ring-[hsl(var(--foreground))]'
                    : 'bg-[hsl(var(--card))] ring-[hsl(var(--border))]',
                  'max-w-xs ring-1 rounded-3xl p-8 xl:p-10',
                  tier.highlighted ? styles.fancyGlassContrast : '',
                )}
              >
                <h3
                  id={tier.id}
                  className={cn(
                    tier.featured ? 'dark:bg-gradient-to-r dark:from-yellow-400 dark:to-orange-500 dark:text-transparent dark:bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 text-transparent bg-clip-text' : 'text-[hsl(var(--foreground))]',
                    'text-2xl font-bold tracking-tight',
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    tier.featured
                      ? 'text-secondary-foreground'
                      : 'text-[hsl(var(--muted-foreground))]',
                    'mt-4 text-sm leading-6',
                  )}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={cn(
                      tier.featured ? 'dark:bg-gradient-to-r dark:from-yellow-400 dark:to-orange-500 dark:text-transparent dark:bg-clip-text bg-gradient-to-r from-fuchsia-900 to-pink-900 text-transparent bg-clip-text' : 'text-[hsl(var(--foreground))]',
                      'text-4xl font-bold tracking-tight',
                      tier.discountPrice && typeof tier.discountPrice !== 'string' && tier.discountPrice[frequency.value]
                        ? 'line-through'
                        : '',
                    )}
                  >
                    {typeof tier.price === 'string'
                      ? tier.price
                      : tier.price[frequency.value]}
                  </span>

                  <span
                    className={cn(
                      tier.featured ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--foreground))]',
                    )}
                  >
                    {typeof tier.discountPrice === 'string'
                      ? tier.discountPrice
                      : tier.discountPrice[frequency.value]}
                  </span>

                  {typeof tier.price !== 'string' && tier.name !== 'Lifetime' ? (
                    <span
                      className={cn(
                        tier.featured
                          ? 'text-[hsl(var(--muted))]'
                          : 'text-[hsl(var(--muted-foreground))]',
                        'text-sm font-semibold leading-6',
                      )}
                    >
                      {frequency.priceSuffix}
                    </span>
                  ) : null}
                </p>
                <a
                  aria-describedby={tier.id}
                  className={cn(
                    'flex mt-6 shadow-sm',
                    tier.soldOut ? 'pointer-events-none' : '',
                  )}
                >
                  <Button
                    size="lg"
                    disabled={tier.soldOut}
                    className={cn(
                      'w-full bg-[hsl(var(--accent))] hover:opacity-80 hover:text-slate-150',
                      !tier.highlighted && !tier.featured
                        ? 'bg-[hsl(var(--accent))]'
                        : 'text-slate-50 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:opacity-80 transition-opacity',
                      !tier.soldOut ? '' : 'hover:bg-white transition',
                    )}
                    variant={tier.highlighted ? 'default' : 'outline'}
                    onClick={
                      tier.name === 'Basic'
                        ? subscriptionBasic
                        : tier.name === 'Pro'
                        ? subscriptionPro
                        : tier.name === 'Lifetime'
                        ? subscriptionLifetime
                        : undefined
                    }
                  >
                    {tier.soldOut ? 'Sold out' : tier.cta}
                  </Button>
                </a>

                <ul
                  className={cn(
                    tier.featured
                      ? 'text-[hsl(var(--muted))]'
                      : 'text-[hsl(var(--muted-foreground))]',
                    'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 text-[hsl(var(--foreground))]">
                      <CheckIcon
                        className={cn(
                          tier.featured ? 'text-[hsl(var(--primary))]' : '',
                          tier.highlighted
                            ? 'text-[hsl(var(--primary))]'
                            : 'text-secondary-foreground',

                          'h-6 w-5 flex-none',
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
