
import React from 'react';

interface SvayamLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SvayamLogo: React.FC<SvayamLogoProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16"
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src="/lovable-uploads/48da032a-8087-4191-b2f2-1df96102bdec.png" 
        alt="Svayam Logo" 
        className={`${sizeClasses[size]}`}
      />
    </div>
  );
};

export default SvayamLogo;
