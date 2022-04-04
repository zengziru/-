import { useContext } from 'react';
import { Mycontext } from './context-manager';
// 该组件实现了输入item的功能
// 在todoItems中的每个item元素中，包含了四个属性：content内容，id，checked（是否checked），destroyed（是否删除）
export function Todoinput() {
  const ctx = useContext(Mycontext);

  return (
    <input
      type="text"
      id="new-todo"
      className="new-todo"
      placeholder="What needs to be done?"
      autoComplete="off"
      onKeyDown={() => {
        if (event.keyCode === 13) {
          // 这里的13指的是enter，下面的逻辑是输入enter后检查此时value值是否为空，空则不做任何处理，非空则将content存入todoItems中
          if (document.getElementById('new-todo').value !== '') {
            const message = document.getElementById('new-todo').value;
            document.getElementById('new-todo').value = ''; // 提取到输入内容后将输入框清空
            const number = ctx.totalCount + 1;
            ctx.setTotal(prev => prev + 1);
            ctx.Item.todoItems.push({
              content: message,
              id: number,
              checked: false,
              destroyed: false,
            });
            ctx.setItem({
              todoItems: ctx.Item.todoItems,
              itemCount: ctx.Item.itemCount + 1,
              itemCompleted: ctx.Item.itemCompleted,
              itemDestroy: ctx.Item.itemDestroy,
            });
          }
        }
      }}></input>
  );
}
