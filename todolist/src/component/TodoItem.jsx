import { useContext } from 'react';
import { Mycontext } from './context-manager';
import { Check } from './Check';
import { Footer } from './Footer';

export function TodoItem() {
  const ctx = useContext(Mycontext);
  function showfooter() {
    let flag = 0;
    for (let i = 0; i < ctx.Item.todoItems.length; i++) {
      if (ctx.Item.todoItems[i].destroyed === false) {
        flag = 1;
      }
    }
    if (flag === 1) {
      return <Footer />; // 只要存在一个item未被删除，无论是否checked，都会显示footer组件
    } else {
      return null; // 如果所有的item都被删除了，我们不会展现footer组件
    }
  }
  if (ctx.Item.todoItems.length !== 0) {
    return (
      <section className="items">
        <ul className="todoItem" id="todoItem">
          <Check />
        </ul>
        {showfooter()}
      </section>
    );
  } else {
    return <ul></ul>;
  }
}
