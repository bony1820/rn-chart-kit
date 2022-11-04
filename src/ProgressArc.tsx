import React from 'react';
import { Dimensions } from 'react-native';
import { Svg, Mask, Line, Path, G, Rect, Defs, Use } from 'react-native-svg';

export interface IProgressArcProps {
  percent1?: number; // ex: 30% => 30
  percent2?: number; // ex: 30% => 30
  gapGrid?: number;
  size?: number;
  strokeWidth?: number;
  colorGrid?: string;
  colorChart1?: string;
  colorChart2?: string;
  colorChartBackground?: string;
  chartSpacing?: number;
  single?: boolean;
}

export default function ProgressArc(props: IProgressArcProps): JSX.Element {
  const percent1 = (props.percent1 as number) / 100;
  const percent2 = (props.percent2 as number) / 100;
  const gapGrid = props.gapGrid as number;
  const size = props.size as number;
  const strokeWidth = props.strokeWidth as number;
  const colorGrid = props.colorGrid as string;
  const colorChart1 = props.colorChart1 as string;
  const colorChart2 = props.colorChart2 as string;
  const chartSpacing = props?.single ? 0 : (props.chartSpacing as number);
  const colorChartBackground = props.colorChartBackground as string;
  const { PI, cos, sin } = Math;
  const r = (size - strokeWidth - 10) / 2;
  const cx1 = size / 2 - chartSpacing;
  const cx2 = size / 2 + chartSpacing;
  const cy = size / 2;
  const startAngle = PI / 2;
  const endAngle = -PI / 2;
  const x1 = cx1 - r * cos(startAngle);
  const x11 = cx2 - r * cos(startAngle);
  const y1 = cy - r * sin(startAngle);
  const x2 = cx1 - r * cos(endAngle);
  const x22 = cx2 - r * cos(endAngle);
  const y2 = cy - r * sin(endAngle);
  const d1 = props?.single
    ? `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y1}`
    : `M ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2}`;
  const d2 = `M ${x11} ${y1} A ${r} ${r} 0 0 1 ${x22} ${y2}`;
  const total = props?.single
    ? r * 2 * PI
    : r * Math.abs(startAngle - endAngle);
  const circumference1 = total * percent1;
  const circumference2 = total * percent2;
  return (
    <Svg width={size} height={size} key={percent1 + percent2}>
      <Defs>
        <Mask
          id="mask1"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={size}
          height={size}
        >
          <Path
            stroke="white"
            fill="none"
            strokeDasharray={`${circumference1}, ${total - circumference1}`}
            {...{ d: d1, strokeWidth }}
          />
        </Mask>
        <Mask
          id="mask2"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={size}
          height={size}
        >
          <Path
            stroke="white"
            fill="none"
            strokeDasharray={`${circumference2}, ${total - circumference2}`}
            {...{ d: d2, strokeWidth }}
          />
        </Mask>
        <G id="group1">
          <Rect x="0" y="0" width={size} height={size} fill={colorChart1} />
          {Array.from(
            { length: Math.round(size / gapGrid) },
            (_, v) => v * gapGrid
          ).map((item) => (
            <Line
              key={item}
              x1={item}
              y1={0}
              x2={item}
              y2={size}
              stroke={colorGrid}
            />
          ))}
        </G>
        <G id="group2">
          <Rect x="0" y="0" width={size} height={size} fill={colorChart2} />
          {Array.from(
            { length: Math.round(size / gapGrid) },
            (_, v) => v * gapGrid
          ).map((item) => (
            <Line
              key={item}
              x1={item}
              y1={0}
              x2={item}
              y2={size}
              stroke={colorGrid}
            />
          ))}
        </G>
      </Defs>
      <Rect x="0" y="0" width={size} height={size} fill="none" />
      <Path
        stroke={colorChartBackground}
        fill="none"
        {...{ d: d1, strokeWidth }}
      />
      <Path
        stroke={colorChartBackground}
        fill="none"
        {...{ d: d2, strokeWidth }}
      />
      <Use href="#group1" mask="url(#mask1)" />
      <Use href="#group2" mask="url(#mask2)" />
    </Svg>
  );
}

ProgressArc.defaultProps = {
  percent1: 0,
  percent2: 0,
  gapGrid: 10,
  size: Dimensions.get('window').width,
  strokeWidth: 30,
  colorGrid: 'white',
  colorChart1: '#ED9390',
  colorChart2: '#F0B334',
  colorChartBackground: '#DAD9DA',
  chartSpacing: 1,
};
