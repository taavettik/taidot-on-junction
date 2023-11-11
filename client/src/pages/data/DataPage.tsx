import React from 'react';
import StreamGraphComponent from './StreamGraph';
import { Card } from '../../components/Card';

export function DataPage() {
  return (
    <div>
      <Card header="Hello world" onClick={() => alert('clicköd')}>
        Data page
      </Card>

      <StreamGraphComponent />
    </div>
  );
}
