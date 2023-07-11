"use client";

import * as d3 from "d3";
import { LegacyRef, useEffect, useRef } from "react";

const Chart = ({ data }: { data: number[] }) => {
  const chartRef: LegacyRef<SVGSVGElement> = useRef(null);

  useEffect(() => {
    const drawChart = () => {
      d3.select(chartRef.current)
        .attr("width", 500)
        .attr("height", 200)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => 200 - 2 * d)
        .attr("width", 50)
        .attr("height", (d, i) => 2 * d)
        .attr("fill", "#777");
    };
    drawChart();
  }, [data]);

  return (
    <div className="my-5 w-fit rounded-md border-4 border-amber-200 bg-slate-300 px-3">
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default Chart;
