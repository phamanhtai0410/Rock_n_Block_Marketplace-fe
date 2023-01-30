import { ReactNode, useCallback, useState } from 'react';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { style as stackStyle } from '@mui/material/Stack/Stack';
import { Usdt } from 'components/Icon/components';
import { COLOR_NEUTRALS_4, COLOR_PRIMARY_4 } from 'theme/colors';

export default {
  title: 'theme/Tab',
  component: Tab,
};

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (value === index ? <Box>{children}</Box> : null);

export const Default = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  const handleChange = useCallback((_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  }, []);

  const handleChange2 = useCallback((_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue2(newValue);
  }, []);

  const handleChange3 = useCallback((_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue3(newValue);
  }, []);

  return (
    <>
      <Box sx={{ border: '1px solid red' }}>
        <Box sx={{ border: '1px solid green' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Box>
          <Tabs
            value={value2}
            onChange={handleChange2}
            className="outlined"
            sx={{
              '.MuiTabs-flexContainer': stackStyle({ ownerState: { direction: 'row', spacing: 3 }, theme }),
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Usdt sx={{ marginRight: 1, width: 24 }} />
                  <Box>USDT</Box>
                </Box>
              }
            />
            <Tab label="ETH" />
            <Tab label="WETH" />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Tabs value={value3} onChange={handleChange3} className="outlined">
          <Tab
            label={
              <Box sx={{ width: 160 }}>
                <Box
                  sx={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: COLOR_PRIMARY_4, marginBottom: 1 }}
                />
                <Box sx={{ textAlign: 'start' }}>Crypto Legend - Professor</Box>
              </Box>
            }
            sx={{ borderRadius: '16px !important' }}
          />
          <Tab label="ETH" />
          <Tab label="WETH" />
        </Tabs>
      </Box>
      <Box>
        <Tabs value={value3} onChange={handleChange3} className="outlined">
          <Tab
            label={
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ marginRight: 1 }}>12</Box>
                <Box sx={{ color: COLOR_NEUTRALS_4 }}>Hour</Box>
              </Box>
            }
          />
          <Tab label="ETH" />
          <Tab label="WETH" />
        </Tabs>
      </Box>
    </>
  );
};
