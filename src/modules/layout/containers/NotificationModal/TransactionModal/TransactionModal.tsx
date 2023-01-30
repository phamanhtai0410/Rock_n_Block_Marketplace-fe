import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { Copy, Modal } from 'components';
import { useShallowSelector } from 'hooks';
import { setActiveModal } from 'store/modals/reducer';
import modalsSelector from 'store/modals/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { Modals, ModalsInitialState, State } from 'types/store';

import { modalData } from './TransactionModal.helpers';

export const TransactionModal: FC = () => {
  const dispatch = useDispatch();
  const { chain } = useShallowSelector(userSelector.getUser);
  const { modalState } = useShallowSelector<State, ModalsInitialState>(modalsSelector.getModals);
  // TODO: @dnotrad fix
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { title, subtitle, Icon, body1, body2, isCopiable, repeatTransactions } = modalData[modalState.activeModal];

  const scanerLink = `${chain.blockExplorerUrl}tx/${modalState.txHash}`;

  const closeModal = useCallback(() => {
    dispatch(
      setActiveModal({
        activeModal: Modals.init,
        txHash: '',
        open: false,
      }),
    );
  }, [dispatch]);

  const ModalTitle = <Typography variant="h4">{title}</Typography>;

  return (
    <Modal open={modalState.open} onClose={closeModal} title={ModalTitle}>
      <Box
        sx={{
          minWidth: { xs: '100%', sm: '100%', md: 550 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {Icon && <Icon />}

        {subtitle && (
          <Typography mt={2} fontSize="40px" lineHeight="50px" fontWeight={500} textAlign="center">
            {subtitle}
          </Typography>
        )}

        {body1 && (
          <Typography mt={4} mb={2} fontSize="16px" fontWeight={400} textAlign="center" maxWidth="341px">
            {body1}
          </Typography>
        )}

        {body2 && (
          <Typography
            fontSize="12px"
            sx={{ color: COLOR_NEUTRALS_4 }}
            variant="body1"
            textAlign="center"
            maxWidth={537}
          >
            {body2}
          </Typography>
        )}

        {isCopiable && (
          <Copy sx={{ mt: 3, height: 48, maxWidth: '384px' }} copyText={scanerLink}>
            <Typography variant="body2" textTransform="none" maxWidth={{ xs: 250, sm: 250, md: 400 }} noWrap>
              {scanerLink}
            </Typography>
          </Copy>
        )}

        {repeatTransactions &&
          (modalState.activeModal === Modals.ApproveRejected || modalState.activeModal === Modals.SendRejected) && (
            <Button
              sx={{ width: 'clamp(200px, 60%, 60%)', textTransform: 'capitalize' }}
              onClick={modalState.repeatCallback}
            >
              {repeatTransactions} again
            </Button>
          )}
      </Box>
    </Modal>
  );
};
