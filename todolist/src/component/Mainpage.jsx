import { useState } from 'react';
import { TodoItem } from './TodoItem';
import { Todoinput } from './Todoinput';
import { Mycontext } from './context-manager';

const initialState = {
  todoItems: [], // 包含了每个item的内容以及基本信息（如；是否checked，是否completed）
  itemCount: 0, // 目前有效的item数量，即未被删除和checked
  itemDestroy: 0, // 目前被删除的item数量
  itemCompleted: 0, // 目前被checked的item数量
};

export function Mainpage() {
  const [Item, setItem] = useState(initialState);
  const [totalCount, setTotal] = useState(0); // total是所有出现过的item的数量，无论item的状态
  const [numberAll, setNumberall] = useState(1); // numberAll用于表示目前的All button的状态，如果是1，表示处于All界面
  const [numberActive, setNumberactive] = useState(0); // numberActive用于表示目前的Active button的状态，如果是1，表示处于Active界面
  const [numberCompleted, setNumbercompleted] = useState(0); // numberCompleted用于表示目前的Completed button的状态，如果是1，表示处于Completed界面

  return (
    <div className="todoapp">
      <Mycontext.Provider /* 我们通过context的方式传递共享信息 */
        value={{
          setItem,
          Item,
          numberActive,
          numberAll,
          numberCompleted,
          setNumberall,
          setNumberactive,
          setNumbercompleted,
          totalCount,
          setTotal,
        }}>
        <header className="header">
          <h1>todos</h1>
          <Todoinput />
          <TodoItem />
        </header>
      </Mycontext.Provider>
    </div>
  );
}
