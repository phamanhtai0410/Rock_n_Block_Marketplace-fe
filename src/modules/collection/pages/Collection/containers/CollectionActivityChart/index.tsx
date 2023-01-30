import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { alpha, Box, Theme, useMediaQuery, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useShallowSelector } from 'hooks';
import moment from 'moment';
import collectionsSelectors from 'store/collections/selectors';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';

interface CustomTooltipProps {
  series: number[][];
  dataPointIndex: number;
}

const getActivityChartOptions = (
  theme: Theme,
  labels: string[],
  numSales: number[],
  isMobile: boolean,
): ApexOptions => ({
  chart: {
    height: 350,
    type: 'line' as const,
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  stroke: {
    width: [0, 2],
    colors: [COLOR_PRIMARY_1],
  },
  markers: {
    colors: COLOR_PRIMARY_1,
    strokeColors: theme.themeColors.colorButtonSecondary,
  },
  fill: {
    opacity: 0.9,
    colors: [theme.themeColors.colorButtonSecondary],
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: theme.themeColors.colorButtonSecondary,
  },
  tooltip: {
    custom: ({ series, dataPointIndex }: CustomTooltipProps) => `
      <div>${moment(labels[dataPointIndex]).format('MMM DD, YYYY')}</div>
      <div>Avg. price: ${series[1][dataPointIndex]} USD</div>
      <div>Volume: ${series[0][dataPointIndex]} USD</div>
      <div>Num. sales: ${numSales[dataPointIndex]}</div>
    `,
    theme: 'dark',
    marker: { show: false },
    style: {
      fontSize: '14px',
      fontFamily: undefined,
    },
    x: {
      format: 'MMM dd, yyyy',
    },
    y: {
      formatter: (val) => `${val} USD`,
      title: {
        formatter: (seriesName) =>
          ({ 'Volume (USD)': 'Volume:', 'Average price (USD)': 'Avg. price:' }[seriesName] || ''),
      },
    },
  },
  xaxis: {
    type: 'datetime' as const,
    categories: labels,
    labels: {
      style: {
        colors: theme.themeColors.colorTextBody2,
        fontSize: '14px',
      },
      format: 'MMM dd, yyyy',
    },
    axisBorder: { color: theme.themeColors.colorButtonSecondary },
    axisTicks: { color: theme.themeColors.colorButtonSecondary },
  },
  yaxis: [
    {
      title: {
        text: isMobile ? '' : 'Volume (USD)',
        style: {
          color: theme.themeColors.colorFooterText,
          fontSize: '14px',
          fontWeight: FontWeights.fontWeightRegular,
        },
      },
      labels: {
        style: {
          colors: theme.themeColors.colorTextBody2,
          fontSize: '14px',
        },
      },
      axisBorder: {
        show: false,
      },
    },
    {
      opposite: true,
      title: {
        text: isMobile ? '' : 'Average price (USD)',
        style: {
          color: theme.themeColors.colorFooterText,
          fontSize: '14px',
          fontWeight: FontWeights.fontWeightRegular,
        },
      },
      labels: {
        style: {
          colors: theme.themeColors.colorTextBody2,
          fontSize: '14px',
        },
      },
    },
  ],
});

export const CollectionActivityChart = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { collectionChart } = useShallowSelector(collectionsSelectors.getCollections);

  const dateData = useMemo(() => collectionChart?.map((point) => point?.date || '') || [], [collectionChart]);

  const numSalesData = useMemo(
    () => collectionChart?.map((point) => +(point?.numberOfTrades || 0)) || [],
    [collectionChart],
  );

  const options = useMemo(
    () => getActivityChartOptions(theme, dateData || [], numSalesData, isSmallScreen),
    [theme, dateData, numSalesData, isSmallScreen],
  );

  const volumeData = useMemo(() => collectionChart?.map((point) => +(point?.amount || 0)) || [], [collectionChart]);

  const averagePriceData = useMemo(
    () => collectionChart?.map((point) => +(point?.averagePrice || 0)) || [],
    [collectionChart],
  );

  return (
    <Box
      sx={{
        marginBottom: 4,
        backgroundColor: theme.themeColors.colorModalBackground,
        borderRadius: '16px',
        paddingY: 2,
        paddingX: { xs: 0, md: 2 },

        '.apexcharts-tooltip': {
          boxShadow: 'none',
          color: `${theme.themeColors.colorActivityTooltipTextColor} !important`,
          backgroundColor: `${alpha(theme.themeColors.colorActivityTooltipBackground, 0.6)} !important`,
          textAlign: 'center',
          fontWeight: FontWeights.fontWeightMedium,
          padding: theme.spacing(2, 1),
        },
      }}
    >
      <ReactApexChart
        options={options}
        series={[
          {
            name: 'Volume (USD)',
            type: 'column',
            data: volumeData,
          },
          {
            name: 'Average price (USD)',
            type: 'line',
            data: averagePriceData,
          },
        ]}
        type="line"
        height={350}
      />
    </Box>
  );
};
