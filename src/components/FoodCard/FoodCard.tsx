import { useState } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import AddIcon from '../../assets/icons/buttons/addFilled.svg?react';
import ArrowForwardIcon from '../../assets/icons/buttons/arrowForwardFilled.svg?react';
import DishTypeIndicator from '../DishTypeIndicator/DishTypeIndicator';
import getImageUrl from '../../utils/getImageUrl';
import Modal, { ModalContent, ModalFooter } from '../Modal/Modal';
import FoodItem from '../Fooditem/FoodItem';
import { MealsUpdated } from '../../hooks/useMealsUpdate';
import CommentSection from '../CommentSection/CommentSection';
import styles from './foodCard.module.css';

interface FoodCardProps {
  meal: MealsUpdated;
  onClick: () => void;
}

export default function FoodCard({ meal, onClick }: FoodCardProps) {
  const { dishType, title, spicy, vegetarian, description, price, vendorName, rating, comments } =
    meal;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToolTipDisplayed, setToolTipVisibility] = useState(false);
  const ratingClass = rating === 0 ? styles.noScore : styles.score;
  const isDescriptionClamped = (element: Element) => element.scrollHeight > element.clientHeight;
  const toolTipClass = classNames(
    styles.mealDescriptionToolTip,
    isToolTipDisplayed ? styles.mealDescriptionToolTipVisible : ''
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.titleImageBg}>
          <img src={getImageUrl(dishType)} className={styles.titleImage} alt={dishType} />
        </div>
        <div>
          <div className={styles.vendorName}>{vendorName}</div>
          <div className={styles.dishName}>{title}</div>
          <DishTypeIndicator isSpicy={spicy} isVegan={vegetarian} />
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.descriptionContainer}>
          <p
            className={styles.mealDescription}
            onMouseEnter={(e) => setToolTipVisibility(isDescriptionClamped(e.target as Element))}
            onMouseLeave={(e) => setToolTipVisibility(isDescriptionClamped(e.target as Element))}>
            {description}
          </p>
          <span className={toolTipClass}>{description}</span>
        </div>
        <div className={styles.moreInfo}>
          <p className={ratingClass}>
            <span className={styles.star} />
            {rating !== 0 ? rating.toFixed(1) : 'Not rated yet'}
          </p>
          <Button
            category="tertiary"
            size="small"
            onClick={() => setIsModalOpen(true)}
            iconEnd={<ArrowForwardIcon />}>
            More Info
          </Button>
          {isModalOpen && (
            <Modal
              modalHeadline="Dish Details"
              widthClass="large"
              onClose={() => setIsModalOpen(false)}>
              <ModalContent>
                <FoodItem meal={meal} />
                <div className={styles.commentWrapper}>
                  <p className={styles.commentsTitle}>Comments ({comments.length})</p>
                  {comments.length === 0 ? (
                    <p className={styles.noComments}>No comments yet</p>
                  ) : (
                    comments.map((comment) => (
                      <CommentSection key={comment.comment} commentData={comment} />
                    ))
                  )}
                </div>
              </ModalContent>
              <ModalFooter>
                <Button onClick={() => setIsModalOpen(false)} size="medium" category="secondary">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    onClick();
                    setIsModalOpen(false);
                  }}
                  size="medium"
                  category="primary">
                  Add To Cart
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </div>
        <div className={styles.pricingContainer}>
          <div className={styles.priceBlock}>
            <p className={styles.priceTitle}>Price</p>
            <p className={styles.priceValue}>
              {price === 0 ? 'Free' : `€${price.toFixed(2).toString().replace('.', ',')}`}
            </p>
          </div>
          <Button category="secondary" size="small" onClick={onClick} iconStart={<AddIcon />}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
