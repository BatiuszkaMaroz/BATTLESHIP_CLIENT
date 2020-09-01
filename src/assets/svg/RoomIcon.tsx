import React from 'react';

interface Props {
  className?: string;
}

const RoomIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className || ''}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
    >
      <title>home1</title>
      <path d='M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z'></path>
    </svg>
  );
};

export default RoomIcon;