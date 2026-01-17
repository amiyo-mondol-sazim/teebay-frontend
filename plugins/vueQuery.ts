import { defineNuxtPlugin, useState } from '#imports';
import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query';
import { QueryClient, VueQueryPlugin, dehydrate, hydrate } from '@tanstack/vue-query';
import { STALE_TIME } from '~/common/constants/api.constants';

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vueQuery');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME.SHORT,
        refetchOnWindowFocus: false,
      },
    },
  });
  const options: VueQueryPluginOptions = { queryClient, enableDevtoolsV6Plugin: true };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value);
  }
});
