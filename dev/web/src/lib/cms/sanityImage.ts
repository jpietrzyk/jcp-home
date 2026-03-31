import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity.client';

const builder = sanityClient
  ? imageUrlBuilder({ projectId: sanityClient.config().projectId!, dataset: sanityClient.config().dataset! })
  : null;

export function sanityImageUrl(source: Parameters<NonNullable<typeof builder>['image']>[0]) {
  return builder?.image(source);
}
