import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridExample = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const responsiveProps = {
    className: "responsive-grid",
    breakpoints: { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 },
    cols: { lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 },
    layouts: {
      lg: [{ i: "1", x: 0, y: 0, w: 1, h: 2 }],
      md: [{ i: "1", x: 0, y: 0, w: 1, h: 2 }],
      // More layouts for other breakpoints...
    },
  };

  return (
    <ResponsiveGridLayout {...responsiveProps} isDraggable={true}
    isResizable={true}>
      <div key="item1" style={{ background: "#ff4d4f" }}>
        Item 1
      </div>
      <div key="item2" style={{ background: "#40a9ff" }}>
        Item 2
      </div>
      <div key="item3" style={{ background: "#73d13d" }}>
        Item 3
      </div>
    </ResponsiveGridLayout>
  );
};

export default GridExample;