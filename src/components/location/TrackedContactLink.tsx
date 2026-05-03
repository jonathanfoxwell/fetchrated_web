'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { track } from '@vercel/analytics';

type ContactEvent = 'call_click' | 'website_click';

interface TrackedContactLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: ContactEvent;
  practiceSlug: string;
  children: ReactNode;
}

export function TrackedContactLink({
  event,
  practiceSlug,
  children,
  onClick,
  ...rest
}: TrackedContactLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, { practice: practiceSlug });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
