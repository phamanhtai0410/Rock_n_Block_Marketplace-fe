import { Box } from '@mui/material';

import { ModelViewer } from './ModelViewer';
import { animatedCubeMock, astronautUnlitMock } from './ModelViewer.mock';

export default {
  title: 'components/ModelViewer',
  component: ModelViewer,
};

export const Default: React.FC = () => (
  <Box>
    <ModelViewer
      src={astronautUnlitMock}
      alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
      sx={{ width: 500, height: 500 }}
    />
    <ModelViewer src={animatedCubeMock} sx={{ width: 500, height: 500 }} />
    <ModelViewer
      src="https://raw.githubusercontent.com/dwqdaiwenqi/react-3d-viewer/master/site/src/lib/model/DamagedHelmet.gltf"
      sx={{ width: 500, height: 500 }}
    />
  </Box>
);
