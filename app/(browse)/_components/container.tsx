'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface PropsType {
  children: React.ReactNode;
}

const Container = ({ children }: PropsType) => {
  const matches = useMediaQuery('(max-width:1024px)');
  const { collapsed, onCollapse, onExpand } = useSidebar(state => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1 ml-[70px]', !collapsed && 'lg:ml-60')}>
      {children}
    </div>
  );
};

export default Container;
