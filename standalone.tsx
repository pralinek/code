import React, { useState, useEffect } from 'react';
import { Timeline } from 'vis-timeline/standalone';

const MyTimeline = () => {
  const [items, setItems] = useState(new vis.DataSet([
    { id: 1, content: 'Item 1', start: new Date(2023, 0, 20) },
    { id: 2, content: 'Item 2', start: new Date(2023, 0, 21) }
  ]));
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    const container = document.getElementById('my-timeline');
    const timeline = new Timeline(container, items, [], {
      overrideItems: overrides
    });

    return () => timeline.destroy();
  }, [overrides]);  // Redraw timeline when overrides change

  const highlightItem = itemId => {
    setOverrides({
      ...overrides,
      [itemId]: { className: 'highlight', content: 'Updated dynamically' }
    });
  };

  return (
    <div>
      <div id="my-timeline" style={{ height: '400px' }}></div>
      <button onClick={() => highlightItem(1)}>Highlight Item 1</button>
    </div>
  );
};

export default MyTimeline;