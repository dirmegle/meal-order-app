import { Comment } from '../../hooks/useMealsUpdate';
import styles from './commentSection.module.css';

interface CommentSectionProps {
  commentData: Comment;
}

export default function CommentSection({ commentData }: CommentSectionProps) {
  const { userImg, userSurname, userName, comment } = commentData;
  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <img className={styles.userImg} src={userImg} alt="User avatar" />
        <p className={styles.userName}>
          {userName} {userSurname}
        </p>
      </div>
      <p className={styles.commentContainer}>{comment}</p>
    </div>
  );
}
