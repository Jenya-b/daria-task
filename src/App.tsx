import React, { useEffect, CSSProperties, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { loadData } from './store/app/thunks';
import { List } from './components/List';
import { setSelected } from './store/app/slice';
import { useDebounce } from './hooks/useDebounce';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDataLoaded, elements, selected } = useAppSelector(
    (state) => state.app
  );
  const { highlighted, deselected } = useDebounce(selected);

  useEffect(() => {
    dispatch(loadData()).unwrap();
  }, []);

  useEffect(() => {
    console.info(
      `Выделены элементы: [${highlighted}]. Снято выделение с элементов: [${deselected}]`
    );
  }, [highlighted, deselected]);

  const renderItem: React.FC<{ index: number; style: CSSProperties }> = ({
    index,
    style,
  }) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
      const { id } = event.currentTarget;

      if (event.shiftKey && selected.includes(id)) {
        dispatch(setSelected(selected.filter((item) => item !== id)));
      } else if (event.shiftKey) {
        dispatch(setSelected([...selected, id]));
      } else if (selected.includes(id)) {
        dispatch(setSelected([]));
      } else {
        dispatch(setSelected([id]));
      }
    };

    return (
      <div
        onClick={handleClick}
        id={String(index)}
        style={{
          background: `${selected.includes(String(index)) ? 'silver' : 'none'}`,
          ...style,
        }}
      >
        {elements[index]}
      </div>
    );
  };

  return (
    <div style={{ height: '100%' }}>
      <p>{isDataLoaded ? 'Done' : 'Loading'}</p>
      <List data={elements} renderItem={renderItem} />
    </div>
  );
};
