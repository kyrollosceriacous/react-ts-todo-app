import React, { useState } from "react";

interface FilterButtonProps {
    filterTodos: (filter: 'all' | 'completed' | 'active') => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterTodos }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (filter: 'all' | 'completed' | 'active') => {
        setIsExpanded(false);
        filterTodos(filter);
    };

    return (
        <div className='filter-button'>
          <button onClick={() => setIsExpanded(!isExpanded)}>Filter</button>
          {isExpanded && (
            <ul>
              <li onClick={() => handleClick('all')}>All</li>
              <li onClick={() => handleClick('completed')}>Completed</li>
              <li onClick={() => handleClick('active')}>Active</li>
            </ul>
          )}
        </div>
      );
};


export default FilterButton;