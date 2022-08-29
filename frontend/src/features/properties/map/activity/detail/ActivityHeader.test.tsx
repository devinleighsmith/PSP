import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockAcquisitionFileResponse } from 'mocks/mockAcquisitionFiles';
import { getMockResearchFile } from 'mocks/mockResearchFile';
import { prettyFormatDate } from 'utils';
import { render, RenderOptions } from 'utils/test-utils';

import ActivityHeader, { IActivityHeaderProps } from './ActivityHeader';

const mockAxios = new MockAdapter(axios);

describe('ActivityHeader component', () => {
  // render component under test
  const setup = (props: IActivityHeaderProps, renderOptions: RenderOptions = {}) => {
    const utils = render(<ActivityHeader file={props.file} />, {
      ...renderOptions,
    });

    return { ...utils };
  };

  beforeEach(() => {
    mockAxios.onGet(new RegExp('users/info/*')).reply(200, {});
  });

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { asFragment } = setup({ file: getMockResearchFile() });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when an acquisition file is provided', async () => {
    const testAcquisitionFile = { ...mockAcquisitionFileResponse(), id: 1 };
    const { getByText } = setup({ file: { ...mockAcquisitionFileResponse(), id: 1 } });

    expect(getByText(testAcquisitionFile.fileNumber as string)).toBeVisible();
    expect(getByText(prettyFormatDate(testAcquisitionFile.appCreateTimestamp))).toBeVisible();
    expect(getByText(prettyFormatDate(testAcquisitionFile.appLastUpdateTimestamp))).toBeVisible();
    expect(getByText(testAcquisitionFile?.fileStatusTypeCode?.description ?? '')).toBeVisible();
  });

  it('renders as expected when a research file is provided', async () => {
    const testResearchFile = getMockResearchFile();
    const { getByText } = setup({ file: testResearchFile });

    expect(getByText(testResearchFile.fileNumber as string)).toBeVisible();
    expect(getByText(prettyFormatDate(testResearchFile.appCreateTimestamp))).toBeVisible();
    expect(getByText(prettyFormatDate(testResearchFile.appLastUpdateTimestamp))).toBeVisible();
    expect(getByText(testResearchFile.fileStatusTypeCode.description)).toBeVisible();
  });
});
