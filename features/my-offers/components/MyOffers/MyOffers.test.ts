import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { generateOffers } from '~/tests/data/offers';
import { IntersectionObserverMock } from '~/tests/mock/intersection-observer';
import MyOffers from './MyOffers.vue';

describe.skip('MyOffers Integration', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn().mockImplementation((url, { params }) => {
      if (url === '/api/offers') {
        const offers = generateOffers(Number(params.per_page) || 5, { status: params.status || 'live' });
        return Promise.resolve({
          data: offers,
          pagination: {
            page: Number(params.page) || 1,
            per_page: Number(params.per_page) || 5,
            next_page: Number(params.page) < 2 ? Number(params.page) + 1 : null,
            previous_page: Number(params.page) > 1 ? Number(params.page) - 1 : null,
            total_items: 10,
            total_pages: 2,
          },
        });
      }
    });
    vi.stubGlobal('$fetch', fetchMock);
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
  });

  afterEach(() => {
    IntersectionObserverMock.instances.forEach((instance) => instance.clear());
    vi.unstubAllGlobals();
  });

  it('calls API and renders offers', async () => {
    const wrapper = mount(MyOffers, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
      },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/offers',
      expect.objectContaining({ params: { page: 1, per_page: 5, status: 'live' } }),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(wrapper.findAllComponents({ name: 'OfferCard' }).length).toBeGreaterThanOrEqual(5);
  });

  it('supports tab change', async () => {
    const wrapper = mount(MyOffers, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
      },
    });
    await nextTick();
    await wrapper.vm.$nextTick();
    fetchMock.mockClear(); // Clear initial call
    const tab = wrapper.findAll('[data-slot="tabs-trigger"]').find((el) => el.text().includes('Under Review'));
    expect(tab).toBeDefined();
    await tab?.trigger('click');
    await nextTick();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/offers',
      expect.objectContaining({ params: { page: 1, per_page: 5, status: 'under-review' } }),
    );
  });

  it('supports infinite scroll', async () => {
    const wrapper = mount(MyOffers, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
      },
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(wrapper.findAllComponents({ name: 'OfferCard' }).length).toEqual(5);
    const observer = IntersectionObserverMock.instances[0];
    expect(observer).toBeDefined();
    if (observer) {
      observer.trigger(
        observer.elements.map((el) => ({
          isIntersecting: true,
          target: el,
          boundingClientRect: el.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: el.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        })),
      );
    }
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/offers',
      expect.objectContaining({ params: { page: 2, per_page: 5, status: 'live' } }),
    );
    await flushPromises();
    expect(wrapper.findAllComponents({ name: 'OfferCard' }).length).toEqual(10);
  });
});
