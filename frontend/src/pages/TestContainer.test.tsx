import { screen } from '@testing-library/react';
import { render } from 'utils/test-utils';

import TestContainer, { ITestViewProps } from './TestContainer';

describe('container child injection test', () => {
  it('displays a toast message', async () => {
    render(<TestContainer view={(props: ITestViewProps) => <>{props.id}</>}></TestContainer>);
    expect(await screen.findByText('test')).toBeVisible();
  });
});
