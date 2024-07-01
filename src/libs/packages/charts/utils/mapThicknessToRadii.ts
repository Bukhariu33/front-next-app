import type { DonutChartProps } from '../donut-chart/donut-chart';

export const mapThicknessToRadii = (
  thickness: DonutChartProps['thickness'],
  radius: number,
) => {
  const ratios = {
    thinnest: 1.15,
    thinner: 1.275,
    thin: 1.4,
    medium: 1.5,
    thick: 1.65,
    thicker: 1.8,
    thickest: 1.95,
  };
  return { inner: radius / ratios[thickness!] || 1.5, outer: radius };
};
