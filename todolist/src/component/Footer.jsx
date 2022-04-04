import { useContext, useState } from 'react';
import { Mycontext } from './context-manager';
import { Clearcompleted } from './Clearcompleted';

export function Footer() {
  const ctx = useContext(Mycontext);
  const [choice, setChoice] = useState(1);
  const buttonAll = 1;
  const buttonActive = 2;
  const buttonCompleted = 3;
  // change函数通过判断当前choice值和按钮固定值是否相等，决定当前按钮的状态（是否浮现一个外框）
  function change(buttonnumber, buttonChoice) {
    if (buttonnumber === buttonChoice) {
      return 'selected';
    } else {
      return 'hover';
    }
  }
  // 当前如果有已checked的item则会显示clear completed按钮，否则则不显示
  function clearornot(count) {
    if (count > 0) {
      return <Clearcompleted />;
    } else {
      return null;
    }
  }
  return (
    <footer className="footer" id="footer">
      <span className="todo-count">
        <strong>{ctx.Item.itemCount}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <button
            className={change(buttonAll, choice)}
            type="button"
            onClick={() => {
              setChoice(1);
              ctx.setNumberall(1);
              ctx.setNumberactive(0);
              ctx.setNumbercompleted(0);
            }}>
            All
          </button>
        </li>
        <li>
          <button
            className={change(buttonActive, choice)}
            type="button"
            onClick={() => {
              setChoice(2);
              ctx.setNumberall(0);
              ctx.setNumberactive(1);
              ctx.setNumbercompleted(0);
            }}>
            Active
          </button>
        </li>
        <li>
          <button
            className={change(buttonCompleted, choice)}
            type="button"
            onClick={() => {
              setChoice(3);
              ctx.setNumberall(0);
              ctx.setNumberactive(0);
              ctx.setNumbercompleted(1);
            }}>
            Completed
          </button>
        </li>
      </ul>
      {clearornot(ctx.Item.itemCompleted)}
    </footer>
  );
}
