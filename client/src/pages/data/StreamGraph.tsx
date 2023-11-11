import React from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  Area,
  VictoryLine,
  VictoryGroup,
} from 'victory';
import styled from 'styled-components';
import _ from 'lodash';
import { generatePerlin } from './perlin';

/*
  https://formidable.com/open-source/victory/gallery/stream-graph
*/

// This custom path component is supplied to `Area` as the `pathComponent` prop
const GradientPath = (props) => {
  const { percent, style = {}, ...rest } = props;

  const gradientId = `gradient-${Math.random()}`;
  const loc = window.location.href;
  const areaStyle = Object.assign({}, style, {
    fill: `url(${loc}#${gradientId})`,
    stroke: 'none',
  });

  return (
    <g key="area">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="0%" stopColor={style.fill} />
          <stop offset="100%" stopColor={style.fill} />
        </linearGradient>
      </defs>
      <path key="area" {...rest} style={areaStyle} />
    </g>
  );
};

export default class StreamGraphComponent extends React.Component<
  any,
  { percent: any }
> {
  constructor(props) {
    super(props);
    this.state = { percent: 100 };
  }

  getStreamData() {
    const i = 5;
    const dataLength = 100;
    const perlin1 = generatePerlin(dataLength);
    const factor1 = 0.5;
    const perlin2 = generatePerlin(dataLength);
    const factor2 = 0.6;
    console.log(perlin1);
    console.log(perlin2);

    return _.range(dataLength).map((j) => ({
      x: j,
      y: perlin1[j] * factor1 + perlin2[j] * factor2, //+ (10 - i) * _.random(10 - i, 20 - 2 * i),
      _y0: perlin1[j] * factor1 - perlin2[j] * factor2, // - 1 * (10 - i) * _.random(10 - i, 20 - 2 * i),
    }));
  }

  render() {
    const streamData = this.getStreamData();

    const colors = [
      '#006064',
      '#00796B',
      '#8BC34A',
      '#DCE775',
      '#FFF59D',
      '#F4511E',
      '#c33409',
    ];

    return (
      <Rotate90>
        <VictoryGroup
          width={400}
          height={400}
          domain={{
            x: [0, 100],
            y: [-300, 300],
          }}
        >
          {/*
          <VictoryAxis
            style={{
              axis: { stroke: 'none' },
              tickLabels: { fill: 'none' },
              grid: { stroke: 'none' },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{ tickLabels: { fontSize: 15 } }}
            crossAxis={false}
          /> */}
          <VictoryArea
            interpolation="monotoneX"
            data={streamData}
            style={{ data: { fill: colors[1] } }}
            dataComponent={
              <Area
                pathComponent={<GradientPath percent={this.state.percent} />}
              />
            }
          />
        </VictoryGroup>
      </Rotate90>
    );
  }
}

const Rotate90 = styled.div`
  transform: rotate(90deg);
`;
