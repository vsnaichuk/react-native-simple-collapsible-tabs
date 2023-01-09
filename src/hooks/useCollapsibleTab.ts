import { useContext } from 'react';

import { CollapsibleTabContext } from '../context';
import type { ICollapsibleTabContext } from '../types';

export function useCollapsibleTab() {
  const context = useContext(CollapsibleTabContext);

  return context as ICollapsibleTabContext;
}
