import React from 'react';
import GridItem from './GridItem';
import { Responsive, WidthProvider } from 'react-grid-layout';
import useGridItems from '@/hooks/useGridItems';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutContainerProps {
    cols: number;
    rows: number;
    gap: number;
}

const GridLayoutContainer: React.FC<GridLayoutContainerProps> = ({  cols, rows, gap}) => {
    const { layout, deleteItem, setLayout } = useGridItems([]); 
    
    const breakpoints = { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 };
    const colsResponsive = { lg: cols, md: cols, sm: cols, xs: cols, xxs: cols };

    return (
        <ResponsiveGridLayout
            style={{ paddingTop: `${gap * 4}px` }}
            layouts={{ lg: layout }}
            breakpoints={breakpoints}
            cols={colsResponsive}
            useCSSTransforms={true}
            rowHeight={100}
            margin={[gap * 4, gap * 4]}
            compactType={null}
            containerPadding={[0, 0]}
            isDraggable={true}
            isResizable={true}
            onLayoutChange={(layout) => setLayout(layout)}
        >
            {layout.map((item) => (
                <div key={item.i}>
                    <GridItem item={item} onDelete={deleteItem} />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
};

export default GridLayoutContainer;
