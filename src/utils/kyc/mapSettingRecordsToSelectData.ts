function mapSettingRecordsToSelectData(
  records: { key: string; label: string }[],
) {
  if (records && !Array.isArray(records)) {
    return [];
  }

  return records.map(option => ({
    value: option.key,
    label: option.label,
  }));
}

export { mapSettingRecordsToSelectData };
