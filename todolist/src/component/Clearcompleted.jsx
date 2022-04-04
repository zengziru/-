import { useContext } from 'react';
import { Mycontext } from './context-manager';
// 一键删除已checked的item
export function Clearcompleted() {
  const ctx = useContext(Mycontext);

  return (
    <button
      className="clear-completed"
      type="button"
      onClick={() => {
        return ctx.Item.todoItems.map(item => {
          if (item.checked === true) {
            item.destroyed = true;
            ctx.setItem({
              todoItems: ctx.Item.todoItems,
              itemCount: ctx.Item.itemCount,
              itemCompleted: 0,
              itemDestroy: ctx.Item.itemDestroy + 1,
            });
          }
          return item;
        });
      }}>
      Clear completed
    </button>
  );
}
