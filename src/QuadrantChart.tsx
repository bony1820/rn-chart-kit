import React from 'react';
import { Dimensions } from 'react-native';
import Svg, {
  Circle,
  G,
  Text,
  Line,
  Rect
} from 'react-native-svg';
export interface QuadrantChartProp {
  size: number;

  valueX: number;
  valueY: number;
  minValue: number;
  maxValue: number;

  fontSize: number; 
  fontColor: string;
  topText: string;
  rightText: string;
  bottomText: string;
  leftText: string;

  gridStrokeColor: string;
  gridStrikeDashArray: string;
  gridGap: number;

  dotStrokeColor: string;
  dotFillColor: string;
  dotRadius: number;
  dotStrokeWidth: number;
}
export default function QuadrantChart(props: QuadrantChartProp) {
  const unit = props.size / props.maxValue;
  const renderGrid = () => {
    return (
      <React.Fragment>
        {
          Array.from({ length: 9}, (_, v) => v)
                .map(
                  item => 
                    <Line
                      key={item}
                      x1={0}
                      y1={props.gridGap * item}
                      x2={props.size}
                      y2={props.gridGap * item}
                      stroke={props.gridStrokeColor}
                      strokeDasharray={props.gridStrikeDashArray}
                      />
                )
        }
        <Line
          x1={props.size/2}
          y1={0}
          x2={props.size/2}
          y2={props.size}
          stroke={'#f00'}
          />
      </React.Fragment>
    )
  }

  const renderOverlay = () => {
    return (
      <React.Fragment>
        <Rect
          x={props.size/2}
          y={0}
          width={props.size/2}
          height={props.size/2}
          stroke={props.gridStrokeColor}
          strokeWidth={0}
          fill={props.gridStrokeColor}
          opacity={0.1}
          />
      </React.Fragment>
    )
  }
  return (
      <Svg height={props.size} width={props.size} viewBox={`${-20-props.fontSize} ${-20-props.fontSize} ${props.size + 40 + props.fontSize} ${props.size + 40 + props.fontSize}`}>
        <Circle
          cx={props.valueX * unit}
          cy={props.valueY * unit}
          r={props.dotRadius}
          stroke={props.dotStrokeColor}
          strokeWidth={props.dotStrokeWidth}
          fill={props.dotFillColor}
        />
        {
          renderGrid()
        }
        {
          renderOverlay()
        }
        <G rotation={'90'} origin={`${props.size/2},${props.size/2}`}>
          {
            renderGrid()
          }
        </G>
        <G rotation={'180'} origin={`${props.size/2},${props.size/2}`}>
          {
            renderOverlay()
          }
        </G>
        <Text
          fill={props.fontColor}
          fontSize={props.fontSize}
          x={props.size/2}
          y={-10}
          textAnchor="middle"
          fontWeight={"bold"}
        >
          { props.topText }
        </Text>
        <G rotation={'90'} origin={`${props.size/2},${props.size/2}`}>
          <Text
            fill={props.fontColor}
            fontSize={props.fontSize}
            x={props.size/2}
            y={-10}
            textAnchor="middle"
            fontWeight={"bold"}
          >
            { props.rightText }
          </Text>
        </G>
        <Text
          fill={props.fontColor}
          fontSize={props.fontSize}
          x={props.size/2}
          y={props.size + 20}
          textAnchor="middle"
          fontWeight={"bold"}
        >
          { props.bottomText }
        </Text>
        <G rotation={'270'} origin={`${props.size/2},${props.size/2}`}>
          <Text
            fill={props.fontColor}
            fontSize={props.fontSize}
            x={props.size/2}
            y={-10}
            textAnchor="middle"
            fontWeight={"bold"}
          >
            { props.leftText }
          </Text>
        </G>
      </Svg>
  );
  
}

QuadrantChart.defaultProps = {
  size: Dimensions.get('screen').width * 0.9,
  valueX: 30,
  valueY: 10,
  minValue: 40,
  maxValue: 40,
  dotRadius: 4,
  dotStrokeColor: '#FF5A00',
  dotFillColor: '#FF5A00',
  dotStrokeWidth: 2,
  gridStrikeDashArray: '1 1',
  gridStrokeColor: '#FF5A00',
  gridGap: Dimensions.get('screen').width * 0.9 / 8,
  fontSize: 16,
  fontColor: "#000",
  topText: "Smoky",
  rightText: "Ricky",
  bottomText: "Delicate",
  leftText: "Light"
}
