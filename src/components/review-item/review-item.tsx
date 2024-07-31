import { Comment } from '../../types';

type ReviewItemProps = {
  comment: Comment;
}

function ReviewItem({comment}: ReviewItemProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar"></img>
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${comment.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        {/* TODO: Преобразовать дату в нужные форматы */}
        <time className="reviews__time" dateTime={comment.date}>{comment.date}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
