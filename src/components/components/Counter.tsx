type Props = {
  value?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onIncrementAsync?: () => void;
  onDecrementAsync?: () => void;
};
export const Counter = ({
  value,
  onIncrement,
  onDecrement,
  onIncrementAsync,
  onDecrementAsync,
}: Props) => {
  return (
    <div>
      <button onClick={onIncrementAsync} className="button">
        Increment after 1 second
      </button>{' '}
      <button onClick={onDecrementAsync} className="button">
        Decrement after 1 second
      </button>{' '}
      <button onClick={onIncrement} className="button">
        + Increment
      </button>{' '}
      <button onClick={onDecrement} className="button">
        - Decrement
      </button>
      <hr />
      <div>Clicked: {value} times</div>
    </div>
  );
};

export default Counter;
