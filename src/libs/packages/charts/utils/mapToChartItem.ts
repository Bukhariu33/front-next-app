import styleConfig from '@/libs/configs/styleConfig';

const baseColors = [
  '#8ce8ad',
  '#57e188',
  '#34c768',
  '#2db757',
  '#27acaa',
  '#42c9c2',
  '#60e6e1',
  '#93f0e6',
  '#87d3f2',
  '#4ebeeb',
  '#35a4e8',
  '#188ce5',
  '#542ea5',
  '#724bc3',
  '#9c82d4',
  '#c981b2',
  '#b14891',
  '#ff6d00',
  '#ff810a',
  '#ff9831',
  '#ffb46a',
  '#ff9a91',
  '#ff736a',
  '#f95d54',
  '#ff4136',
  '#c4c4cd',
];

const markColorAsUsed = (colors: { used: boolean; hex: string }[]) => {
  const unused = colors.find(color => !color.used);
  if (unused) {
    unused.used = true;
    return unused.hex;
  }
  return styleConfig.colors.primary.main;
};

const addColors = (data: ChartDataItem[]): ChartDataItem[] => {
  const colorStatus = baseColors.map(hex => ({ used: false, hex }));
  return data.map(item => {
    if (item.color && item.color.startsWith('#')) return item;
    return { ...item, color: markColorAsUsed(colorStatus) };
  });
};

const normalizeData = (
  data: number[] | Partial<ChartDataItem>[],
): ChartDataItem[] => {
  return data.map((item, i) => {
    if (typeof item === 'number')
      return { name: `Item ${i + 1}`, value: item } as ChartDataItem;
    if ('name' in item && 'value' in item) return item as ChartDataItem;
    throw new Error(
      "Invalid data item: 'name' or 'value' is undefined. Please pass an array of numbers or make sure that 'name' and 'value' are defined in the objects.",
    );
  });
};

interface WithColor {
  (data: number[] | ChartDataItem[], color: true): ChartDataItem[];
}

interface WithoutColor {
  (data: number[] | ChartDataItem[], color?: false): ChartDataItem[];
}

/**
 *
 * @param color  auto sets a color for items without a color
 */
export const mapToChartItem: WithColor & WithoutColor = (
  rawData: number[] | ChartDataItem[],
  addColor?: boolean,
): ChartDataItem[] => {
  let data = normalizeData(rawData);
  if (addColor) data = addColors(data);
  return data;
};
