// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// eslint-disable-next-line import/prefer-default-export
export const useRouter = () => {
  return {
    basePath: '.',
  };
};
