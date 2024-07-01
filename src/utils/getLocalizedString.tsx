function getLocalizedKey<Data extends Record<string, any>>(
  data: Data,
  key: keyof Data,
  lang: string,
) {
  const keyArabic = `${key as string}Ar`;

  if (lang === 'ar' && data[keyArabic]) {
    return data[keyArabic];
  }

  return data[key];
}

export default getLocalizedKey;
