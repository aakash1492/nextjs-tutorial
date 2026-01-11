import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * Root page - redirects to locale-based page
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
