import { useContext } from 'react';
import { Mycontext } from './context-manager';
// 该组件实现了展现我们的items的功能，并且针对footer组件中的三种展现方式（ALL，Active，Completed），设计了对应的三种展现形式
export function Check() {
  const ctx = useContext(Mycontext);
  // changeclass作用：对于All的展现方式，我们需要根据item中记录的destroyed和checked属性来判断li元素的类型
  function changeclass(checkornot, destroyornot) {
    if (destroyornot === false) {
      if (checkornot === true) {
        return 'completed';
      } else {
        return '';
      }
    } else {
      return 'deleted';
    }
  }
  // All展现方式
  if (ctx.numberAll === 1) {
    return ctx.Item.todoItems.map(item => (
      <li
        key={item.id.toString()}
        id={item.id.toString()}
        className={changeclass(item.checked, item.destroyed)}>
        <input /* 实现checkbox的功能 */
          className="toggle"
          type="checkbox"
          id={`${item.id.toString()}check`}
          checked={item.checked}
          onChange={() => {
            item.checked = !item.checked;
            if (item.checked === true) {
              document.getElementById(item.id.toString()).className =
                'completed';
              ctx.setItem({
                todoItems: ctx.Item.todoItems,
                itemCount: ctx.Item.itemCount - 1,
                itemCompleted: ctx.Item.itemCompleted + 1,
                itemDestroy: ctx.Item.itemDestroy,
              });
            } else {
              document.getElementById(item.id.toString()).className = '';
              ctx.setItem({
                todoItems: ctx.Item.todoItems,
                itemCount: ctx.Item.itemCount + 1,
                itemCompleted: ctx.Item.itemCompleted - 1,
                itemDestroy: ctx.Item.itemDestroy,
              });
            }
          }}></input>
        <label>{item.content}</label>
        <button /* 实现元素后面的删除键功能 */
          className="destroy"
          type="button"
          onClick={() => {
            document.getElementById(item.id.toString()).className = 'deleted';
            item.destroyed = true;
            if (item.checked === false) {
              ctx.setItem({
                todoItems: ctx.Item.todoItems,
                itemCount: ctx.Item.itemCount - 1,
                itemDestroy: ctx.Item.itemDestroy + 1,
                itemCompleted: ctx.Item.itemCompleted,
              });
            } else {
              ctx.setItem({
                todoItems: ctx.Item.todoItems,
                itemCount: ctx.Item.itemCount,
                itemDestroy: ctx.Item.itemDestroy + 1,
                itemCompleted: ctx.Item.itemCompleted,
              });
            }
          }}></button>
      </li>
    )); // Active展现方式：
  } else if (ctx.numberActive === 1) {
    return ctx.Item.todoItems.map(item => {
      // 如果item已被删除，没有任何的展现组件
      if (item.destroyed === true) {
        return null;
        // 如果已经未被checked，是我们要展现的目标
      } else if (item.checked === false) {
        return (
          <li key={item.id.toString()} id={item.id.toString()}>
            <input
              className="toggle"
              type="checkbox"
              id={`${item.id.toString()}check`}
              checked={item.checked}
              onChange={() => {
                item.checked = !item.checked;
                if (item.checked === true) {
                  document.getElementById(item.id.toString()).className =
                    'completed';
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount - 1,
                    itemCompleted: ctx.Item.itemCompleted + 1,
                    itemDestroy: ctx.Item.itemDestroy,
                  });
                } else {
                  document.getElementById(item.id.toString()).className = '';
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount + 1,
                    itemCompleted: ctx.Item.itemCompleted - 1,
                    itemDestroy: ctx.Item.itemDestroy,
                  });
                }
              }}></input>
            <label>{item.content}</label>
            <button
              className="destroy"
              type="button"
              onClick={() => {
                document.getElementById(item.id.toString()).className =
                  'deleted';
                item.destroyed = true;
                if (item.checked === false) {
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount - 1,
                    itemDestroy: ctx.Item.itemDestroy + 1,
                    itemCompleted: ctx.Item.itemCompleted,
                  });
                } else {
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount,
                    itemDestroy: ctx.Item.itemDestroy + 1,
                    itemCompleted: ctx.Item.itemCompleted,
                  });
                }
              }}></button>
          </li>
        );
      } else {
        // 如果是已经被checked的
        return (
          <li
            key={item.id.toString()}
            id={item.id.toString()}
            className="destroy"></li>
        );
      }
    });
  } else if (ctx.numberCompleted === 1) {
    return ctx.Item.todoItems.map(item => {
      if (item.destroyed === true) {
        return null;
      } else if (item.checked === true) {
        return (
          <li
            key={item.id.toString()}
            id={item.id.toString()}
            className="completed">
            <input
              className="toggle"
              type="checkbox"
              id={`${item.id.toString()}check`}
              checked={true}
              onChange={() => {
                item.checked = !item.checked;
                if (item.checked === true) {
                  document.getElementById(item.id.toString()).className =
                    'completed';
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount - 1,
                    itemCompleted: ctx.Item.itemCompleted - 1,
                    itemDestroy: ctx.Item.itemDestroy,
                  });
                } else {
                  document.getElementById(item.id.toString()).className = '';
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount + 1,
                    itemCompleted: ctx.Item.itemCompleted - 1,
                    itemDestroy: ctx.Item.itemDestroy,
                  });
                }
              }}></input>
            <label>{item.content}</label>
            <button
              className="destroy"
              type="button"
              onClick={() => {
                document.getElementById(item.id.toString()).className =
                  'deleted';
                item.destroyed = true;
                if (item.checked === false) {
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount - 1,
                    itemDestroy: ctx.Item.itemDestroy + 1,
                    itemCompleted: ctx.Item.itemCompleted,
                  });
                } else {
                  ctx.setItem({
                    todoItems: ctx.Item.todoItems,
                    itemCount: ctx.Item.itemCount,
                    itemDestroy: ctx.Item.itemDestroy + 1,
                    itemCompleted: ctx.Item.itemCompleted,
                  });
                }
              }}></button>
          </li>
        );
      } else {
        return (
          <li
            key={item.id.toString()}
            id={item.id.toString()}
            className="destroy"></li>
        );
      }
    });
  }
}
