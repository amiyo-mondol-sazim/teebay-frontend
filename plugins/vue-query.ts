import { defineNuxtPlugin, useState } from '#imports';
import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query';
import { QueryClient, VueQueryPlugin, dehydrate, hydrate } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000, // 1 minute
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
