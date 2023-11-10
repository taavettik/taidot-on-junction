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
    return _.range(26).map((j) => ({
      x: j,
      y: (10 - i) * _.random(10 - i, 20 - 2 * i),
      _y0: -1 * (10 - i) * _.random(10 - i, 20 - 2 * i),
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
            x: [0, 25],
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
