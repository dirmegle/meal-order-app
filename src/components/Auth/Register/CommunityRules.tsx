import Modal, { ModalContent, ModalFooter } from '../../Modal/Modal';
import { communityRulesText1, communityRulesText2 } from './communityRulesText';
import Button from '../../Button/Button';

interface CommunityRulesProps {
  onCloseModal: () => void;
}

export default function CommunityRules({ onCloseModal }: CommunityRulesProps) {
  return (
    <Modal modalHeadline="Community Rules" onClose={() => onCloseModal()} widthClass="large">
      <ModalContent>
        <p>
          {communityRulesText1}
          <br />
          <br />
          {communityRulesText2}
        </p>
      </ModalContent>
      <ModalFooter>
        <Button type="button" category="primary" size="medium" onClick={() => onCloseModal()}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
