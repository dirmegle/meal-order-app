import { useState } from 'react';
import BlankCard from '../BlankCard/BlankCard';
import Button from '../Button/Button';
import DialogContent from '../DialogContent/DialogContent';
import Order from '../Order/Order';
import Confirm from '../../assets/icons/dialog/infoConfirmation.svg?react';
import Modal, { ModalFooter } from '../Modal/Modal';
import WarningDialog from '../../assets/icons/dialog/warningDestructive.svg?react';
import { AvailableLunchUpdated } from '../../pages/availableLunchPageUtils';
import handleCancelReservation from './reservedMealCardUtils';
import { UserProfile } from '../../hooks/useUserProfile';
import styles from './reservedMealCard.module.css';

interface ReservedMealCardProps {
  userId: UserProfile['id'];
  reservedMeals: AvailableLunchUpdated;
  setErrMsg: (err: string) => void;
  setReservedMeal: () => void;
}

export default function ReservedMealCard({
  userId,
  reservedMeals,
  setErrMsg,
  setReservedMeal,
}: ReservedMealCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const renderDialog = () => (
    <Modal
      modalHeadline="You're about to cancel your meal reservation."
      widthClass="small"
      onClose={() => setIsDialogOpen(false)}>
      <DialogContent icon={<WarningDialog />}>
        Are you sure you want to cancel your meal reservation?
      </DialogContent>
      <ModalFooter>
        <Button onClick={() => setIsDialogOpen(false)} size="medium" category="secondary">
          No, Keep
        </Button>
        <Button
          onClick={() => handleCancelReservation(userId, reservedMeals, setErrMsg, setReservedMeal)}
          size="medium"
          category="primary">
          Yes, Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      {isDialogOpen && renderDialog()}
      <BlankCard className={styles.cardContent}>
        <DialogContent icon={<Confirm />} isContentCentered>
          This is your reserved meal for the Friday lunch. Enjoy!
        </DialogContent>
        <div className={styles.orderBox}>
          {reservedMeals.meals.map(({ title, dishType, vendorName, id }) => (
            <Order
              key={id}
              textSize="large"
              imageSize="medium"
              title={title}
              dishType={dishType}
              vendorName={vendorName}
            />
          ))}
        </div>
        <div className={styles.button}>
          <Button onClick={() => setIsDialogOpen(true)} size="medium" category="secondary">
            Cancel reservation
          </Button>
        </div>
      </BlankCard>
    </>
  );
}
