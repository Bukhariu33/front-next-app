import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

const toTitleCase = (str: string) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const generateBreadcrumbs = (pathParts: string[]): JSX.Element[] => {
  return pathParts
    .map((part, index, arr) => {
      // Skip numbers from being displayed
      const isNumber = !Number.isNaN(Number(part));
      if (isNumber) return null;

      // Generate the breadcrumb link
      const breadcrumbLink = `/${arr.slice(0, index + 1).join('/')}`;

      return (
        <Anchor
          href={breadcrumbLink}
          component={Link}
          key={breadcrumbLink}
          className="m-0 mx-2 text-4xl font-bold leading-8 text-black"
        >
          {toTitleCase(part)}
        </Anchor>
      );
    })
    .filter(Boolean); // Remove null elements
};

const Breadcrumbs = () => {
  const router = useRouter();
  const { asPath, query } = router;

  let pathParts: string[] = [];

  // Check if asPath is not undefined or null
  if (asPath !== undefined && asPath !== null) {
    // Split to get the path before the query parameters
    const basePath = asPath.split('?')[0];

    // Check if basePath is not undefined or null
    if (basePath !== undefined && basePath !== null) {
      // Now split the base path into its parts
      const parts = basePath.split('/');

      // Check if query is not undefined or null before using it in filter
      if (query !== undefined && query !== null) {
        pathParts = parts.filter(p => p && query[p] === undefined);
      } else {
        pathParts = parts.filter(p => p);
      }
    }
  }

  pathParts.shift();
  const breadcrumbItems = generateBreadcrumbs(pathParts);

  return (
    <MantineBreadcrumbs separator=">">{breadcrumbItems}</MantineBreadcrumbs>
  );
};

export default Breadcrumbs;
