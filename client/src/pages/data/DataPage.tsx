import React from 'react';
import StreamGraphComponent from './StreamGraph';
import { Card } from '../../components/Card';
import { Stack } from '../../components/Stack';

export function DataPage() {
  return (
    <Stack axis="y" spacing={8}>
      <Card header="Hello world" onClick={() => alert('clicköd')}>
        Data page
      </Card>

      <StreamGraphComponent />
    </Stack>
  );
}
