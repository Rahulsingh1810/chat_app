import React from 'react';

const Avatar = ({ width, height, name, imageUrl }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden"
      style={{ width, height }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-lg font-semibold">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;