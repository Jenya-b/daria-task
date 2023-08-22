import React, { useEffect, CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { loadData } from './store/app/thunks';
import { List } from './components/List';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDataLoaded, elements } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(loadData()).unwrap();
  }, []);

  const renderItem: React.FC<{ index: number; style: CSSProperties }> = ({
    index,
    style,
  }) => <div style={style}>{elements[index]}</div>;

  return (
    <div style={{ height: '100%' }}>
      <p>{isDataLoaded ? 'Done' : 'Loading'}</p>
      <List data={elements} renderItem={renderItem} />
    </div>
  );
};
