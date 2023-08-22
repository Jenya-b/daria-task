import React, { CSSProperties } from 'react';
import { FixedSizeList } from 'react-window';

interface ListProps {
  data: string[];
  renderItem: React.FC<{
    index: number;
    style: CSSProperties;
  }>;
}

export const List: React.FC<ListProps> = ({ data = [], renderItem }) => {
  return (
    <FixedSizeList
      height={window.innerHeight}
      width={window.innerWidth}
      itemCount={data.length}
      itemSize={50}
    >
      {renderItem}
    </FixedSizeList>
  );
};
