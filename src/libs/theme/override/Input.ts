import { Input } from '@mantine/core';

const inputOverrides = Input.extend({
  classNames: {
    input:
      'bg-brand-accent-highlight/10 p-4 h-12 sm:h-14 rounded-lg text-base border border-brand-accent-highlight/10 text-[#64646C] placeholder-[#64646C] focus:ring-1 focus:ring-brand-primary-main focus:bg-white',
  },
});

export default inputOverrides;
