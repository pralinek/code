import React, { useEffect, useRef } from 'react';
import { Timeline, DataSet } from 'vis-timeline';

const TimelineComponent = () => {
    const timelineContainer = useRef(null);
    const timeline = useRef(null);
    const items = useRef(new DataSet());
    const groups = useRef(new DataSet([
        { id: 1, content: 'Group 1' },
        { id: 2, content: 'Group 2' }
    ]));

    useEffect(() => {
        if (timelineContainer.current && !timeline.current) {
            timeline.current = new Timeline(timelineContainer.current, items.current, groups.current, {
                stack: true,
                verticalScroll: true,
                zoomKey: 'ctrlKey',
                maxHeight: 400,
                minHeight: 400
            });
        }

        return () => {
            if (timeline.current) {
                timeline.current.destroy();
            }
        };
    }, []);

    const handleAddItem = (group, start, end) => {
        // Retrieve items of the group and sort by end time
        const groupItems = items.current.get({
            filter: function (item) {
                return item.group === group;
            }
        }).sort((a, b) => a.end - b.end);

        // Find a suitable start time for the new item
        let newStartTime = new Date(start);
        if (groupItems.length > 0) {
            const lastItem = groupItems[groupItems.length - 1];
            newStartTime = new Date(Math.max(newStartTime, new Date(lastItem.end).getTime() + 15 * 60000)); // 15 minutes after last item
        }

        // Add the new item
        items.current.add({
            id: items.current.length + 1,
            content: `Item ${items.current.length + 1}`,
            start: newStartTime,
            end: new Date(newStartTime.getTime() + (end - start)),
            group: group
        });
    };

    return (
        <div>
            <div ref={timelineContainer} style={{ height: '400px' }} />
            <button onClick={() => handleAddItem(1, new Date(), new Date().setHours(new Date().getHours() + 1))}>
                Add Item to Group 1
            </button>
        </div>
    );
};

export default TimelineComponent;