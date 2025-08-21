import React from 'react';
import "./SingleTab.css";
import Icon from '../Icon/Icon';

interface SingleTabProps {
  text: string;
  iconName: string;
  onClick?: () => void;
}

const SingleTab: React.FC<SingleTabProps> = ({ text, iconName, onClick }) => {
  return (
    <div className="single-tab" onClick={onClick}>
      <Icon name={iconName} size={24} color="#212529" />
      <span className="single-tab-text">{text}</span>
    </div>
  );
};

export default SingleTab;